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
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Mensagem - PA Consultoria</title>
        <style>
            body { 
                margin: 0; 
                padding: 0; 
                background-color: #f4f4f4; 
                font-family: Arial, sans-serif; 
            }
            table { border-spacing: 0; width: 100%; border-collapse: collapse; }
            .wrapper { width: 100%; background-color: #f4f4f4; padding: 20px 0; }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff; 
                border-radius: 4px; 
                overflow: hidden;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            }
            
            /* Header - Verde Escuro Agro */
            .header { 
                background-color: #0b2315; 
                padding: 25px; 
                text-align: center;
            }
            
            /* Faixa de destaque Lima */
            .accent-bar { 
                height: 4px; 
                background-color: #d9ff00; 
            }
            
            .content { padding: 35px 30px; }
            
            .main-title { 
                font-size: 16px; 
                font-weight: bold; 
                color: #0b2315; 
                margin-bottom: 25px; 
                text-transform: uppercase;
                border-bottom: 1px solid #eeeeee;
                padding-bottom: 10px;
                letter-spacing: 0.5px;
            }
            
            /* Labels em Verde Escuro (Contraste Máximo) */
            .label { 
                font-size: 10px; 
                font-weight: bold; 
                color: #1e4a2b; 
                text-transform: uppercase; 
                margin-bottom: 4px;
                display: block;
            }
            
            .value { 
                font-size: 14px; 
                color: #333333; 
                margin-bottom: 18px; 
                padding: 8px 10px;
                background-color: #f9f9f9;
                border-radius: 4px;
            }

            /* Áreas de texto longo */
            .text-box { 
                font-size: 14px; 
                color: #444444; 
                line-height: 1.5; 
                padding: 15px; 
                background-color: #ffffff; 
                border: 1px solid #eeeeee;
                border-radius: 4px;
                margin-bottom: 20px;
            }

            .footer { 
                padding: 20px; 
                text-align: center; 
                font-size: 11px; 
                color: #888888; 
                background-color: #fcfcfc;
            }

            .col { width: 48%; display: inline-block; vertical-align: top; }

            @media screen and (max-width: 500px) {
                .col { width: 100% !important; display: block !important; }
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <table class="container">
                <!-- HEADER -->
                <tr>
                    <td class="header">
                        <!-- Logo menor (110px) para maior elegância -->
                        <img src="https://agropa.com.br/assets/logo_pa-CEK5FjFS.svg" alt="PA Consultoria" width="110" style="display: block; margin: 0 auto;">
                    </td>
                </tr>
                <tr>
                    <td class="accent-bar"></td>
                </tr>

                <!-- CORPO -->
                <tr>
                    <td class="content">
                        <h2 class="main-title">Nova Mensagem de Contato</h2>

                        <span class="label">Nome Completo</span>
                        <div class="value">${data.name}</div>

                        <!-- Celular e Email -->
                        <div>
                            <div class="col">
                                <span class="label">Telefone</span>
                                <div class="value">${data.phone}</div>
                            </div>
                            <div class="col" style="float: right;">
                                <span class="label">E-mail</span>
                                <div class="value">${data.email}</div>
                            </div>
                            <div style="clear: both;"></div>
                        </div>

                        <span class="label">Assunto</span>
                        <div class="value">${data.subject}</div>

                        <span class="label">Mensagem</span>
                        <div class="text-box">${data.message.replace(/\n/g, '<br>')}</div>
                    </td>
                </tr>

                <!-- RODAPÉ -->
                <tr>
                    <td class="footer">
                        <strong>PA Consultoria & Estratégia Agro</strong><br>
                        agropa.com.br
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>
  `;
}
