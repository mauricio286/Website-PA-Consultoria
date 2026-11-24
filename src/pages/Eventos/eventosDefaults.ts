// Conteúdo padrão da página de Eventos (idêntico ao modelo). Usado enquanto um campo não vem do CMS.
// Mantido em sincronia com o seed da migration 20261123_100000_events_page_v2.

export type EventsDefaults = {
  [key: string]: any
}

export const EVENTS_DEFAULTS: Record<'pt' | 'en', EventsDefaults> = {
  "pt": {
    "heroBadge": "Próximo evento",
    "heroTitleLine1": "PA Summit",
    "heroTitleLine2": "2027",
    "heroSubtitle": "Produtividade em outra dimensão.",
    "heroDateLocation": "06 de fevereiro de 2027 · Estação Experimental PA, Diamantino - MT",
    "heroCtaLabel": "Garantir ingresso",
    "highlightsTag": "O evento",
    "highlightsTitle1": "Onde a pesquisa encontra",
    "highlightsTitleAccent": "quem decide a safra.",
    "highlightsDescription": "O principal encontro técnico do Grupo PA reúne produtores rurais, pesquisadores, consultores e empresas do setor para transformar dados validados no campo em decisões seguras para a próxima temporada.",
    "aboutTitle1": "Sobre o",
    "aboutTitleAccent": "PA Summit",
    "aboutP1": "Mais do que um dia de campo tradicional, o PA Summit é o ponto de encontro de todo o conhecimento construído nos mais de 60 hectares e 2.000 tratamentos conduzidos na estação experimental do Grupo PA, em Diamantino-MT.",
    "aboutP2": "Durante a jornada, produtores rurais, gestores agrícolas e equipes técnicas percorrem parcelas demonstrativas, analisam comparativos práticos de cultivares, proteção de cultivos, fertilidade do solo e tecnologia de aplicação — sempre em condições reais de lavoura.",
    "partnersTag": "Quem estará lá",
    "partnersTitle1": "Empresas",
    "partnersTitleAccent": "confirmadas",
    "experienceTag": "A experiência",
    "experienceTitle1": "Como o dia",
    "experienceTitleAccent": "acontece",
    "experienceStepLabel": "Etapa",
    "ticketsBadge": "Lote promocional aberto",
    "ticketsTitle": "Garanta seu lugar",
    "ticketsDescription": "Vagas limitadas por circuito técnico · Ingresso inclui credenciamento completo, acesso às estações, kit do participante e almoço oficial.",
    "ticketsCtaLabel": "Compre aqui agora",
    "ticketsNote": "Redireciona para a página do evento na Sympla",
    "pastTag": "Edições anteriores",
    "pastTitle1": "Veja nossos",
    "pastTitleAccent": "eventos anteriores",
    "pastViewLabel": "Ver mais",
    "pastCloseLabel": "Fechar",
    "pastPhotoLabel": "Foto",
    "highlightsStats": [
      {
        "value": "14ª",
        "label": "Edição do Dia de Campo"
      },
      {
        "value": "06.02",
        "label": "Fevereiro de 2027"
      },
      {
        "value": "+1.500",
        "label": "Participantes esperados"
      },
      {
        "value": "+40",
        "label": "Estações e marcas parceiras"
      }
    ],
    "infoItems": [
      {
        "key": "Data",
        "value": "06 de fevereiro de 2027"
      },
      {
        "key": "Horário",
        "value": "07h00 às 17h00"
      },
      {
        "key": "Local",
        "value": "Estação Experimental PA · Diamantino - MT"
      },
      {
        "key": "Público",
        "value": "Produtores rurais, consultores e parceiros"
      }
    ],
    "universes": [
      {
        "tag": "Universo 01",
        "crop": "Soja",
        "focus": "Posicionamento de cultivares, manejo de doenças, nematoides e construção de altas produtividades."
      },
      {
        "tag": "Universo 02",
        "crop": "Milho",
        "focus": "Híbridos para segunda safra, proteção fitossanitária, manejo de pragas e eficiência nutricional."
      },
      {
        "tag": "Universo 03",
        "crop": "Algodão",
        "focus": "Qualidade de fibra, fisiologia vegetal, reguladores de crescimento e manejo integrado no cerrado."
      }
    ],
    "experienceSteps": [
      {
        "time": "07h00",
        "title": "Credenciamento e recepção no campo",
        "description": "Chegada na Estação Experimental, retirada de credenciais e kits do participante acompanhada de café da manhã regional.",
        "caption": "Recepção dos produtores e formação dos grupos técnicos"
      },
      {
        "time": "08h00",
        "title": "Abertura oficial Grupo PA",
        "description": "Panorama estratégico da safra, leitura climática e direcionamentos técnicos da liderança da consultoria.",
        "caption": "Abertura institucional e cenário agronômico da temporada"
      },
      {
        "time": "09h00",
        "title": "Circuitos Soja, Milho e Algodão",
        "description": "Giro guiado pelas estações experimentais com pesquisadores do Grupo PA e especialistas das empresas parceiras.",
        "caption": "Mais de 2.000 tratamentos avaliados em condições reais de cultivo"
      },
      {
        "time": "13h00",
        "title": "Encerramento, almoço e networking",
        "description": "Palestra convidada, almoço oficial de confraternização e troca direta de experiências entre produtores e lideranças do agro.",
        "caption": "Conexão e troca de experiências entre quem constrói o agro"
      }
    ],
    "pastEvents": [
      {
        "name": "PA Summit 2026",
        "date": "Fev 2026",
        "people": "+1.350 participantes",
        "desc": "13ª edição com mais de 2.000 tratamentos em campo destacando posicionamento de cultivares e rentabilidade por hectare."
      },
      {
        "name": "PA Summit 2025",
        "date": "Fev 2025",
        "people": "+1.150 participantes",
        "desc": "12ª edição voltada à proteção de cultivos, construção de perfil de solo e integração com agricultura de precisão."
      },
      {
        "name": "PA Summit 2024",
        "date": "Fev 2024",
        "people": "+980 participantes",
        "desc": "11ª edição dedicada à estabilidade produtiva frente aos desafios climáticos na sucessão soja, milho e algodão."
      },
      {
        "name": "Dia de Campo PA 2023",
        "date": "Fev 2023",
        "people": "+850 participantes",
        "desc": "10ª edição celebrando uma década de validação científica e compartilhamento de dados na estação experimental."
      }
    ]
  },
  "en": {
    "heroBadge": "Upcoming event",
    "heroTitleLine1": "PA Summit",
    "heroTitleLine2": "2027",
    "heroSubtitle": "Productivity in another dimension.",
    "heroDateLocation": "February 6, 2027 · PA Experimental Station, Diamantino - MT",
    "heroCtaLabel": "Get your ticket",
    "highlightsTag": "The event",
    "highlightsTitle1": "Where field research meets",
    "highlightsTitleAccent": "those who shape the harvest.",
    "highlightsDescription": "Grupo PA's flagship technical gathering brings together growers, researchers, consultants, and agribusiness leaders to turn field-validated data into confident decisions for the next season.",
    "aboutTitle1": "About",
    "aboutTitleAccent": "PA Summit",
    "aboutP1": "More than a traditional field day, PA Summit brings together all knowledge built across 60+ hectares and over 2,000 treatments conducted at Grupo PA's experimental station in Diamantino-MT.",
    "aboutP2": "Throughout the journey, growers, farm managers, and technical teams walk live trial plots, evaluate cultivar comparisons, crop protection, soil fertility, and application technology under real commercial farming conditions.",
    "partnersTag": "Who will be there",
    "partnersTitle1": "Confirmed",
    "partnersTitleAccent": "companies",
    "experienceTag": "The experience",
    "experienceTitle1": "How the day",
    "experienceTitleAccent": "unfolds",
    "experienceStepLabel": "Stage",
    "ticketsBadge": "Early-bird batch open",
    "ticketsTitle": "Secure your spot",
    "ticketsDescription": "Limited spots per technical circuit · Ticket includes full accreditation, station access, participant kit, and official lunch.",
    "ticketsCtaLabel": "Buy tickets now",
    "ticketsNote": "Redirects to the official event page on Sympla",
    "pastTag": "Past editions",
    "pastTitle1": "Explore our",
    "pastTitleAccent": "past events",
    "pastViewLabel": "Learn more",
    "pastCloseLabel": "Close",
    "pastPhotoLabel": "Photo",
    "highlightsStats": [
      {
        "value": "14th",
        "label": "Field Day edition"
      },
      {
        "value": "02.06",
        "label": "February 6, 2027"
      },
      {
        "value": "+1,500",
        "label": "Expected attendees"
      },
      {
        "value": "+40",
        "label": "Stations & partner brands"
      }
    ],
    "infoItems": [
      {
        "key": "Date",
        "value": "February 6, 2027"
      },
      {
        "key": "Hours",
        "value": "7:00 AM to 5:00 PM"
      },
      {
        "key": "Location",
        "value": "PA Experimental Station · Diamantino - MT"
      },
      {
        "key": "Audience",
        "value": "Growers, consultants & industry partners"
      }
    ],
    "universes": [
      {
        "tag": "Universe 01",
        "crop": "Soybean",
        "focus": "Cultivar positioning, disease & nematode management, and high-yield ceilings."
      },
      {
        "tag": "Universe 02",
        "crop": "Corn",
        "focus": "Second-crop hybrids, crop protection, pest control, and nutritional efficiency."
      },
      {
        "tag": "Universe 03",
        "crop": "Cotton",
        "focus": "Fiber quality, plant physiology, growth regulators, and integrated cerrado management."
      }
    ],
    "experienceSteps": [
      {
        "time": "07:00",
        "title": "Check-in & farm welcome",
        "description": "Arrival at the Experimental Station, badge and official participant kit pickup, accompanied by a regional breakfast.",
        "caption": "Grower welcome and technical group organization"
      },
      {
        "time": "08:00",
        "title": "Grupo PA official opening",
        "description": "Strategic harvest outlook, climate reading, and technical guidelines from our consulting leadership.",
        "caption": "Institutional opening and agronomic outlook for the season"
      },
      {
        "time": "09:00",
        "title": "Soybean, Corn & Cotton circuits",
        "description": "Guided walk through experimental plots alongside Grupo PA researchers and partner company specialists.",
        "caption": "Over 2,000 treatments evaluated under real field conditions"
      },
      {
        "time": "13:00",
        "title": "Closing talk, lunch & networking",
        "description": "Guest keynote, celebratory lunch, and direct exchange of experiences among growers and agribusiness leaders.",
        "caption": "High-value connection among those who build agribusiness"
      }
    ],
    "pastEvents": [
      {
        "name": "PA Summit 2026",
        "date": "Feb 2026",
        "people": "+1,350 attendees",
        "desc": "13th edition featuring over 2,000 field treatments focused on cultivar positioning and profitability per hectare."
      },
      {
        "name": "PA Summit 2025",
        "date": "Feb 2025",
        "people": "+1,150 attendees",
        "desc": "12th edition dedicated to crop protection, deep soil profile building, and precision agriculture integration."
      },
      {
        "name": "PA Summit 2024",
        "date": "Feb 2024",
        "people": "+980 attendees",
        "desc": "11th edition addressing yield stability amidst climate challenges across soybean, corn, and cotton systems."
      },
      {
        "name": "PA Field Day 2023",
        "date": "Feb 2023",
        "people": "+850 attendees",
        "desc": "10th edition celebrating a decade of scientific validation and data sharing at our experimental station."
      }
    ]
  }
}
