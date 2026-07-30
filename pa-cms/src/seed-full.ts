/**
 * SEED COMPLETO COM IMAGENS
 * Faz upload das imagens locais para o CMS e associa com os registros corretos.
 * Execute na pasta pa-cms com: npx tsx src/seed-full.ts
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const CMS_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// ─── Utilitários ─────────────────────────────────────────────────────────────

function makeRichText(text: string) {
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
          children: [{ type: 'text', text, version: 1 }],
        },
      ],
    },
  }
}

async function loginToCms(): Promise<string> {
  const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || ''
  // Use a API do Payload para criar um token diretamente sem precisar de senha
  // Em vez disso, importamos o payload diretamente
  return 'local' // Indicador de que estamos usando o payload diretamente
}

// Importar payload diretamente
const { getPayload } = await import('payload')
const { default: config } = await import('./payload.config.js')
const payloadInstance = await getPayload({ config })

// ─── Função de Upload de Imagem ───────────────────────────────────────────────

async function uploadImage(localPath: string, altText: string = ''): Promise<string | null> {
  if (!fs.existsSync(localPath)) {
    console.log(`  ⚠️  Arquivo não encontrado: ${localPath}`)
    return null
  }

  const fileName = path.basename(localPath)
  const mimeType = localPath.endsWith('.webp') ? 'image/webp'
    : localPath.endsWith('.svg') ? 'image/svg+xml'
    : localPath.endsWith('.png') ? 'image/png'
    : localPath.endsWith('.jpg') || localPath.endsWith('.jpeg') ? 'image/jpeg'
    : 'image/png'

  try {
    // Verificar se já existe uma imagem com esse nome
    const existing = await payloadInstance.find({
      collection: 'media',
      where: { filename: { equals: fileName } }
    })

    if (existing.docs.length > 0) {
      console.log(`  ✓ Imagem já existe: ${fileName}`)
      return existing.docs[0].id as string
    }

    // Criar o documento de media com o arquivo
    const fileBuffer = fs.readFileSync(localPath)
    const created = await payloadInstance.create({
      collection: 'media',
      file: {
        data: fileBuffer,
        mimetype: mimeType,
        name: fileName,
        size: fileBuffer.length,
      },
      data: {
        alt: altText || fileName,
      },
    })

    console.log(`  ✓ Upload: ${fileName}`)
    return created.id as string
  } catch (e: any) {
    console.log(`  ✗ Erro ao fazer upload de ${fileName}:`, e?.message || e)
    return null
  }
}

// ─── Caminhos das imagens locais ──────────────────────────────────────────────
const ASSETS = path.resolve(__dirname, '../../src/assets/images')
const ICONS = path.resolve(__dirname, '../../src/assets/icons')

function img(name: string) { return path.join(ASSETS, name) }
function icon(name: string) { return path.join(ICONS, name) }

// ─── SEED PRINCIPAL ───────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Iniciando seed COMPLETO com upload de imagens...')
  console.log(`📡 CMS: ${CMS_URL}`)

  // ── 1. Upload das imagens principais ─────────────────────────────────────
  console.log('\n📸 Fazendo upload das imagens...')

  const bgHeroId       = await uploadImage(img('bg_hero.webp'), 'Hero background')
  const introImgId     = await uploadImage(img('img_introducao.png'), 'Introdução - Grupo PA')
  const quemSomosImgId = await uploadImage(img('Sessão Hero - Quem somos.webp'), 'Quem somos - Hero')

  // Logos parceiros
  const basf    = await uploadImage(img('BASF.png'), 'BASF')
  const bayer   = await uploadImage(img('BAYER.png'), 'Bayer')
  const syngenta = await uploadImage(img('Syngenta.png'), 'Syngenta')
  const corteva = await uploadImage(img('Corteva.svg'), 'Corteva')

  // Galeria (slider de parceria)
  const rect1 = await uploadImage(img('baa238e3fc02b3d400d6dd088e117e24270f8fc2.webp'), 'Parceria 1')
  const rect2 = await uploadImage(img('beedb545b44dc721b1a3a132868eb0c4e8cc4bab.webp'), 'Parceria 2')
  const rect3 = await uploadImage(img('85f6e4495a4d96ad341bbddff77d858a677161d7.webp'), 'Parceria 3')
  const rect4 = await uploadImage(img('94372e485b12b23ae709386aacf102bb3f9a4435.webp'), 'Parceria 4')
  const rect5 = await uploadImage(img('777b3ea0100fa9d7bdeab3a9e9e3dc8dc1214130.webp'), 'Parceria 5')
  const rect6 = await uploadImage(img('4d05cbcbb57228e29cb0115182c019bf0417b22b.webp'), 'Parceria 6')

  // Depoimentos (avatares)
  const avatar1 = await uploadImage(img('971dc91ffb3df0e774cb402e6525eb1b44564eb4.jpg'), 'Aline Albuquerque')
  const avatar2 = await uploadImage(img('3556d9be59a0ee15266fcdd51184fd62ffd60e02.jpg'), 'Geraldo Augusto')
  const avatar3 = await uploadImage(img('65c4d9fbb138a93ced0c88eca17bafbf1d87fb04.jpg'), 'Ricardo Mantovani')
  const avatar4 = await uploadImage(img('c2dddb294cb9e1059aa217cd8c4c942951c32917.jpg'), 'José Carlos Junqueira')

  // Serviços - backgrounds e imagens
  const bgConsultoria   = await uploadImage(img('bg_consultoria_agronomica.webp'), 'BG Consultoria Agronômica')
  const imgConsultoria  = await uploadImage(img('img_consultoria_agronomica.webp'), 'Consultoria Agronômica')
  const bgAgriPrecisao  = await uploadImage(img('bg_agricultura_precisao.webp'), 'BG Agricultura de Precisão')
  const imgAgriPrecisao = await uploadImage(img('img_agricultura_precisao.webp'), 'Agricultura de Precisão')
  const bgGestao        = await uploadImage(img('bg_gestao_compras.webp'), 'BG Gestão de Compras')
  const imgGestao       = await uploadImage(img('img_gestao_compras.webp'), 'Gestão de Compras')
  const bgUnita         = await uploadImage(img('bg_unita.png'), 'BG Unitá')
  const imgUnita        = await uploadImage(img('img_unita.png'), 'Unitá')

  // Ecossistema
  const lavoura        = await uploadImage(img('lavoura.webp'), 'Lavoura')
  const eventos        = await uploadImage(img('eventos.webp'), 'Palestras e Eventos')
  const centroPesquisa = await uploadImage(img('centro_pesquisa.webp'), 'Centro de Pesquisa')
  const aldBioenergia  = await uploadImage(img('ald_bioenergia.webp'), 'ALD Bioenergia')

  // Backgrounds página Serviços e Carreiras
  const bgServicos  = await uploadImage(img('bg_servicos.webp'), 'BG Serviços')
  const bgCarreiras = await uploadImage(img('bg_carreiras_novo.png'), 'BG Carreiras')
  const bgContato   = await uploadImage(img('bg_contato.webp'), 'BG Contato')
  const bgAld       = await uploadImage(img('bg_ald.webp'), 'BG ALD Bioenergia')

  // ALD seção imagens
  const aldImg1 = await uploadImage(img('img_ald_1.png'), 'ALD Bioenergia Imagem 1')
  const aldImg2 = await uploadImage(img('img_ald_2.webp'), 'ALD Bioenergia Imagem 2')

  console.log('\n✓ Uploads concluídos!')

  // ── 2. Depoimentos ────────────────────────────────────────────────────────
  console.log('\n💬 Populando depoimentos...')

  const testimonialData = [
    {
      order: 1,
      authorName: 'Ricardo Mantovani',
      authorDescription_pt: 'Grupo Mantovani • Sorriso - MT',
      authorDescription_en: 'Mantovani Group • Sorriso - MT',
      quote_pt: 'O que eu mais gosto na equipe é que eles não são consultores de escritório. Estão sempre aqui na fazenda, entram no talhão, olham a praga de perto e discutem o manejo comigo no pátio. É um suporte técnico que dá muita segurança para decidir.',
      quote_en: 'What I like most about the team is that they are not office consultants. They are always here at the farm, entering the field, looking at pests up close, and discussing management with me in the yard. It\'s technical support that gives a lot of confidence when making decisions.',
      photoId: avatar3,
    },
    {
      order: 2,
      authorName: 'Aline Albuquerque',
      authorDescription_pt: 'Agropecuária Albuquerque • Rio Verde - GO',
      authorDescription_en: 'Albuquerque Agribusiness • Rio Verde - GO',
      quote_pt: 'A gente comprou maquinário novo e várias ferramentas digitais, mas faltava braço e treinamento para fazer tudo rodar. O pessoal da PA destravou isso aqui dentro, gerando os mapas de aplicação que a gente precisava para economizar insumo.',
      quote_en: 'We bought new machinery and various digital tools, but we were missing the hands and training to get everything running. The PA team unlocked that for us, generating the application maps we needed to save on inputs.',
      photoId: avatar1,
    },
    {
      order: 3,
      authorName: 'Geraldo Augusto',
      authorDescription_pt: 'Fazenda Santa Maria • Cristalina - GO',
      authorDescription_en: 'Santa Maria Farm • Cristalina - GO',
      quote_pt: 'A gente já colhia bem, mas a parte de custos era meio bagunçada, tudo na cabeça ou em caderneta. Eles ajudaram a organizar os números da safra e a enxergar para onde estava indo o dinheiro. Hoje a fazenda roda muito mais profissional.',
      quote_en: 'We already harvested well, but the cost side was a bit disorganized, everything in our heads or in a notebook. They helped organize the harvest numbers and see where the money was going. Today the farm runs much more professionally.',
      photoId: avatar2,
    },
    {
      order: 4,
      authorName: 'José Carlos Junqueira',
      authorDescription_pt: 'Fazenda Primavera • Uberaba - MG',
      authorDescription_en: 'Primavera Farm • Uberaba - MG',
      quote_pt: 'Trabalhar com a PA me tirou uma preocupação grande da cabeça. Sei que a parte de recomendação, perfil de solo e o monitoramento técnico estão bem assistidos por quem entende do assunto, aí consigo focar em outras frentes do negócio.',
      quote_en: 'Working with PA took a big worry off my mind. I know that the recommendation, soil profile, and technical monitoring are well handled by people who know what they\'re doing, so I can focus on other aspects of the business.',
      photoId: avatar4,
    },
  ]

  for (const dep of testimonialData) {
    try {
      const existing = await payloadInstance.find({
        collection: 'testimonials',
        where: { authorName: { equals: dep.authorName } },
      })

      const data: any = {
        authorName: dep.authorName,
        authorDescription: dep.authorDescription_pt,
        quote: dep.quote_pt,
        order: dep.order,
        published: true,
        ...(dep.photoId ? { photo: dep.photoId } : {}),
      }

      let docId: string | number
      if (existing.docs.length > 0) {
        docId = existing.docs[0].id
        await payloadInstance.update({ collection: 'testimonials', id: docId, locale: 'pt', data })
      } else {
        const created = await payloadInstance.create({ collection: 'testimonials', locale: 'pt', data })
        docId = created.id
      }

      await payloadInstance.update({
        collection: 'testimonials',
        id: docId,
        locale: 'en',
        data: {
          authorDescription: dep.authorDescription_en,
          quote: dep.quote_en,
        },
      })
    } catch (e: any) {
      console.log(`  ✗ Erro no depoimento ${dep.authorName}:`, e?.message)
    }
  }
  console.log('✓ Depoimentos populados')

  // ── 3. Global HomePage com imagens ───────────────────────────────────────
  console.log('\n🏠 Atualizando HomePage com imagens...')
  try {
    const homeLogos: any[] = []
    if (basf) homeLogos.push({ logo: basf, alt: 'BASF' })
    if (bayer) homeLogos.push({ logo: bayer, alt: 'Bayer' })
    if (syngenta) homeLogos.push({ logo: syngenta, alt: 'Syngenta' })
    if (corteva) homeLogos.push({ logo: corteva, alt: 'Corteva' })

    const galleryImages: any[] = []
    if (rect1) galleryImages.push({ image: rect1 })
    if (rect2) galleryImages.push({ image: rect2 })
    if (rect3) galleryImages.push({ image: rect3 })
    if (rect4) galleryImages.push({ image: rect4 })
    if (rect5) galleryImages.push({ image: rect5 })
    if (rect6) galleryImages.push({ image: rect6 })

    await payloadInstance.updateGlobal({
      slug: 'home-page',
      locale: 'pt',
      draft: false,
      data: {
        heroTitle: 'Resultados\nque o campo\ncomprova!',
        heroSubtitle: 'Consultoria agronômica especializada para produtores que buscam excelência, rentabilidade e segurança em cada hectare plantado.',
        heroCtaLabel: 'Nossas soluções',
        heroCtaUrl: '/servicos',
        ...(bgHeroId ? { heroImage: bgHeroId } : {}),
        heroLogos: homeLogos,

        introTitle: 'Introdução',
        introText: makeRichText('No campo, resultado não acontece por acaso. Ele nasce de experiência, estratégia e decisões bem tomadas. Há mais de 20 anos, o Grupo PA caminha ao lado do produtor rural, unindo consultoria técnica, agricultura de precisão e gestão para transformar conhecimento em produtividade.'),
        introCtaLabel: 'Ver mais',
        introCtaUrl: '/quem-somos',
        ...(introImgId ? { introImage: introImgId } : {}),

        bannerText: 'Sua próxima safra,\npode ser ainda',
        bannerTextAlign: 'center',
        bannerTextAccent: 'melhor conosco!',

        statsTag: 'resultados',
        statsTitle: 'Números que',
        statsTitleAccent: 'traduzem excelência',
        statsTitleAlign: 'left',
        statsSubtext: 'Os números são consequência de um trabalho feito com proximidade, análise e presença no campo. Cada resultado carrega planejamento técnico, acompanhamento constante e a confiança de produtores que crescem junto com a gente.',
        statsSubtextAlign: 'left',

        methodologyBadge: 'Estrutura',
        methodologyTitle: 'Pilares Metodológicos',
        methodologyTitleAlign: 'left',
        methodologyCards: [
          { title: 'Estratégia', description: 'Decisões orientadas por pesquisa, objetivos e visão de longo prazo, transformando informações agronômicas em ações práticas que maximizam a produtividade, a rentabilidade e a sustentabilidade dos sistemas produtivos.' },
          { title: 'Execução', description: 'Decisões embasadas em dados, clima e mercado para mitigar riscos antes mesmo do plantio.' },
          { title: 'Tecnologia', description: 'Uso das melhores ferramentas de agricultura digital para otimizar recursos e monitorar a saúde da sua safra em tempo real.' },
        ],

        mapTag: 'Atuação',
        mapTitle: 'Onde estamos',
        mapDescription: 'Estamos presentes em mais de 30 municípios, atuando nas culturas de soja, milho, entre outras, com mapeamento preciso para aumentar sua produtividade.',
        mapLogos: homeLogos,

        galleryTitle: 'parceria',
        gallerySubtitle: 'Nós estamos em movimento constante para levar o melhor da pesquisa e inovação até o produtor.',
        galleryImages,

        testimonialsTag: 'depoimentos',
        testimonialsTitle: 'Parcerias que comprovam',
        testimonialsTitleAccent: 'resultados',
        ctaText: null,
        ctaButtonLabel: 'Fale com um consultor',
        ctaButtonUrl: '/contato',
      },
    })

    await payloadInstance.updateGlobal({
      slug: 'home-page',
      locale: 'en',
      draft: false,
      data: {
        heroTitle: 'Results\nproven by\nthe field!',
        heroSubtitle: 'Specialized agronomic consulting for farmers seeking excellence, profitability, and security in every planted hectare.',
        heroCtaLabel: 'Our solutions',
        heroCtaUrl: '/servicos',
        introTitle: 'Introduction',
        introText: makeRichText('In the field, results don\'t happen by chance. They are born from experience, strategy, and well-made decisions. For over 20 years, Grupo PA has walked alongside rural producers, combining technical consulting, precision agriculture, and management to turn knowledge into productivity.'),
        introCtaLabel: 'Learn more',
        introCtaUrl: '/quem-somos',
        bannerText: 'Your next harvest\ncan be even',
        bannerTextAccent: 'better with us!',
        statsTag: 'results',
        statsTitle: 'Numbers that',
        statsTitleAccent: 'translate excellence',
        statsSubtext: 'Numbers are the result of work done with closeness, analysis, and field presence. Each result carries technical planning, constant monitoring, and the trust of farmers who grow alongside us.',
        methodologyBadge: 'Structure',
        methodologyTitle: 'Methodological Pillars',
        methodologyCards: [
          { title: 'Strategy', description: 'Research-driven decisions, long-term vision, and objectives that turn agronomic insights into practical actions maximizing productivity, profitability, and sustainability across production systems.' },
          { title: 'Execution', description: 'Data-driven decisions based on climate and market conditions to mitigate risks even before planting.' },
          { title: 'Technology', description: 'Using the best digital agriculture tools to optimize resources and monitor your crop health in real time.' },
        ],
        mapTag: 'Coverage',
        mapTitle: 'Where we are',
        mapDescription: 'We are present in over 30 municipalities, working with soy, corn, and other crops, with precise mapping to boost your productivity.',
        galleryTitle: 'partnership',
        gallerySubtitle: 'We are in constant motion to bring the best of research and innovation to the farmer.',
        testimonialsTag: 'testimonials',
        testimonialsTitle: 'Partnerships that prove',
        testimonialsTitleAccent: 'results',
        ctaButtonLabel: 'Talk to a consultant',
        ctaButtonUrl: '/contato',
      },
    })
    console.log('✓ HomePage atualizada com imagens (PT & EN)')
  } catch (e: any) {
    console.log('✗ Erro ao atualizar HomePage:', e?.message)
  }

  // ── 4. Global AboutPage com imagem ───────────────────────────────────────
  console.log('\n👥 Atualizando AboutPage...')
  try {
    const aboutData: any = {
      introTag: 'quem somos',
      title: 'Nossa gente',
      subtitle: 'faz a diferença',
      introText: makeRichText('Sediado em Tangará da Serra (MT), o Grupo PA une consultoria agronômica especializada e atendimento próximo para impulsionar a produtividade do produtor. Com um campo experimental próprio, transformamos pesquisas e estudos práticos em dados reais para eliminar o achismo e otimizar os resultados da sua safra.\n\nSimplificamos sua rotina cuidando de toda a gestão de compras de insumos, negociando os melhores preços, prazos e fornecedores do mercado. Pioneiros em agricultura de precisão, usamos GPS e sensoriamento remoto para coletar dados exatos e maximizar o desempenho de cada hectare. Somos a parceria sólida e lucrativa que você busca para o campo. Conte com o Grupo PA para elevar o patamar da sua produção.'),
      commitment: { title: 'Nosso compromisso', text: makeRichText('Contribuímos com o desenvolvimento do agronegócio, entregando aos nossos clientes as melhores soluções em produtividade, com excelência na prestação de serviços, tecnologia, pesquisa e respeito às pessoas e ao meio ambiente.') },
      vision: { title: 'Onde queremos chegar', text: makeRichText('Buscamos ser referência em consultoria agronômica, pesquisa e agricultura de precisão, levando inovação, resultado e confiança para o produtor rural em cada safra.') },
      values: { title: 'Os valores que nos movem', text: makeRichText('Acreditamos que grandes resultados começam com relações sólidas. Por isso, conduzimos nosso trabalho com honestidade, ética e transparência, valorizando as pessoas, respeitando cada parceria e mantendo a paixão pelo que fazemos em cada desafio do campo.') },
      videoSectionTag: 'institucional',
      videoSectionTitle: 'Vídeo',
      videoSectionTitleAccent: 'Institucional',
      institutionalVideoUrl: 'https://www.youtube.com/embed/2Val9IbUWHk',
      timelineTag: 'timeline',
      timelineTitle: 'Nossa história',
      timeline: [
        { tag: 'o início', year: '1993', text: makeRichText('O Grupo PA teve o início de sua história no Mato Grosso em 1993, através da aquisição da Faz. São Paulo, em Diamantino - MT, para o cultivo de soja e milho. Ainda hoje é a principal Fazenda do grupo e onde está localizado nosso campo de pesquisa.') },
        { tag: 'consultoria', year: '2002', text: makeRichText('No ano de 2002, nosso fundador Paulo Asunção, a convite de um vizinho de terra, começou a prestar serviços de consultoria agronômica. Este foi o primeiro cliente da empresa e segue conosco até hoje.') },
        { tag: 'tecnologia', year: '2009', text: makeRichText('Em 2009, a PA Consultoria passou a disponibilizar os serviços de agricultura de precisão, sendo uma das primeiras empresas do estado a oferecer este serviço.') },
        { tag: 'pesquisa', year: '2011', text: makeRichText('Iniciamos os trabalhos de Pesquisa Agronômica que hoje conta com uma área de 60 ha e mais de 2.000 tratamentos dedicados ao desenvolvimento, gerando resultados importantes para a construção da melhor estratégia produtiva.') },
        { tag: 'evento', year: '2013', text: makeRichText('A PA Pesquisa realizou seu primeiro dia de campo em seu campo de pesquisa na Faz. São Paulo, reunindo cerca de 30 produtores.') },
        { tag: 'novas culturas', year: '2023', text: makeRichText('A PA Consultoria passou a atender a cultura do algodão.') },
        { tag: 'expansão', year: '2024', text: makeRichText('Comprometidos com nossa missão em contribuir com o desenvolvimento do agronegócio, expandimos e passamos a atender a região do Nortão Mato-Grossense.') },
        { tag: 'investimento', year: '2026', text: makeRichText('O Grupo PA segue investindo no agro e no Mato Grosso. Como acionistas da ALD Bioenergia, realizamos novos investimentos para a triplicação da planta.') },
      ],
    }
    if (quemSomosImgId) (aboutData as any).heroImage = quemSomosImgId

    await payloadInstance.updateGlobal({ slug: 'about-page', locale: 'pt', draft: false, data: aboutData })
    await payloadInstance.updateGlobal({
      slug: 'about-page', locale: 'en', draft: false,
      data: {
        introTag: 'about us',
        title: 'Our people',
        subtitle: 'make the difference',
        introText: makeRichText('Based in Tangará da Serra (MT), Grupo PA combines specialized agronomic consulting and close support to boost producer productivity. With our own experimental field, we transform research and practical studies into real data to eliminate guesswork and optimize your harvest results.\n\nWe simplify your routine by handling all input procurement management, negotiating the best prices, terms, and suppliers on the market. Pioneers in precision agriculture, we use GPS and remote sensing to collect precise data and maximize the performance of every hectare. We are the solid and profitable partnership you seek for the field. Count on Grupo PA to elevate your production standards.'),
        commitment: { title: 'Our commitment', text: makeRichText('We contribute to the development of agribusiness, delivering to our clients the best productivity solutions, with excellence in services, technology, research, and respect for people and the environment.') },
        vision: { title: 'Where we want to go', text: makeRichText('We aim to be a reference in agronomic consulting, research, and precision agriculture, bringing innovation, results, and trust to farmers in every season.') },
        values: { title: 'The values that drive us', text: makeRichText('We believe that great results start with strong relationships. That is why we conduct our work with honesty, ethics, and transparency, valuing people, respecting every partnership, and maintaining our passion for what we do in every field challenge.') },
        videoSectionTag: 'institutional',
        videoSectionTitle: 'Institutional',
        videoSectionTitleAccent: 'Video',
        institutionalVideoUrl: 'https://www.youtube.com/embed/2Val9IbUWHk',
        timelineTag: 'timeline',
        timelineTitle: 'Our history',
        timeline: [
          { tag: 'the beginning', year: '1993', text: makeRichText('Grupo PA began its history in Mato Grosso in 1993, through the acquisition of Faz. São Paulo, in Diamantino - MT, for soybean and corn cultivation. It remains the group\'s main farm and the location of our research field to this day.') },
          { tag: 'consulting', year: '2002', text: makeRichText('In 2002, our founder Paulo Asunção, at the invitation of a neighboring landowner, began providing agronomic consulting services. This was the company\'s first client and remains with us to this day.') },
          { tag: 'technology', year: '2009', text: makeRichText('In 2009, PA Consultoria began offering precision agriculture services, being one of the first companies in the state to provide this service.') },
          { tag: 'research', year: '2011', text: makeRichText('We began Agronomic Research work that today covers an area of 60 hectares with over 2,000 treatments dedicated to development, generating important results for building the best production strategy.') },
          { tag: 'event', year: '2013', text: makeRichText('PA Research held its first field day at its research field at Faz. São Paulo, gathering about 30 producers.') },
          { tag: 'new crops', year: '2023', text: makeRichText('PA Consultoria began serving the cotton crop.') },
          { tag: 'expansion', year: '2024', text: makeRichText('Committed to our mission of contributing to the development of agribusiness, we expanded and began serving the Northern Mato Grosso region.') },
          { tag: 'investment', year: '2026', text: makeRichText('Grupo PA continues to invest in agriculture and in Mato Grosso. As shareholders of ALD Bioenergy, we made new investments to triple the plant.') },
        ],
      },
    })
    console.log('✓ AboutPage atualizada (PT & EN)')
  } catch (e: any) {
    console.log('✗ Erro ao atualizar AboutPage:', e?.message)
  }

  // ── 5. ServicesPage com imagens ───────────────────────────────────────────
  console.log('\n🌱 Atualizando ServicesPage...')
  try {
    const ecosystemCards: any[] = [
      { title: 'ALD Bioenergia', link: '/aldbioenergia', ...(aldBioenergia ? { image: aldBioenergia } : {}) },
      { title: 'Lavoura', link: '/lavoura', ...(lavoura ? { image: lavoura } : {}) },
      { title: 'Centro de Pesquisa', link: '/centropesquisa', ...(centroPesquisa ? { image: centroPesquisa } : {}) },
      { title: 'Palestras e Eventos', link: '/palestras', ...(eventos ? { image: eventos } : {}) },
    ]

    await payloadInstance.updateGlobal({
      slug: 'services-page', locale: 'pt', draft: false,
      data: {
        servicesBadge: 'Nossas Soluções',
        servicesTitle: 'Estrutura de',
        servicesSubtitle: 'Soluções Integradas',
        servicesDescription: 'Oferecemos suporte técnico agronômico de alto nível, unindo agricultura de precisão, planejamento de compras e análises em tempo real para otimizar seus resultados em cada safra.',
        ...(bgServicos ? { servicesBgImage: bgServicos } : {}),
        servicesCards: [
          { title: 'Consultoria\nAgronômica', shortDescription: 'Acompanhamento do planejamento à colheita para maximizar sua lucratividade.', slug: 'consultoria-agronomica', ...(bgConsultoria ? { bgImage: bgConsultoria } : {}), ...(imgConsultoria ? { image: imgConsultoria } : {}) },
          { title: 'Unitá', shortDescription: 'Plataforma inteligente que conecta dados do campo para tomadas de decisão rápidas.', slug: 'unita', ...(bgUnita ? { bgImage: bgUnita } : {}), ...(imgUnita ? { image: imgUnita } : {}) },
          { title: 'Agricultura\nde Precisão', shortDescription: 'Mapeamento detalhado e aplicações localizadas em taxa variável para economizar recursos.', slug: 'agricultura-de-precisao', ...(bgAgriPrecisao ? { bgImage: bgAgriPrecisao } : {}), ...(imgAgriPrecisao ? { image: imgAgriPrecisao } : {}) },
          { title: 'Gestão\nde Compras', shortDescription: 'Inteligência de mercado e negociação estratégica para a aquisição de insumos agrícolas.', slug: 'gestao-de-compras', ...(bgGestao ? { bgImage: bgGestao } : {}), ...(imgGestao ? { image: imgGestao } : {}) },
          { title: 'Pesquisa\nAgronômica', shortDescription: 'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente para validar soluções.', slug: 'pesquisa-agronomica' },
        ],
        ecosystemBadge: 'ECOSSISTEMA',
        ecosystemTitle: 'A força do nosso',
        ecosystemSubtitle: 'Ecossistema integrado',
        ecosystemDescription: 'Nosso ecossistema combina soluções sob medida para as necessidades do produtor. Integramos o conhecimento de campo e a infraestrutura das nossas empresas parceiras para oferecer suporte total nas principais etapas do seu ciclo produtivo.',
        ecosystemCards,
      },
    })
    await payloadInstance.updateGlobal({
      slug: 'services-page', locale: 'en', draft: false,
      data: {
        servicesBadge: 'Our Solutions',
        servicesTitle: 'Integrated',
        servicesSubtitle: 'Solution Framework',
        servicesDescription: 'We provide high-level technical agronomic support, blending precision agriculture, procurement planning, and real-time analytics to optimize your results every harvest.',
        servicesCards: [
          { title: 'Agronomic\nConsulting', shortDescription: 'Monitoring from planning to harvest to maximize your profitability.', slug: 'consultoria-agronomica' },
          { title: 'Unitá', shortDescription: 'Intelligent platform connecting field data for rapid decision making.', slug: 'unita' },
          { title: 'Precision\nAgriculture', shortDescription: 'Detailed mapping and localized variable rate applications to save resources.', slug: 'agricultura-de-precisao' },
          { title: 'Purchase\nManagement', shortDescription: 'Market intelligence and strategic negotiation for agricultural input acquisition.', slug: 'gestao-de-compras' },
          { title: 'Agronomic\nResearch', shortDescription: 'Agronomic research is one of Grupo PA\'s main pillars. We constantly invest to validate solutions.', slug: 'pesquisa-agronomica' },
        ],
        ecosystemBadge: 'ECOSYSTEM',
        ecosystemTitle: 'The strength of our',
        ecosystemSubtitle: 'Integrated Ecosystem',
        ecosystemDescription: 'Our ecosystem combines tailor-made solutions for the grower\'s needs. We integrate field knowledge and the infrastructure of our partner companies to provide total support in the main stages of your production cycle.',
        ecosystemCards: [
          { title: 'ALD Bioenergy', link: '/aldbioenergia', ...(aldBioenergia ? { image: aldBioenergia } : {}) },
          { title: 'Farmland', link: '/lavoura', ...(lavoura ? { image: lavoura } : {}) },
          { title: 'Research Center', link: '/centropesquisa', ...(centroPesquisa ? { image: centroPesquisa } : {}) },
          { title: 'Lectures and Events', link: '/palestras', ...(eventos ? { image: eventos } : {}) },
        ],
      },
    })
    console.log('✓ ServicesPage atualizada (PT & EN)')
  } catch (e: any) {
    console.log('✗ Erro ao atualizar ServicesPage:', e?.message)
  }

  // ── 6. CareersPage com imagem ─────────────────────────────────────────────
  console.log('\n💼 Atualizando CareersPage...')
  try {
    const careersData: any = {
      title: 'Faça parte ',
      titleHighlight: 'da PA',
      introText: 'No Grupo PA, entendemos que as melhores oportunidades não são necessariamente as mais fáceis, mas aquelas que desafiam, desenvolvem e permitem crescimento profissional e pessoal.\n\nBuscamos pessoas comprometidas, curiosas e dispostas a evoluir todos os dias. Pessoas que valorizam o trabalho em equipe, assumem responsabilidades e enxergam os desafios como oportunidades de aprendizado.\n\nSeja na consultoria, na pesquisa, na produção agrícola ou nos demais negócios do Grupo PA, trabalhamos para construir uma equipe forte, preparada e apaixonada pelo que faz.',
    }
    if (bgCarreiras) (careersData as any).bgImage = bgCarreiras

    await payloadInstance.updateGlobal({ slug: 'careers-page', locale: 'pt', draft: false, data: careersData })
    await payloadInstance.updateGlobal({
      slug: 'careers-page', locale: 'en', draft: false,
      data: {
        title: 'Be part ',
        titleHighlight: 'of PA',
        introText: 'At Grupo PA, we understand that the best opportunities aren\'t necessarily the easiest, but those that challenge, develop, and enable professional and personal growth.\n\nWe look for committed, curious people who are willing to evolve every day. People who value teamwork, take on responsibilities, and see challenges as learning opportunities.\n\nWhether in consulting, research, agricultural production, or other Grupo PA businesses, we work to build a strong team that is prepared and passionate about what they do.',
      },
    })
    console.log('✓ CareersPage atualizada (PT & EN)')
  } catch (e: any) {
    console.log('✗ Erro ao atualizar CareersPage:', e?.message)
  }

  // ── 7. ContactSettings com imagem ─────────────────────────────────────────
  console.log('\n📞 Atualizando ContactSettings...')
  try {
    const contactData: any = {
      formTitle: 'Fale conosco',
      formDescription: 'Nosso time está à disposição para esclarecer dúvidas, apresentar nossos serviços e ajudar você a encontrar as melhores soluções para sua realidade. Entre em contato conosco. Será um prazer conversar com você.',
      mainEmail: 'contato@agropa.com.br',
      phone: '(65) 3016-1203',
      whatsapp: '',
      addresses: [
        { title: 'Grupo PA - Matriz', address: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra-MT - 78306-157', phone: '(65) 3016-1203', email: 'contato@agropa.com.br' },
        { title: 'Faz. São Paulo', address: 'Rod. BR-364 , KM 724 + 15Km à direita - Zona Rural, Diamantino-MT - 78.304-000', phone: '(65) 3325-3129', email: 'administrativoagricola@agropa.com.br' },
        { title: 'Sinop', address: 'Galeria Trivium – Sala 01, Rua das Andirobas, 223, Setor Comercial, CEP: 78550-000' },
      ],
    }
    if (bgContato) (contactData as any).bgImage = bgContato

    await payloadInstance.updateGlobal({ slug: 'contact-settings', locale: 'pt', draft: false, data: contactData })
    await payloadInstance.updateGlobal({
      slug: 'contact-settings', locale: 'en', draft: false,
      data: {
        formTitle: 'Contact us',
        formDescription: 'Our team is available to answer questions, present our services, and help you find the best solutions for your reality. Get in touch with us. It will be a pleasure to talk to you.',
        mainEmail: 'contato@agropa.com.br',
        phone: '(65) 3016-1203',
        whatsapp: '',
        addresses: [
          { title: 'Grupo PA - Headquarters', address: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra-MT - 78306-157', phone: '(65) 3016-1203', email: 'contato@agropa.com.br' },
          { title: 'São Paulo Farm', address: 'BR-364 Highway, KM 724 + 15Km right - Rural Area, Diamantino-MT - 78.304-000', phone: '(65) 3325-3129', email: 'administrativoagricola@agropa.com.br' },
          { title: 'Sinop branch', address: 'Trivium Gallery – Room 01, Rua das Andirobas, 223, Commercial Sector, CEP: 78550-000' },
        ],
      },
    })
    console.log('✓ ContactSettings atualizada (PT & EN)')
  } catch (e: any) {
    console.log('✗ Erro ao atualizar ContactSettings:', e?.message)
  }

  // ── 8. FooterSettings ─────────────────────────────────────────────────────
  console.log('\n🦶 Atualizando FooterSettings...')
  try {
    const footerLogos: any[] = []
    if (basf) footerLogos.push({ logo: basf })
    if (bayer) footerLogos.push({ logo: bayer })
    if (syngenta) footerLogos.push({ logo: syngenta })
    if (corteva) footerLogos.push({ logo: corteva })

    await payloadInstance.updateGlobal({
      slug: 'footer-settings', locale: 'pt', draft: false,
      data: {
        addresses: [
          { label: 'Matriz Tangará', text: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra - MT, 78306-157', mapsUrl: 'https://www.google.com/maps/place/-14.6335131,-57.5054472' },
          { label: 'Filial Diamantino', text: 'Rod. BR-364, KM 724 + 15Km à direita - Zona Rural, Diamantino - MT, 78304-000', mapsUrl: 'https://www.google.com/maps/place/-14.053104768419136,-57.302202616270456' },
        ],
      },
    })
    await payloadInstance.updateGlobal({
      slug: 'footer-settings', locale: 'en', draft: false,
      data: {
        addresses: [
          { label: 'Headquarters Tangará', text: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra - MT, 78306-157', mapsUrl: 'https://www.google.com/maps/place/-14.6335131,-57.5054472' },
          { label: 'Branch Diamantino', text: 'BR-364 Highway, KM 724 + 15Km right - Rural Area, Diamantino - MT, 78304-000', mapsUrl: 'https://www.google.com/maps/place/-14.053104768419136,-57.302202616270456' },
        ],
      },
    })
    console.log('✓ FooterSettings atualizada (PT & EN)')
  } catch (e: any) {
    console.log('✗ Erro ao atualizar FooterSettings:', e?.message)
  }

  console.log('\n✅ Seed COMPLETO finalizado com sucesso!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Erro no seed:', err)
  process.exit(1)
})
