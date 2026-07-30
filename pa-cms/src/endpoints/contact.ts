import { NextResponse } from 'next/server'
import type { PayloadHandler } from 'payload'
import { buildContactEmailHtml } from '../email/contactTemplate'

// Validação básica dos campos obrigatórios do formulário
function validateContactBody(body: Record<string, unknown>): string | null {
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 3) {
    return 'Nome inválido.'
  }
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return 'E-mail inválido.'
  }
  if (!body.phone || typeof body.phone !== 'string') {
    return 'Telefone obrigatório.'
  }
  if (!body.subject || typeof body.subject !== 'string' || body.subject.trim().length < 3) {
    return 'Assunto inválido.'
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    return 'Mensagem muito curta.'
  }
  return null
}

// Recebe o formulário de contato, valida, envia e-mail e retorna confirmação
export const contactHandler: PayloadHandler = async (req) => {
  try {
    const body = await (req as any).json() as Record<string, unknown>

    const error = validateContactBody(body)
    if (error) {
      return NextResponse.json({ success: false, message: error }, { status: 400 })
    }

    const data = {
      name: (body.name as string).trim(),
      email: (body.email as string).trim().toLowerCase(),
      phone: (body.phone as string).trim(),
      subject: (body.subject as string).trim(),
      message: (body.message as string).trim(),
    }

    // Destinatário: lê do CMS primeiro, depois env var, depois fallback
    let recipient = process.env.CONTACT_RECIPIENT ?? 'rh@agropa.com.br'
    try {
      const settings = await req.payload.findGlobal({ slug: 'contact-settings' })
      if (settings?.formRecipientEmail) {
        recipient = settings.formRecipientEmail as string
      }
    } catch {
      // usa o fallback definido acima
    }

    await req.payload.sendEmail({
      to: recipient,
      replyTo: data.email,
      subject: `[Site] Nova mensagem: ${data.subject}`,
      html: buildContactEmailHtml(data),
    })

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso.',
    }, { status: 200 })
  } catch (err) {
    req.payload.logger.error({ err }, 'Erro ao processar formulário de contato')
    return NextResponse.json({
      success: false,
      message: 'Erro interno. Tente novamente mais tarde.',
    }, { status: 500 })
  }
}
