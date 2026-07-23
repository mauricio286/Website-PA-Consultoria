import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'

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

async function uploadMedia(payloadInstance: any, relativePath: string, altText: string) {
  const localPath = path.resolve(process.cwd(), relativePath)
  if (!fs.existsSync(localPath)) {
    console.log(`⚠️ Arquivo local não encontrado em: ${localPath}`)
    return undefined
  }
  
  const filename = path.basename(localPath)
  
  // check if already uploaded
  const existing = await payloadInstance.find({
    collection: 'media',
    where: {
      filename: {
        equals: filename,
      },
    },
  })
  
  if (existing.docs.length > 0) {
    console.log(`✓ Reutilizando mídia: ${filename}`)
    return existing.docs[0].id
  }
  
  console.log(`-> Fazendo upload da mídia: ${filename}...`)
  const fileBuffer = fs.readFileSync(localPath)
  let mimetype = 'image/webp'
  if (filename.endsWith('.png')) mimetype = 'image/png'
  if (filename.endsWith('.svg')) mimetype = 'image/svg+xml'
  
  const uploaded = await payloadInstance.create({
    collection: 'media',
    data: { alt: altText },
    file: {
      data: fileBuffer,
      name: filename,
      mimetype: mimetype,
      size: fileBuffer.length,
    },
  })
  console.log(`✓ Mídia enviada com sucesso: ${filename} (ID: ${uploaded.id})`)
  return uploaded.id
}

