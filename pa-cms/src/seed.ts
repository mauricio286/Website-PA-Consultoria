import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const { getPayload } = await import('payload')
const { default: config } = await import('./payload.config.js')

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
          children: [
            {
              type: 'text',
              text: text,
              version: 1
            }
          ]
        }
      ]
    }
  }
}

async function seed() {
  const payloadInstance = await getPayload({ config })
  console.log('🌱 Iniciando seed dos dados multilíngues (Português & Inglês)...')

  // ── 1. Coleção de Serviços ───────────────────────────────────────────────
  const servicesData = [
    {
      slug: 'consultoria-agronomica',
      title: { pt: 'Consultoria Agronômica', en: 'Agronomic Consulting' },
      shortDescription: {
        pt: 'Gestão técnica completa para maximizar a produtividade.',
        en: 'Complete technical management to maximize productivity.'
      },
      order: 1
    },
    {
      slug: 'unita',
      title: { pt: 'Unitá', en: 'Unitá' },
      shortDescription: {
        pt: 'Plataforma integrada de dados.',
        en: 'Integrated data platform.'
      },
      order: 2
    },
    {
      slug: 'agricultura-de-precisao',
      title: { pt: 'Agricultura de Precisão', en: 'Precision Agriculture' },
      shortDescription: {
        pt: 'Tecnologia avançada para aplicação em taxa variável.',
        en: 'Advanced technology for variable rate application.'
      },
      order: 3
    },
    {
      slug: 'gestao-de-compras',
      title: { pt: 'Gestão de Compras', en: 'Purchase Management' },
      shortDescription: {
        pt: 'Assessoria estratégica na aquisição de insumos.',
        en: 'Strategic advice on input acquisition.'
      },
      order: 4
    }
  ]

  for (const svc of servicesData) {
    try {
      const existing = await payloadInstance.find({
        collection: 'services',
        locale: 'pt',
        where: {
          slug: { equals: svc.slug }
        }
      })

      let docId: string | number
      if (existing.docs.length > 0) {
        docId = existing.docs[0].id
        await payloadInstance.update({
          collection: 'services',
          id: docId,
          locale: 'pt',
          draft: true,
          data: {
            title: svc.title.pt,
            slug: svc.slug,
            shortDescription: svc.shortDescription.pt,
            order: svc.order,
            published: true
          }
        })
      } else {
        const created = await payloadInstance.create({
          collection: 'services',
          locale: 'pt',
          draft: true,
          data: {
            title: svc.title.pt,
            slug: svc.slug,
            shortDescription: svc.shortDescription.pt,
            order: svc.order,
            published: true
          }
        })
        docId = created.id
      }

      // Atualiza o locale em inglês
      await payloadInstance.update({
        collection: 'services',
        id: docId,
        locale: 'en',
        draft: true,
        data: {
          title: svc.title.en,
          slug: svc.slug,
          shortDescription: svc.shortDescription.en
        }
      })
    } catch (e) {
      console.log('Erro ao processar serviço:', svc.title.pt, e)
    }
  }
  console.log('✓ Coleção "services" populada')

  // ── 2. Coleção de Localizações no Mapa (não localizada) ───────────────────
  const mapLocationsData = [
    { name: "Arenápolis - MT", area: 3153.11, top: 565, left: 528 },
    { name: "Barra do Bugres - MT", area: 550, top: 585, left: 525 },
    { name: "Brasnorte - MT", area: 7667.74, top: 490, left: 475 },
    { name: "Campo Novo do Parecis - MT", area: 43235.51, top: 535, left: 505 },
    { name: "Cláudia - MT", area: 3329, top: 450, left: 590 },
    { name: "Comodoro - MT", area: 12755, top: 537, left: 415 },
    { name: "Diamantino - MT", area: 51300.05, top: 550, left: 550 },
    { name: "Ipiranga do Norte - MT", area: 5206.60, top: 485, left: 570 },
    { name: "Juara - MT", area: 3275, top: 455, left: 505 },
    { name: "Marcelândia - MT", area: 3519.79, top: 440, left: 605 },
    { name: "Nortelândia - MT", area: 491.57, top: 565, left: 520 },
    { name: "Nova Marilândia - MT", area: 755.54, top: 562, left: 520 },
    { name: "Nova Maringá - MT", area: 26184.70, top: 500, left: 495 },
    { name: "Nova Mutum - MT", area: 4420.70, top: 535, left: 570 },
    { name: "Nova Olímpia - MT", area: 3006.70, top: 578, left: 515 },
    { name: "Novo Progresso - PA", area: 555.70, top: 265, left: 465 },
    { name: "Porto dos Gaúchos - MT", area: 1420, top: 465, left: 515 },
    { name: "Salto do Céu - MT", area: 2018.55, top: 615, left: 475 },
    { name: "Santa Rita do Trivelato - MT", area: 1400.31, top: 535, left: 590 },
    { name: "Santo Afonso - MT", area: 6049.70, top: 560, left: 515 },
    { name: "São José do Rio Claro - MT", area: 7107.81, top: 520, left: 540 },
    { name: "Sapezal - MT", area: 3509.80, top: 520, left: 450 },
    { name: "Sinop - MT", area: 4284.67, top: 455, left: 570 },
    { name: "Tabaporã - MT", area: 7260.70, top: 440, left: 540 },
    { name: "Tangará da Serra - MT", area: 21289.57, top: 565, left: 515 },
    { name: "União do Sul - MT", area: 2059.13, top: 440, left: 595 }
  ]

  for (const loc of mapLocationsData) {
    try {
      const existing = await payloadInstance.find({
        collection: 'map-locations',
        where: {
          title: { equals: loc.name }
        }
      })
      if (existing.docs.length === 0) {
        await payloadInstance.create({
          collection: 'map-locations',
          draft: true,
          data: {
            title: loc.name,
            city: loc.name.split(' - ')[0],
            state: loc.name.split(' - ')[1] || 'MT',
            area: loc.area.toString(),
            positionX: loc.left,
            positionY: loc.top,
            published: true
          }
        })
      }
    } catch (e) {
      console.log('Erro ao processar localização:', loc.name, e)
    }
  }
  console.log('✓ Coleção "map-locations" populada')

  // ── 3. Global: HomePage ──────────────────────────────────────────────────
  try {
    // Seed em Português
    await payloadInstance.updateGlobal({
      slug: 'home-page',
      locale: 'pt',
      draft: true,
      data: {
        heroTitle: 'Resultados\nque o campo\ncomprova!',
        heroSubtitle: 'Consultoria agronômica especializada para produtores que buscam excelência, rentabilidade e segurança em cada hectare plantado.',
        heroCtaLabel: 'Nossas soluções',
        heroCtaUrl: '/servicos',
        
        introTitle: 'Introdução',
        introText: makeRichText('No campo, resultado não acontece por acaso. Ele nasce de experiência, estratégia e decisões bem tomadas. Há mais de 20 anos, o Grupo PA caminha ao lado do produtor rural, unindo consultoria técnica, agricultura de precisão e gestão para transformar conhecimento em produtividade.'),
        introCtaLabel: 'Ver mais',
        introCtaUrl: '/quem-somos',

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
          {
            title: 'Estratégia',
            description: 'Decisões orientadas por pesquisa, objetivos e visão de longo prazo, transformando informações agronômicas em ações práticas que maximizam a produtividade, a rentabilidade e a sustentabilidade dos sistemas produtivos.'
          },
          {
            title: 'Execução',
            description: 'Decisões embasadas em dados, clima e mercado para mitigar riscos antes mesmo do plantio.'
          },
          {
            title: 'Tecnologia',
            description: 'Uso das melhores ferramentas de agricultura digital para otimizar recursos e monitorar a saúde da sua safra em tempo real.'
          }
        ],

        mapTag: 'Atuação',
        mapTitle: 'Onde estamos',
        mapDescription: 'Estamos presentes em mais de 30 municípios, atuando nas culturas de soja, milho, entre outras, com mapeamento preciso para aumentar sua produtividade.',

        galleryTitle: 'parceria',
        gallerySubtitle: 'Nós estamos em movimento constante para levar o melhor da pesquisa e inovação até o produtor.',

        testimonialsTag: 'depoimentos',
        testimonialsTitle: 'Parcerias que comprovam',
        testimonialsTitleAccent: 'resultados'
      }
    })

    // Seed em Inglês
    await payloadInstance.updateGlobal({
      slug: 'home-page',
      locale: 'en',
      draft: true,
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
          {
            title: 'Strategy',
            description: 'Research-driven decisions, long-term vision, and objectives that turn agronomic insights into practical actions maximizing productivity, profitability, and sustainability across production systems.'
          },
          {
            title: 'Execution',
            description: 'Data-driven decisions based on climate and market conditions to mitigate risks even before planting.'
          },
          {
            title: 'Technology',
            description: 'Using the best digital agriculture tools to optimize resources and monitor your crop health in real time.'
          }
        ],

        mapTag: 'Coverage',
        mapTitle: 'Where we are',
        mapDescription: 'We are present in over 30 municipalities, working with soy, corn, and other crops, with precise mapping to boost your productivity.',

        galleryTitle: 'partnership',
        gallerySubtitle: 'We are in constant motion to bring the best of research and innovation to the farmer.',

        testimonialsTag: 'testimonials',
        testimonialsTitle: 'Partnerships that prove',
        testimonialsTitleAccent: 'results'
      }
    })
    console.log('✓ Global "home-page" populado (PT & EN)')
  } catch (e) {
    console.log('Erro ao atualizar HomePage global:', e)
  }

  // ── 4. Global: AboutPage (Quem Somos) ────────────────────────────────────
  try {
    // Seed em Português
    await payloadInstance.updateGlobal({
      slug: 'about-page',
      locale: 'pt',
      draft: true,
      data: {
        introTag: 'quem somos',
        title: 'Nossa gente',
        subtitle: 'faz a diferença',
        introText: makeRichText('Sediado em Tangará da Serra (MT), o Grupo PA une consultoria agronômica especializada e atendimento próximo para impulsionar a produtividade do produtor. Com um campo experimental próprio, transformamos pesquisas e estudos práticos em dados reais para eliminar o achismo e otimizar os resultados da sua safra.\n\nSimplificamos sua rotina cuidando de toda a gestão de compras de insumos, negociando os melhores preços, prazos e fornecedores do mercado. Pioneiros em agricultura de precisão, usamos GPS e sensoriamento remoto para coletar dados exatos e maximizar o desempenho de cada hectare. Somos a parceria sólida e lucrativa que você busca para o campo. Conte com o Grupo PA para elevar o patamar da sua produção.'),
        
        commitment: {
          title: 'Nosso compromisso',
          text: makeRichText('Contribuímos com o desenvolvimento do agronegócio, entregando aos nossos clientes as melhores soluções em produtividade, com excelência na prestação de serviços, tecnologia, pesquisa e respeito às pessoas e ao meio ambiente.')
        },
        vision: {
          title: 'Onde queremos chegar',
          text: makeRichText('Buscamos ser referência em consultoria agronômica, pesquisa e agricultura de precisão, levando inovação, resultado e confiança para o produtor rural em cada safra.')
        },
        values: {
          title: 'Os valores que nos movem',
          text: makeRichText('Acreditamos que grandes resultados começam com relações sólidas. Por isso, conduzimos nosso trabalho com honestidade, ética e transparência, valorizando as pessoas, respeitando cada parceria e mantendo a paixão pelo que fazemos em cada desafio do campo.')
        },

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
          { tag: 'investimento', year: '2026', text: makeRichText('O Grupo PA segue investindo no agro e no Mato Grosso. Como acionistas da ALD Bioenergia, realizamos novos investimentos para a triplicação da planta.') }
        ]
      }
    })

    // Seed em Inglês
    await payloadInstance.updateGlobal({
      slug: 'about-page',
      locale: 'en',
      draft: true,
      data: {
        introTag: 'about us',
        title: 'Our people',
        subtitle: 'make the difference',
        introText: makeRichText('Based in Tangará da Serra (MT), Grupo PA combines specialized agronomic consulting and close support to boost producer productivity. With our own experimental field, we transform research and practical studies into real data to eliminate guesswork and optimize your harvest results.\n\nWe simplify your routine by handling all input procurement management, negotiating the best prices, terms, and suppliers on the market. Pioneers in precision agriculture, we use GPS and remote sensing to collect precise data and maximize the performance of every hectare. We are the solid and profitable partnership you seek for the field. Count on Grupo PA to elevate your production standards.'),
        
        commitment: {
          title: 'Our commitment',
          text: makeRichText('We contribute to the development of agribusiness, delivering to our clients the best productivity solutions, with excellence in services, technology, research, and respect for people and the environment.')
        },
        vision: {
          title: 'Where we want to go',
          text: makeRichText('We aim to be a reference in agronomic consulting, research, and precision agriculture, bringing innovation, results, and trust to farmers in every season.')
        },
        values: {
          title: 'The values that drive us',
          text: makeRichText('We believe that great results start with strong relationships. That is why we conduct our work with honesty, ethics, and transparency, valuing people, respecting every partnership, and maintaining our passion for what we do in every field challenge.')
        },

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
          { tag: 'investment', year: '2026', text: makeRichText('Grupo PA continues to invest in agriculture and in Mato Grosso. As shareholders of ALD Bioenergy, we made new investments to triple the plant.') }
        ]
      }
    })
    console.log('✓ Global "about-page" populado (PT & EN)')
  } catch (e) {
    console.log('Erro ao atualizar AboutPage global:', e)
  }

  // ── 5. Global: ServicesPage (Ecossistema Geral) ──────────────────────────
  try {
    // Seed em Português
    await payloadInstance.updateGlobal({
      slug: 'services-page',
      locale: 'pt',
      draft: true,
      data: {
        servicesBadge: 'Nossas Soluções',
        servicesTitle: 'Estrutura de',
        servicesSubtitle: 'Soluções Integradas',
        servicesDescription: 'Oferecemos suporte técnico agronômico de alto nível, unindo agricultura de precisão, planejamento de compras e análises em tempo real para otimizar seus resultados em cada safra.',
        servicesCards: [
          { title: 'Consultoria\nAgronômica', shortDescription: 'Acompanhamento do planejamento à colheita para maximizar sua lucratividade.', slug: 'consultoria-agronomica' },
          { title: 'Unitá', shortDescription: 'Plataforma inteligente que conecta dados do campo para tomadas de decisão rápidas.', slug: 'unita' },
          { title: 'Agricultura\nde Precisão', shortDescription: 'Mapeamento detalhado e aplicações localizadas em taxa variável para economizar recursos.', slug: 'agricultura-de-precisao' },
          { title: 'Gestão\nde Compras', shortDescription: 'Inteligência de mercado e negociação estratégica para a aquisição de insumos agrícolas.', slug: 'gestao-de-compras' },
          { title: 'Pesquisa\nAgronômica', shortDescription: 'A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente para validar soluções.', slug: 'pesquisa-agronomica' }
        ],
        ecosystemBadge: 'ECOSSISTEMA',
        ecosystemTitle: 'A força do nosso',
        ecosystemSubtitle: 'Ecossistema integrado',
        ecosystemDescription: 'Nosso ecossistema combina soluções sob medida para as necessidades do produtor. Integramos o conhecimento de campo e a infraestrutura das nossas empresas parceiras para oferecer suporte total nas principais etapas do seu ciclo produtivo.',
        ecosystemCards: [
          { title: 'ALD Bioenergia', link: '/aldbioenergia' },
          { title: 'Lavoura', link: '/lavoura' },
          { title: 'Centro de Pesquisa', link: '/centropesquisa' },
          { title: 'Palestras e Eventos', link: '/palestras' }
        ]
      }
    })

    // Seed em Inglês
    await payloadInstance.updateGlobal({
      slug: 'services-page',
      locale: 'en',
      draft: true,
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
          { title: 'Agronomic\nResearch', shortDescription: 'Agronomic research is one of Grupo PA\'s main pillars. We constantly invest to validate solutions.', slug: 'pesquisa-agronomica' }
        ],
        ecosystemBadge: 'ECOSYSTEM',
        ecosystemTitle: 'The strength of our',
        ecosystemSubtitle: 'Integrated Ecosystem',
        ecosystemDescription: 'Our ecosystem combines tailor-made solutions for the grower\'s needs. We integrate field knowledge and the infrastructure of our partner companies to provide total support in the main stages of your production cycle.',
        ecosystemCards: [
          { title: 'ALD Bioenergy', link: '/aldbioenergia' },
          { title: 'Farmland', link: '/lavoura' },
          { title: 'Research Center', link: '/centropesquisa' },
          { title: 'Lectures and Events', link: '/palestras' }
        ]
      }
    })
    console.log('✓ Global "services-page" populado (PT & EN)')
  } catch (e) {
    console.log('Erro ao atualizar ServicesPage global:', e)
  }

  // ── 6. Global: CareersPage (Carreiras) ───────────────────────────────────
  try {
    // Seed em Português
    await payloadInstance.updateGlobal({
      slug: 'careers-page',
      locale: 'pt',
      draft: true,
      data: {
        title: 'Faça parte ',
        titleHighlight: 'da PA',
        introText: 'No Grupo PA, entendemos que as melhores oportunidades não são necessariamente as mais fáceis, mas aquelas que desafiam, desenvolvem e permitem crescimento profissional e pessoal.\n\nBuscamos pessoas comprometidas, curiosas e dispostas a evoluir todos os dias. Pessoas que valorizam o trabalho em equipe, assumem responsabilidades e enxergam os desafios como oportunidades de aprendizado.\n\nSeja na consultoria, na pesquisa, na produção agrícola ou nos demais negócios do Grupo PA, trabalhamos para construir uma equipe forte, preparada e apaixonada pelo que faz.'
      }
    })

    // Seed em Inglês
    await payloadInstance.updateGlobal({
      slug: 'careers-page',
      locale: 'en',
      draft: true,
      data: {
        title: 'Be part ',
        titleHighlight: 'of PA',
        introText: 'At Grupo PA, we understand that the best opportunities aren\'t necessarily the easiest, but those that challenge, develop, and enable professional and personal growth.\n\nWe look for committed, curious people who are willing to evolve every day. People who value teamwork, take on responsibilities, and see challenges as learning opportunities.\n\nWhether in consulting, research, agricultural production, or other Grupo PA businesses, we work to build a strong team that is prepared and passionate about what they do.'
      }
    })
    console.log('✓ Global "careers-page" populado (PT & EN)')
  } catch (e) {
    console.log('Erro ao atualizar CareersPage global:', e)
  }

  // ── 7. Global: ContactSettings ───────────────────────────────────────────
  try {
    // Seed em Português
    await payloadInstance.updateGlobal({
      slug: 'contact-settings',
      locale: 'pt',
      draft: true,
      data: {
        formTitle: 'Fale conosco',
        formDescription: 'Nosso time está à disposição para esclarecer dúvidas, apresentar nossos serviços e ajudar você a encontrar as melhores solutions para sua realidade. Entre em contato conosco. Será um prazer conversar com você.',
        mainEmail: 'contato@agropa.com.br',
        phone: '(65) 3016-1203',
        whatsapp: '',
        addresses: [
          {
            title: 'Grupo PA - Matriz',
            address: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra-MT - 78306-157',
            phone: '(65) 3016-1203',
            email: 'contato@agropa.com.br'
          },
          {
            title: 'Faz. São Paulo',
            address: 'Rod. BR-364 , KM 724 + 15Km à direita - Zona Rural, Diamantino-MT - 78.304-000',
            phone: '(65) 3325-3129',
            email: 'administrativoagricola@agropa.com.br'
          },
          {
            title: 'Sinop',
            address: 'Galeria Trivium – Sala 01, Rua das Andirobas, 223, Setor Comercial, CEP: 78550-000'
          }
        ]
      }
    })

    // Seed em Inglês
    await payloadInstance.updateGlobal({
      slug: 'contact-settings',
      locale: 'en',
      draft: true,
      data: {
        formTitle: 'Contact us',
        formDescription: 'Our team is available to answer questions, present our services, and help you find the best solutions for your reality. Get in touch with us. It will be a pleasure to talk to you.',
        mainEmail: 'contato@agropa.com.br',
        phone: '(65) 3016-1203',
        whatsapp: '',
        addresses: [
          {
            title: 'Grupo PA - Headquarters',
            address: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra-MT - 78306-157',
            phone: '(65) 3016-1203',
            email: 'contato@agropa.com.br'
          },
          {
            title: 'São Paulo Farm',
            address: 'BR-364 Highway, KM 724 + 15Km right - Rural Area, Diamantino-MT - 78.304-000',
            phone: '(65) 3325-3129',
            email: 'administrativoagricola@agropa.com.br'
          },
          {
            title: 'Sinop branch',
            address: 'Trivium Gallery – Room 01, Rua das Andirobas, 223, Commercial Sector, CEP: 78550-000'
          }
        ]
      }
    })
    console.log('✓ Global "contact-settings" populado (PT & EN)')
  } catch (e) {
    console.log('Erro ao atualizar ContactSettings global:', e)
  }

  // ── 8. Global: FooterSettings ────────────────────────────────────────────
  try {
    // Seed em Português
    await payloadInstance.updateGlobal({
      slug: 'footer-settings',
      locale: 'pt',
      draft: true,
      data: {
        addresses: [
          {
            label: 'Matriz Tangará',
            text: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra - MT, 78306-157',
            mapsUrl: 'https://www.google.com/maps/place/-14.6335131,-57.5054472'
          },
          {
            label: 'Filial Diamantino',
            text: 'Rod. BR-364, KM 724 + 15Km à direita - Zona Rural, Diamantino - MT, 78304-000',
            mapsUrl: 'https://www.google.com/maps/place/-14.053104768419136,-57.302202616270456'
          }
        ]
      }
    })

    // Seed em Inglês
    await payloadInstance.updateGlobal({
      slug: 'footer-settings',
      locale: 'en',
      draft: true,
      data: {
        addresses: [
          {
            label: 'Headquarters Tangará',
            text: 'Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra - MT, 78306-157',
            mapsUrl: 'https://www.google.com/maps/place/-14.6335131,-57.5054472'
          },
          {
            label: 'Branch Diamantino',
            text: 'BR-364 Highway, KM 724 + 15Km right - Rural Area, Diamantino - MT, 78304-000',
            mapsUrl: 'https://www.google.com/maps/place/-14.053104768419136,-57.302202616270456'
          }
        ]
      }
    })
    console.log('✓ Global "footer-settings" populado (PT & EN)')
  } catch (e) {
    console.log('Erro ao atualizar FooterSettings global:', e)
  }

  console.log('\n✅ Seed finalizado com sucesso em todos os idiomas!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Erro no seed:', err)
  process.exit(1)
})
