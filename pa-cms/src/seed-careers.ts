import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'

async function seed() {
  const configModule = await import('./payload.config.js')
  const payloadInstance = await getPayload({ config: configModule.default })
  
  console.log('🌱 Iniciando upload de imagens e seed da página Carreiras...')

  // 1. Upload/reutilização da imagem do Hero Background de Carreiras
  const heroLocalPath = path.resolve(process.cwd(), '../src/assets/images/bg_carreiras.webp')
  let heroImageId: string | number = ''

  if (fs.existsSync(heroLocalPath)) {
    const existingHero = await payloadInstance.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'bg_carreiras.webp',
        },
      },
    })
    
    if (existingHero.docs.length > 0) {
      heroImageId = existingHero.docs[0].id
      console.log(`✓ Reutilizando imagem Hero Carreiras (ID: ${heroImageId})`)
    } else {
      console.log('-> Fazendo upload da imagem do Hero Carreiras...')
      const fileBuffer = fs.readFileSync(heroLocalPath)
      try {
        const uploadedHero = await payloadInstance.create({
          collection: 'media',
          data: {
            alt: 'Hero Carreiras',
          },
          file: {
            data: fileBuffer,
            name: 'bg_carreiras.webp',
            mimetype: 'image/webp',
            size: fileBuffer.length,
          },
        })
        heroImageId = uploadedHero.id
        console.log(`✓ Imagem Hero Carreiras enviada com sucesso! (ID: ${heroImageId})`)
      } catch (err) {
        console.error('Erro ao enviar imagem Hero Carreiras:', err)
      }
    }
  } else {
    console.warn(`Aviso: Arquivo de imagem local não encontrado em: ${heroLocalPath}`)
  }

  // 2. Populando o global "careers-page"
  console.log('-> Atualizando a página global "careers-page"...')
  await payloadInstance.updateGlobal({
    slug: 'careers-page',
    data: {
      heroImage: heroImageId || undefined,
      title: 'Faça parte ',
      titleHighlight: 'da PA',
      introText: 'Faça parte do Grupo PA e cresça junto com quem transforma o agronegócio todos os dias. Valorizamos pessoas comprometidas, inovadoras e apaixonadas pelo que fazem. Aqui, acreditamos no desenvolvimento profissional, no trabalho em equipe e na construção de relações sólidas, tanto no campo quanto dentro da nossa equipe. Venha construir o futuro do agro com a gente.'
    }
  })
  
  console.log('✅ Seed da página Carreiras finalizado com sucesso!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Erro ao rodar seed de Carreiras:', err)
  process.exit(1)
})
