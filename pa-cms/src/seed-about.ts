import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'

function buildLexical(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: text,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1
            }
          ]
        }
      ]
    }
  }
}

function buildLexicalParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: paragraphs.map(p => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            text: p,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            version: 1
          }
        ]
      }))
    }
  }
}

async function seed() {
  const configModule = await import('./payload.config.js')
  const payloadInstance = await getPayload({ config: configModule.default })
  
  console.log('🌱 Iniciando upload de imagens e seed da página Quem Somos...')

  // 1. Upload/reutilização da imagem do Hero Background
  const heroLocalPath = path.resolve(process.cwd(), '../src/assets/Sessão Hero - Quem somos.webp')
  let heroImageId: string | number = ''

  if (fs.existsSync(heroLocalPath)) {
    const existingHero = await payloadInstance.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'Sessao-Hero-Quem-somos.webp',
        },
      },
    })
    
    if (existingHero.docs.length > 0) {
      heroImageId = existingHero.docs[0].id
      console.log(`✓ Reutilizando imagem Hero (ID: ${heroImageId})`)
    } else {
      console.log('-> Fazendo upload da imagem do Hero (via buffer)...')
      const fileBuffer = fs.readFileSync(heroLocalPath)
      try {
        const uploadedHero = await payloadInstance.create({
          collection: 'media',
          data: {
            alt: 'Sessão Hero - Quem somos',
          },
          file: {
            data: fileBuffer,
            name: 'Sessao-Hero-Quem-somos.webp',
            mimetype: 'image/webp',
            size: fileBuffer.length,
          },
        })
        heroImageId = uploadedHero.id
        console.log(`✓ Imagem Hero enviada com sucesso (ID: ${heroImageId})`)
      } catch (err: any) {
        console.error('ERRO DETALHADO DO UPLOAD HERO:', JSON.stringify(err, null, 2))
        throw err
      }
    }
  } else {
    console.log('⚠️ Imagem local do Hero não encontrada em:', heroLocalPath)
  }

  // 2. Upload/reutilização da imagem da Timeline (5120bca5841e59bde1605a7a8c0577bc6d9a3d9c.webp)
  const timelineImgLocalPath = path.resolve(process.cwd(), '../src/assets/images/5120bca5841e59bde1605a7a8c0577bc6d9a3d9c.webp')
  let timelineImageId: string | number = ''

  if (fs.existsSync(timelineImgLocalPath)) {
    const existingTimelineImg = await payloadInstance.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'timeline-img.webp',
        },
      },
    })

    if (existingTimelineImg.docs.length > 0) {
      timelineImageId = existingTimelineImg.docs[0].id
      console.log(`✓ Reutilizando imagem da Timeline (ID: ${timelineImageId})`)
    } else {
      console.log('-> Fazendo upload da imagem da Timeline (via buffer)...')
      const timelineImgBuffer = fs.readFileSync(timelineImgLocalPath)
      const uploadedTimelineImg = await payloadInstance.create({
        collection: 'media',
        data: {
          alt: 'Imagem da história do Grupo PA',
        },
        file: {
          data: timelineImgBuffer,
          name: 'timeline-img.webp',
          mimetype: 'image/webp',
          size: timelineImgBuffer.length,
        },
      })
      timelineImageId = uploadedTimelineImg.id
      console.log(`✓ Imagem da Timeline enviada com sucesso (ID: ${timelineImageId})`)
    }
  } else {
    console.log('⚠️ Imagem local da Timeline não encontrada em:', timelineImgLocalPath)
  }

  // 3. População dos dados da AboutPage global
  const aboutPageData = {
    heroImage: heroImageId || undefined,
    title: 'Nossa gente ',
    subtitle: 'faz a diferença',
    introText: buildLexicalParagraphs([
      'Sediado em Tangará da Serra (MT), o Grupo PA une consultoria agronômica especializada e atendimento próximo para impulsionar a produtividade do produtor. Com um campo experimental próprio, transformamos pesquisas e estudos práticos em dados reais para eliminar o achismo e otimizar os resultados da sua safra.',
      'Simplificamos sua rotina cuidando de toda a gestão de compras de insumos, negociando os melhores preços, prazos e fornecedores do mercado. Pioneiros em agricultura de precisão, usamos GPS e sensoriamento remoto para coletar dados exatos e maximizar o desempenho de cada hectare. Somos a parceria sólida e lucrativa que você busca para o campo. Conte com o Grupo PA para elevar o patamar da sua produção.'
    ]),
    commitment: {
      title: 'Nosso compromisso',
      text: buildLexical('Contribuímos com o desenvolvimento do agronegócio, entregando aos nossos clientes as melhores soluções em produtividade, com excelência na prestação de serviços, tecnologia, pesquisa e respeito às pessoas e ao meio ambiente.'),
    },
    vision: {
      title: 'Onde queremos chegar',
      text: buildLexical('Buscamos ser referência em consultoria agronômica, pesquisa e agricultura de precisão, levando inovação, resultado e confiança para o produtor rural em cada safra.'),
    },
    values: {
      title: 'Os valores que nos movem',
      text: buildLexical('Acreditamos que grandes resultados começam com relações sólidas. Por isso, conduzimos nosso trabalho com honestidade, ética e transparência, valorizando as pessoas, respeitando cada parceria e mantendo a paixão pelo que fazemos em cada desafio do campo.'),
    },
    videoSectionTitle: 'Vídeo Institucional',
    videoSectionTitleAccent: 'teste',
    institutionalVideoUrl: 'https://www.youtube.com/watch?v=2Val9IbUWHk',
    timelineTitle: 'Nossa história',
    timeline: [
      {
        tag: 'o início',
        year: '1993',
        text: buildLexical('O grupo PA teve o início de sua história no Mato Grosso em 1993, através da aquisição da Faz. São Paulo, no distrito de Deciolândia, para o cultivo de soja e milho. Ainda hoje é a principal Fazenda do grupo e onde são localizados nosso campo de pesquisa.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'consultoria',
        year: '2002',
        text: buildLexical('No ano de 2002, nosso founder Paulo Asunção, a convite de um vizinho de terra, começou a prestar serviços de consultoria agronômica. Este foi o primeiro cliente da empresa.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'tecnologia',
        year: '2009',
        text: buildLexical('Em 2009, a PA Consultoria passou a disponibilizar os serviços de agricultura de precisão, sendo uma das primeiras empresas do estado a ofertarem este serviço.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'pesquisa',
        year: '2011',
        text: buildLexical('Iniciamos os trabalhos de Pesquisa Agronômica que hoje conta com uma área de 60 hectares dedicados ao desenvolvimento, gerando resultados importantes para a construção da melhor estratégia produtiva.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'reconhecimento',
        year: '2015',
        text: buildLexical('O CEO e fundador do Grupo PA, Paulo Asunção, recebeu o prêmio de Excelência Agronômica concedido pelo Rally da Safra, um marco importante na sua carreira. Expansão agrícola através da aquisição da Faz. São Miguel.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'destaque',
        year: '2018',
        text: buildLexical('O Grupo PA foi novamente citado pelo Rally da Safra como uma das redes de serviços de consultoria técnica em destaque no setor.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'expansão',
        year: '2020',
        text: buildLexical('O Grupo PA deu início a um novo investimento através de sua participação como acionista na Usina ALD Bioenergia, indústria de produção de biocombustíveis.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'inovação',
        year: '2021',
        text: buildLexical('O trabalho de pesquisa do Grupo PA foi reconhecido como o melhor trabalho da região Cerrado Oeste na 2ª edição do Desafio Microbioma Brasil, apresentado na Escócia.'),
        image: timelineImageId || undefined,
      },
      {
        tag: 'evolução',
        year: 'Atual',
        text: buildLexical('Início das operações da PA Máquinas Agrícolas, negócio organizado para avaliar e negociar a aquisição de maquinários e demais equipamentos para nossos clientes.'),
        image: timelineImageId || undefined,
      },
    ],
  }

  console.log('-> Atualizando a página global "about-page"...')
  await payloadInstance.updateGlobal({
    slug: 'about-page',
    data: aboutPageData,
  })
  
  console.log('✅ Página Quem Somos populada com sucesso no Payload CMS!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Erro durante o seed do Quem Somos:', err)
  process.exit(1)
})