async function seed() {
  const configModule = await import('./payload.config.js')
  const payloadInstance = await getPayload({ config: configModule.default })
  
  console.log('🌱 Iniciando upload de imagens e seed dos Serviços...')

  // 1. Upload de mídias gerais da página principal
  const heroImageId = await uploadMedia(payloadInstance, '../src/assets/images/bg_servicos.webp', 'Background Serviços')
  const aldCardImageId = await uploadMedia(payloadInstance, '../src/assets/images/ald_bioenergia.webp', 'ALD Bioenergia Card')
  const lavouraCardImageId = await uploadMedia(payloadInstance, '../src/assets/images/lavoura.webp', 'Lavoura Card')
  const centroCardImageId = await uploadMedia(payloadInstance, '../src/assets/images/centro_pesquisa.webp', 'Centro de Pesquisa Card')
  const eventosCardImageId = await uploadMedia(payloadInstance, '../src/assets/images/eventos.webp', 'Eventos Card')

  // 2. Upload de mídias específicas dos serviços
  const bgConsultoriaId = await uploadMedia(payloadInstance, '../src/assets/images/bg_consultoria_agronomica.webp', 'Hero Consultoria Agronômica')
  const imgConsultoriaId = await uploadMedia(payloadInstance, '../src/assets/images/img_consultoria_agronomica.webp', 'Ilustração Consultoria Agronômica')

  const bgUnitaId = await uploadMedia(payloadInstance, '../src/assets/images/bg_unita.png', 'Hero Unitá')
  const imgUnitaId = await uploadMedia(payloadInstance, '../src/assets/images/img_unita.png', 'Ilustração Unitá')

  const bgAgriculturaId = await uploadMedia(payloadInstance, '../src/assets/images/bg_agricultura_precisao.webp', 'Hero Agricultura de Precisão')
  const imgAgriculturaId = await uploadMedia(payloadInstance, '../src/assets/images/img_agricultura_precisao.webp', 'Ilustração Agricultura de Precisão')

  const bgGestaoId = await uploadMedia(payloadInstance, '../src/assets/images/bg_gestao_compras.webp', 'Hero Gestão de Compras')
  const imgGestaoId = await uploadMedia(payloadInstance, '../src/assets/images/img_gestao_compras.webp', 'Ilustração Gestão de Compras')

  // 3. Atualizar Serviços global
  console.log('-> Atualizando a página global "services-page"...')
  await payloadInstance.updateGlobal({
    slug: 'services-page',
    data: {
      heroImage: heroImageId || undefined,
      servicesBadge: 'Eixos de Atuação',
      servicesTitle: 'Nossos',
      servicesSubtitle: 'serviços',
      servicesDescription: 'Do planejamento ao pós-colheita, atuamos de forma estratégica para que cada decisão no campo seja mais eficiente e rentável. Nossos serviços unem acompanhamento técnico, agricultura de precisão, pesquisa e análise de dados para otimizar produtividade, reduzir perdas e gerar resultados consistentes em cada safra.',
      servicesCards: [
        {
          title: 'Consultoria\nAgronômica',
          shortDescription: 'A produtividade de uma lavoura começa muito antes do plantio. Por isso, nossa consultoria agronômica atua de forma próxima...',
          slug: 'consultoria-agronomica'
        },
        {
          title: 'Unitá',
          shortDescription: 'Plataforma integrada de dados agrícolas para gestão e monitoramento da lavoura.',
          slug: 'unita'
        },
        {
          title: 'Agricultura\nde Precisão',
          shortDescription: 'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente...',
          slug: 'agricultura-de-precisao'
        },
        {
          title: 'Gestão\nde Compras',
          shortDescription: 'A gestão de compras vai muito além da negociação de valores. Nosso...',
          slug: 'gestao-de-compras'
        },
        {
          title: 'Pesquisa\nAgronômica',
          shortDescription: 'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente...',
          slug: 'pesquisa-agronomica'
        }
      ],
      ecosystemBadge: 'nossa força no campo',
      ecosystemTitle: 'Eco',
      ecosystemSubtitle: 'sistema',
      ecosystemCards: [
        { title: 'ALD Bioenergia', image: aldCardImageId || undefined, link: '/aldbioenergia' },
        { title: 'Lavoura', image: lavouraCardImageId || undefined, link: '#' },
        { title: 'Centro de Pesquisa', image: centroCardImageId || undefined, link: '#' },
        { title: 'Eventos', image: eventosCardImageId || undefined, link: '#' }
      ]
    }
  })
  console.log('✓ Serviços global populado')

  // 4. Inserir ou atualizar os 4 Serviços individuais
  const servicesList = [
    {
      title: 'Consultoria\nAgronômica',
      slug: 'consultoria-agronomica',
      shortDescription: 'A produtividade de uma lavoura começa muito antes do plantio. Por isso, nossa consultoria agronômica atua de forma próxima...',
      coverImage: bgConsultoriaId,
      illustrationImage: imgConsultoriaId,
      showIllustration: true,
      leftContent: buildLexicalParagraphs([
        'A produtividade de uma lavoura começa muito antes do plantio. Por isso, nossa consultoria agronômica atua de forma próxima e estratégica em todas as etapas da safra, desenvolvendo recomendações técnicas com foco na rentabilidade, segurança e produtividade da atividade.',
        'Atuamos com foco no planejamento, escolha de cultivares, manejo fitossanitário e nutricional. Nosso trabalho envolve orientação sobre posicionamento de cultivares, fertilidade do solo, controle de pragas, doenças and plantas daninhas, sempre baseando as decisões em resultados práticos de pesquisa agronômica.'
      ]),
      bottomContent: buildLexicalParagraphs([
        'Mais do que indicar recomendações, buscamos construir relações de confiança com nossos parceiros, que impulsionem desempenho e rentabilidade de ponta. Acreditamos que cada área possui desafios específicos e, por isso, trabalhamos com soluções personalizadas para maximizar produtividade, reduzir perdas e otimizar a rentabilidade do produtor rural.'
      ])
    },
    {
      title: 'Unitá',
      slug: 'unita',
      shortDescription: 'Plataforma integrada de dados agrícolas para gestão e monitoramento da lavoura.',
      coverImage: bgUnitaId,
      illustrationImage: imgUnitaId,
      showIllustration: true,
      leftContent: buildLexicalParagraphs([
        'A Unitá é a nossa plataforma integrada de monitoramento e inteligência de dados agrícolas. Conectamos sensores, dados climáticos, imagens de satélite e análises laboratoriais em uma única interface inteligente, permitindo decisões em tempo real com embasamento técnico e científico.',
        'Através da Unitá, o produtor tem acesso ao histórico de manejo, mapas de fertilidade, relatórios operacionais e previsão de anomalias no campo, consolidando toda a gestão da lavoura em relatórios simples, visuais e extremamente operacionais.'
      ]),
      bottomContent: buildLexicalParagraphs([
        'A plataforma centraliza a comunicação entre nossos consultores de campo e a gestão da fazenda, garantindo que cada recomendação técnica seja registrada, monitorada e avaliada quanto ao seu impacto econômico e produtivo na safra.',
        'Com o Unitá, eliminamos processos manuais e planilhas desconectadas, unindo a força do monitoramento técnico presencial com a velocidade das melhores tecnologias de análise preditiva no agronegócio.'
      ])
    },
    {
      title: 'Agricultura\nde Precisão',
      slug: 'agricultura-de-precisao',
      shortDescription: 'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente...',
      coverImage: bgAgriculturaId,
      illustrationImage: imgAgriculturaId,
      showIllustration: true,
      leftContent: buildLexicalParagraphs([
        'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente em estudos e validações a campo para desenvolver soluções mais eficientes, sustentáveis e alinhadas à realidade do produtor rural.',
        'Nosso objetivo é transformar dados e experimentos em estratégias práticas que contribuam para o aumento da produtividade e da rentabilidade das lavouras. Atualmente, contamos com mais de 60 hectares destinados exclusivamente à pesquisa, onde realizamos testes envolvendo cultivares, fertilidade, manejo fitossanitário, posicionamento de insumos, interferências climáticas e novas tecnologias aplicadas à agricultura.'
      ]),
      bottomContent: buildLexicalParagraphs([
        'Cada experimento é conduzido com acompanhamento técnico e análise detalhada dos resultados obtidos em campo. Através da pesquisa, conseguimos compreender com mais profundidade o comportamento das culturas e antecipar soluções para os desafios enfrentados pelo produtor. Isso permite gerar informações confiáveis, reduzir riscos e apoiar tomadas de decisão mais assertivas dentro da operação agrícola. Nosso compromisso é aproximar inovação e prática de campo, conectando ciência, tecnologia e experiência agronômica para impulsionar resultados sustentáveis no agro.'
      ])
    },
    {
      title: 'Gestão\nde Compras',
      slug: 'gestao-de-compras',
      shortDescription: 'A gestão de compras vai muito além da negociação de valores. Nosso...',
      coverImage: bgGestaoId,
      illustrationImage: imgGestaoId,
      showIllustration: true,
      leftContent: buildLexicalParagraphs([
        'A gestão de compras vai muito além da negociação de valores. Nosso trabalho é desenvolver estratégias que tragam mais eficiência, segurança e rentabilidade para o produtor rural, analisando o melhor momento de compra, fornecedores, oportunidades de mercado e custo-benefício de cada investimento realizado.',
        'Atuamos na gestão de aquisição de máquinas, equipamentos e insumos agrícolas, fortalecendo o poder de negociação dos nossos clientes e contribuindo para decisões mais assertivas dentro da operação.'
      ]),
      bottomContent: buildLexicalParagraphs([
        'Com conhecimento técnico e visão estratégica do mercado agro, buscamos alternativas que alinhem desempenho operacional, durabilidade e viabilidade econômica.',
        'Além da análise comercial, acompanhamos tendências de mercado, osiclações de preços e novas tecnologias disponíveis, permitindo que o produtor tenha mais clareza e segurança na hora de investir. Nosso objetivo é transformar a compra em uma ferramenta estratégica para melhorar resultados no campo e otimizar custos da operação agrícola. Hoje, o Grupo PA movimenta milhões em gestão de compras, construindo relações sólidas com parceiros e fornecedores para gerar melhores oportunidades aos produtores atendidos.'
      ])
    },
    {
      title: 'Pesquisa\nAgronômica',
      slug: 'pesquisa-agronomica',
      shortDescription: 'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente em estudos e validações a campo...',
      coverImage: bgAgriculturaId,
      illustrationImage: imgAgriculturaId,
      showIllustration: true,
      leftContent: buildLexicalParagraphs([
        'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente em estudos e validações a campo para desenvolver soluções mais eficientes, sustentáveis e alinhadas à realidade do produtor rural.',
        'Nosso objetivo é transformar dados e experimentos em estratégias práticas que contribuam para o aumento da produtividade e da rentabilidade das lavouras. Atualmente, contamos com mais de 60 hectares destinados exclusivamente à pesquisa, onde realizamos testes envolvendo cultivares, fertilidade, manejo fitossanitário, posicionamento de insumos, interferências climáticas e novas tecnologias aplicadas à agricultura.'
      ]),
      bottomContent: buildLexicalParagraphs([
        'Cada experimento é conduzido com acompanhamento técnico e análise detalhada dos resultados obtidos em campo. Através da pesquisa, conseguimos compreender com mais profundidade o comportamento das culturas e antecipar soluções para os desafios enfrentados pelo produtor.',
        'Isso permite gerar informações confiáveis, reduzir riscos e apoiar tomadas de decisão mais assertivas dentro da operação agrícola. Nosso compromisso é aproximar inovação e prática de campo, conectando ciência, tecnologia e experiência agronômica para impulsionar resultados sustentáveis no agro.'
      ])
    }
  ]

  for (const svc of servicesList) {
    const existing = await payloadInstance.find({
      collection: 'services',
      where: { slug: { equals: svc.slug } }
    })

    if (existing.docs.length > 0) {
      console.log(`-> Atualizando serviço existente: ${svc.slug}`)
      await payloadInstance.update({
        collection: 'services',
        id: existing.docs[0].id,
        data: svc
      })
      console.log(`✓ Serviço ${svc.slug} atualizado`)
    } else {
      console.log(`-> Criando novo serviço: ${svc.slug}`)
      await payloadInstance.create({
        collection: 'services',
        data: svc
      })
      console.log(`✓ Serviço ${svc.slug} criado`)
    }
  }

  console.log('\n✅ Seed dos Serviços finalizado com sucesso!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Erro durante o seed dos Serviços:', err)
  process.exit(1)
})
