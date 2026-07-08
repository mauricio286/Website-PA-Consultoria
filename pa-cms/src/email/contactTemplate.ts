// Monta o HTML do e-mail enviado quando alguém preenche o formulário de contato
export function buildContactEmailHtml(data: {
  name: string
  phone: string
  email: string
  subject: string
  message: string
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
        .header h1 { color: #e1fe00; margin: 0; font-size: 20px; }
        .body { padding: 32px; }
        .field { margin-bottom: 16px; }
        .field label { display: block; font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 4px; }
        .field p { margin: 0; font-size: 15px; color: #222; }
        .message-box { background: #f9f9f9; border-left: 4px solid #002d22; padding: 16px; border-radius: 0 4px 4px 0; }
        .footer { padding: 16px 32px; background: #f0f0f0; font-size: 12px; color: #aaa; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nova mensagem de contato</h1>
        </div>
        <div class="body">
          <div class="field">
            <label>Nome</label>
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
          <div class="field">
            <label>Assunto</label>
            <p>${data.subject}</p>
          </div>
          <div class="field">
            <label>Mensagem</label>
            <div class="message-box">
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </div>
        <div class="footer">Mensagem enviada via site PA Consultoria</div>
      </div>
    </body>
    </html>
  `
}
