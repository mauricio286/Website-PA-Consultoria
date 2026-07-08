import { NextResponse } from 'next/server'
import type { PayloadHandler } from 'payload'
import { buildJobApplicationEmailHtml } from '../email/jobApplicationTemplate'

// Tipos de arquivo aceitos para currículo
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Tamanho máximo do currículo em bytes (5 MB)
const MAX_RESUME_SIZE = 5 * 1024 * 1024

// Valida os campos obrigatórios do formulário de candidatura
function validateApplicationBody(body: Record<string, unknown>): string | null {
  if (!body.jobId || typeof body.jobId !== 'string') {
    return 'Vaga não selecionada.'
  }
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 3) {
    return 'Nome inválido.'
  }
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return 'E-mail inválido.'
  }
  if (!body.phone || typeof body.phone !== 'string') {
    return 'Telefone obrigatório.'
  }
  if (!body.experience || typeof body.experience !== 'string' || body.experience.trim().length < 10) {
    return 'Experiência profissional obrigatória.'
  }
  return null
}

// Recebe candidatura via multipart/form-data, valida, salva no banco e envia e-mail ao RH
export const jobApplicationHandler: PayloadHandler = async (req) => {
  try {
    const formData = await (req as any).formData()
    
    // Convert formData to a standard body object for validation
    const body: Record<string, unknown> = {}
    formData.forEach((value: any, key: string) => {
      if (typeof value === 'string') {
        body[key] = value
      }
    })

    const error = validateApplicationBody(body)
    if (error) {
      return NextResponse.json({ success: false, message: error }, { status: 400 })
    }

    // Verifica se a vaga existe e está aberta
    const job = await req.payload.findByID({
      collection: 'jobs',
      id: body.jobId as string,
    })

    if (!job || job.status !== 'open') {
      return NextResponse.json({ success: false, message: 'Vaga não encontrada ou encerrada.' }, { status: 400 })
    }

    // Valida e processa o currículo para envio por anexo de e-mail, se enviado
    const attachments: any[] = []
    const file = formData.get('resume') as File | null
    // If a file was sent (it has size and name)
    if (file && file.size > 0 && file.name) {
      // Valida tipo MIME no backend
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json({
          success: false,
          message: 'Formato de currículo inválido. Envie PDF, DOC ou DOCX.',
        }, { status: 400 })
      }

      if (file.size > MAX_RESUME_SIZE) {
        return NextResponse.json({
          success: false,
          message: 'Currículo muito grande. Tamanho máximo: 5 MB.',
        }, { status: 400 })
      }

      // Read file data as Buffer
      const arrayBuffer = await file.arrayBuffer()
      const fileBuffer = Buffer.from(arrayBuffer)

      attachments.push({
        filename: file.name,
        content: fileBuffer,
        contentType: file.type
      })
    }

    // Envia e-mail de notificação para o RH
    const recipient = process.env.CAREER_RECIPIENT ?? 'rh@agropa.com.br'

    await req.payload.sendEmail({
      to: recipient,
      replyTo: (body.email as string).trim(),
      subject: `[Carreiras] Nova candidatura — ${job.title}`,
      html: buildJobApplicationEmailHtml({
        jobTitle: job.title,
        name: (body.name as string).trim(),
        email: (body.email as string).trim(),
        phone: (body.phone as string).trim(),
        cpf: body.cpf as string | undefined,
        rg: body.rg as string | undefined,
        state: body.state as string | undefined,
        city: body.city as string | undefined,
        education: body.education as string | undefined,
        qualifications: body.qualifications as string | undefined,
        experience: (body.experience as string).trim(),
      }),
      attachments,
    })

    return NextResponse.json({
      success: true,
      message: 'Candidatura enviada com sucesso.',
    }, { status: 200 })
  } catch (err) {
    req.payload.logger.error({ err }, 'Erro ao processar candidatura')
    return NextResponse.json({
      success: false,
      message: 'Erro interno. Tente novamente mais tarde.',
    }, { status: 500 })
  }
}
