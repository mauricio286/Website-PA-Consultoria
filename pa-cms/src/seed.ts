import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

// Use dynamic imports to prevent hoisting so environment variables are loaded first
const { getPayload } = await import('payload')
const { default: config } = await import('./payload.config.js')

async function seed() {
  const payloadInstance = await getPayload({ config })
  console.log('🌱 Iniciando seed dos serviços e homepage...')

  const servicesData = [
    { title: 'Consultoria Agronômica', shortDescription: 'Gestão técnica completa para maximizar a produtividade.', order: 1, published: true },
    { title: 'Unitá', shortDescription: 'Plataforma integrada de dados.', order: 2, published: true },
    { title: 'Agricultura de Precisão', shortDescription: 'Tecnologia avançada para aplicação em taxa variável.', order: 3, published: true },
    { title: 'Gestão de Compras', shortDescription: 'Assessoria estratégica na aquisição de insumos.', order: 4, published: true },
  ]

  for (const svc of servicesData) {
    try {
      await payloadInstance.create({ collection: 'services', data: svc })
    } catch (e) {
      console.log('Ignorando serviço já existente ou com erro:', svc.title)
    }
  }
  console.log('✓ Serviços processados')

  try {
    await payloadInstance.updateGlobal({
      slug: 'home-page',
      data: {
        heroTitle: 'Resultados que o campo comprova!',
        heroSubtitle: 'Consultoria agronômica especializada para produtores que buscam excelência, rentabilidade e segurança em cada hectare plantado.',
        heroCtaLabel: 'Nossas soluções',
        heroCtaUrl: '#servicos',
        testimonialsTitle: 'A escolha dos líderes ',
        testimonialsTitleAccent: 'que inovam no campo',
      },
    })
    console.log('✓ HomePage populado')
  } catch (e) {
    console.log('Erro ao atualizar HomePage', e)
  }

  try {
    await payloadInstance.updateGlobal({
      slug: 'contact-settings',
      data: {
        formTitle: 'Fale conosco',
        formDescription: 'Nosso time está à disposição para esclarecer dúvidas, apresentar nossos serviços e ajudar você a encontrar as melhores soluções para sua realidade. Entre em contato conosco. Será um prazer conversar com você.',
        mainEmail: 'contato@agropa.com.br',
        phone: '(65) 3016-1203',
        whatsapp: '',
        addresses: [
          {
            title: "Grupo PA - Matriz",
            address: "Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra-MT - 78306-157",
            phone: "(65) 3016-1203",
            email: "contato@agropa.com.br"
          },
          {
            title: "Faz. São Paulo",
            address: "Rod. BR-364 , KM 724 + 15Km à direita - Zona Rural, Diamantino-MT - 78.304-000",
            phone: "(65) 3325-3129",
            email: "administrativoagricola@agropa.com.br"
          },
          {
            title: "Sinop",
            address: "Galeria Trivium – Sala 01, Rua das Andirobas, 223, Setor Comercial, CEP: 78550-000",
            phone: '',
            email: ''
          }
        ]
      },
    })
    console.log('✓ ContactSettings populado')
  } catch (e) {
    console.log('Erro ao atualizar ContactSettings', e)
  }

  try {
    await payloadInstance.updateGlobal({
      slug: 'footer-settings',
      data: {
        addresses: [
          {
            label: "Matriz Tangará",
            text: "Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra - MT, 78306-157",
            mapsUrl: "https://www.google.com/maps/place/-14.6335131,-57.5054472"
          },
          {
            label: "Filial Diamantino",
            text: "Rod. BR-364, KM 724 + 15Km à direita - Zona Rural, Diamantino - MT, 78304-000",
            mapsUrl: "https://www.google.com/maps/place/-14.053104768419136,-57.302202616270456"
          }
        ]
      },
    })
    console.log('✓ FooterSettings populado')
  } catch (e) {
    console.log('Erro ao atualizar FooterSettings', e)
  }

  console.log('\n✅ Seed finalizado!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Erro no seed:', err)
  process.exit(1)
})
