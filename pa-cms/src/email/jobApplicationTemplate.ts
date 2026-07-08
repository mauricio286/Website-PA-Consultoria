// Monta o HTML do e-mail enviado quando alguém se candidata a uma vaga
export function buildJobApplicationEmailHtml(data: {
  jobTitle: string
  name: string
  email: string
  phone: string
  cpf?: string
  rg?: string
  state?: string
  city?: string
  education?: string
  qualifications?: string
  experience: string
  resumeUrl?: string
}): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; }
        .header { background: #002d22; padding: 24px 32px; }
        .header h1 { color: #e1fe00; margin: 0 0 4px; font-size: 20px; }
        .header p { color: #a8c4a0; margin: 0; font-size: 14px; }
        .body { padding: 32px; }
        .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; color: #002d22;
                          border-bottom: 1px solid #e0e0e0; padding-bottom: 6px; margin: 24px 0 16px; }
        .field { margin-bottom: 14px; }
        .field label { display: block; font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 3px; }
        .field p { margin: 0; font-size: 15px; color: #222; }
        .text-box { background: #f9f9f9; border-left: 4px solid #002d22; padding: 14px; border-radius: 0 4px 4px 0; }
        .resume-btn { display: inline-block; margin-top: 16px; padding: 12px 24px;
                       background: #002d22; color: #e1fe00; text-decoration: none;
                       border-radius: 6px; font-weight: bold; font-size: 14px; }
        .footer { padding: 16px 32px; background: #f0f0f0; font-size: 12px; color: #aaa; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nova candidatura recebida</h1>
          <p>Vaga: ${data.jobTitle}</p>
        </div>

        <div class="body">
          <div class="section-title">Dados pessoais</div>

          <div class="field">
            <label>Nome completo</label>
            <p>${data.name}</p>
          </div>

          <div class="field">
            <label>E-mail</label>
            <p>${data.email}</p>
          </div>

          <div class="field">
            <label>Telefone</label>
            <p>${data.phone}</p>
          </div>

          ${data.cpf ? `<div class="field"><label>CPF</label><p>${data.cpf}</p></div>` : ''}
          ${data.rg ? `<div class="field"><label>RG</label><p>${data.rg}</p></div>` : ''}

          ${(data.city || data.state) ? `
          <div class="field">
            <label>Localização</label>
            <p>${[data.city, data.state].filter(Boolean).join(' - ')}</p>
          </div>` : ''}

          ${data.education ? `
          <div class="section-title">Formação</div>
          <div class="field"><p>${data.education}</p></div>` : ''}

          ${data.qualifications ? `
          <div class="section-title">Outras qualificações</div>
          <div class="field">
            <div class="text-box"><p>${data.qualifications.replace(/\n/g, '<br>')}</p></div>
          </div>` : ''}

          <div class="section-title">Experiência profissional</div>
          <div class="field">
            <div class="text-box"><p>${data.experience.replace(/\n/g, '<br>')}</p></div>
          </div>

          ${data.resumeUrl ? `
          <div class="section-title">Currículo</div>
          <a href="${data.resumeUrl}" class="resume-btn">Baixar currículo</a>` : `
          <div class="section-title">Currículo</div>
          <p style="font-size: 14px; color: #555; font-style: italic;">O arquivo do currículo foi anexado diretamente a este e-mail.</p>`}
        </div>

        <div class="footer">Candidatura enviada via site PA Consultoria</div>
      </div>
    </body>
    </html>
  `
}
