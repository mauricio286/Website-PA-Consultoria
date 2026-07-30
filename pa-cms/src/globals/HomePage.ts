import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Configuração de todos os textos e imagens editáveis da página inicial
const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home',
  admin: {
    group: 'Páginas',
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    // ── Seção Hero ─────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '01 · Hero',
      fields: [
        {
          name: 'heroTitle',
          label: 'Título principal',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Dica: Use Enter para definir exatamente onde as linhas devem quebrar no site.',
          },
        },
        {
          name: 'heroSubtitle',
          label: 'Subtítulo',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Dica: Use Enter para definir exatamente onde as linhas devem quebrar no site.',
          },
        },
        {
          name: 'heroMediaType',
          label: 'Tipo de Mídia de Fundo',
          type: 'select',
          defaultValue: 'upload',
          options: [
            { label: 'Upload de Arquivo (Imagem, GIF ou MP4)', value: 'upload' },
            { label: 'Vídeo do Vimeo (Link incorporado)', value: 'vimeo' },
          ],
          admin: {
            description: 'Escolha se deseja enviar uma imagem/vídeo direto ou utilizar um vídeo em loop do Vimeo.',
          },
        },
        {
          name: 'heroVimeoUrl',
          label: 'Link do Vídeo no Vimeo (Hero)',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.heroMediaType === 'vimeo',
            description: 'Cole o link do vídeo do Vimeo (ex: https://vimeo.com/76979871). O vídeo rodará automaticamente em loop contínuo e sem som.',
          },
        },
        {
          name: 'heroImage',
          label: 'Imagem/Vídeo de fundo do Hero (Desktop)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.heroMediaType !== 'vimeo',
          },
        },
        {
          name: 'heroImageTablet',
          label: 'Imagem de fundo (Tablet)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.heroMediaType !== 'vimeo',
            description: 'Opcional. Exibida em tablets (telas de até 1024px). Se não informada, usa a de Desktop.',
          },
        },
        {
          name: 'heroImageMobile',
          label: 'Imagem de fundo (Mobile)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.heroMediaType !== 'vimeo',
            description: 'Opcional. Exibida em celulares (telas de até 580px). Se não informada, usa a de Desktop ou Tablet.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'heroCtaLabel',
              label: 'Botão CTA — texto',
              type: 'text',
              localized: true,
              admin: { width: '50%' },
            },
            {
              name: 'heroCtaUrl',
              label: 'Botão CTA — link',
              type: 'text',
              localized: true,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'heroLogos',
          label: 'Logos do carrossel',
          type: 'array',
          maxRows: 12,
          labels: {
            singular: 'Logo',
            plural: 'Logos',
          },
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                components: {
                  Description: '@/components/CMSDescriptionTooltip/LogoTooltip',
                },
              },
            },
            {
              name: 'alt',
              label: 'Nome da empresa (alt)',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Seção Introdução ───────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · Introdução',
      fields: [
        {
          name: 'introTitle',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
        },
        {
          name: 'introText',
          label: 'Texto principal',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({}),
        },
        {
          name: 'introMediaType',
          label: 'Tipo de Mídia (Símbolo à Direita)',
          type: 'select',
          defaultValue: 'upload',
          options: [
            { label: 'Upload de Arquivo (Imagem, GIF ou MP4)', value: 'upload' },
            { label: 'Vídeo do Vimeo (Link incorporado)', value: 'vimeo' },
          ],
          admin: {
            description: 'Escolha se deseja enviar uma imagem/vídeo direto ou utilizar um vídeo em loop do Vimeo.',
          },
        },
        {
          name: 'introVimeoUrl',
          label: 'Link do Vídeo no Vimeo (Introdução)',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.introMediaType === 'vimeo',
            description: 'Cole o link do vídeo do Vimeo (ex: https://vimeo.com/76979871). O vídeo rodará automaticamente em loop contínuo e sem som.',
          },
        },
        {
          name: 'introImage',
          label: 'Imagem/Vídeo (símbolo à direita)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.introMediaType !== 'vimeo',
          },
        },
        // ── Configurações visuais do container de vídeo ──
        {
          type: 'collapsible',
          label: '🎨 Aparência do container de vídeo',
          admin: {
            condition: (data, siblingData) => siblingData?.introMediaType === 'vimeo',
            initCollapsed: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'introVideoWidth',
                  label: 'Tamanho em relação à coluna (%)',
                  type: 'number',
                  defaultValue: 80,
                  min: 20,
                  max: 100,
                  admin: {
                    width: '50%',
                    description: 'Porcentagem da coluna ocupada pelo vídeo. Padrão: 80%.',
                  },
                },
                {
                  name: 'introVideoMaxWidth',
                  label: 'Largura máxima do vídeo (px)',
                  type: 'number',
                  defaultValue: 0,
                  min: 0,
                  max: 720,
                  admin: {
                    width: '50%',
                    description: '0 = sem limite (usa somente o % da coluna). Valores maiores permitem 16:9 mais impactante. Ex: 600 para proporção paisagem.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'introVideoAlign',
                  label: 'Alinhamento do vídeo na coluna',
                  type: 'select',
                  defaultValue: 'right',
                  options: [
                    { label: 'Direita (afastado do texto — recomendado)', value: 'right' },
                    { label: 'Centro', value: 'center' },
                    { label: 'Esquerda', value: 'left' },
                  ],
                  admin: {
                    width: '50%',
                    description: 'Posição do vídeo na coluna direita. "Direita" garante bom afastamento do texto.',
                  },
                },
                {
                  name: 'introVideoAspectRatio',
                  label: 'Proporção do vídeo (Formato)',
                  type: 'select',
                  defaultValue: '16/9',
                  options: [
                    { label: 'Paisagem 16:9 (padrão)', value: '16/9' },
                    { label: 'Quadrado 1:1', value: '1/1' },
                    { label: 'Retrato 4:5', value: '4/5' },
                    { label: 'Retrato 9:16', value: '9/16' },
                    { label: 'Cinema 4:3', value: '4/3' },
                  ],
                  admin: {
                    width: '50%',
                    description: 'Formato do vídeo. Define se ele é quadrado, retangular ou vertical.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'introVideoRadius',
                  label: 'Arredondamento do container (px)',
                  type: 'number',
                  defaultValue: 0,
                  min: 0,
                  max: 300,
                  admin: {
                    width: '50%',
                    description: 'Raio dos cantos do container externo (borda/fundo). 0 = sem arredondamento.',
                  },
                },
                {
                  name: 'introVideoInnerRadius',
                  label: 'Arredondamento do vídeo (px)',
                  type: 'number',
                  defaultValue: 0,
                  min: 0,
                  max: 300,
                  admin: {
                    width: '50%',
                    description: 'Arredonda os cantos do próprio vídeo (clip interno). Independente do container.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'introContainerBg',
                  label: 'Cor de fundo do container (Hex)',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Cor exibida ao redor do vídeo dentro do container. Ex: #f5f5f5. Deixe vazio para transparente.',
                  },
                },
                {
                  name: 'introContainerPadding',
                  label: 'Espaçamento interno (px)',
                  type: 'number',
                  defaultValue: 0,
                  min: 0,
                  max: 60,
                  admin: {
                    width: '50%',
                    description: 'Espaço entre o vídeo e a borda do container.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'introContainerBorder',
                  label: 'Exibir borda ao redor do container?',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                    description: 'Ativa uma borda visível ao redor do container de vídeo.',
                  },
                },
                {
                  name: 'introContainerBorderColor',
                  label: 'Cor da borda (Hex)',
                  type: 'text',
                  admin: {
                    width: '50%',
                    condition: (data, siblingData) => siblingData?.introContainerBorder === true,
                    description: 'Cor da borda do container. Ex: #cccccc.',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'introCtaLabel',
              label: 'Botão CTA — texto',
              type: 'text',
              localized: true,
              admin: { width: '50%' },
            },
            {
              name: 'introCtaUrl',
              label: 'Botão CTA — link',
              type: 'text',
              localized: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    // ── Seção Banner Central ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '03 · Banner central',
      fields: [
        {
          name: 'bannerText',
          label: 'Texto principal',
          type: 'textarea',
          localized: true,
          admin: { description: 'Ex: "Sua próxima safra, pode ser ainda". Dica: Use Enter para definir as quebras de linha.' },
        },
        {
          name: 'bannerTextAlign',
          label: 'Alinhamento do texto',
          type: 'select',
          options: [
            { label: 'Esquerda', value: 'left' },
            { label: 'Centro', value: 'center' },
            { label: 'Direita', value: 'right' },
            { label: 'Justificado', value: 'justify' },
          ],
          defaultValue: 'center',
        },
        {
          name: 'bannerTextAccent',
          label: 'Texto em destaque (cor diferente)',
          type: 'textarea',
          localized: true,
          admin: { description: 'Ex: "melhor conosco!". Dica: Use Enter para definir as quebras de linha.' },
        },
        {
          name: 'bannerTextAccentColor',
          label: 'Cor do destaque do banner (Hex)',
          type: 'text',
          defaultValue: '#e1fe00',
          admin: { description: 'Cor em formato Hexadecimal para o texto em destaque. Padrão: #e1fe00' },
        },
        {
          name: 'bannerImage',
          label: 'Imagem de fundo do banner',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // ── Seção Números / Stats ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '04 · Números e resultados',
      fields: [
        {
          name: 'statsTag',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Resultados' },
        },
        {
          name: 'statsTitle',
          label: 'Título da seção (parte normal)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Números que' },
        },
        {
          name: 'statsTitleAccent',
          label: 'Título da seção (parte em destaque)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: traduzem excelência — aparecerá em verde' },
        },
        {
          name: 'statsTitleAccentColor',
          label: 'Cor do título destacado (Hex)',
          type: 'text',
          defaultValue: '#88a668',
          admin: { description: 'Cor em formato Hexadecimal para o título destacado. Padrão: #88a668' },
        },
        {
          name: 'statsTitleAlign',
          label: 'Alinhamento do título',
          type: 'select',
          options: [
            { label: 'Esquerda', value: 'left' },
            { label: 'Centro', value: 'center' },
            { label: 'Direita', value: 'right' },
            { label: 'Justificado', value: 'justify' },
          ],
          defaultValue: 'left',
        },
        {
          name: 'statsSubtext',
          label: 'Texto de apoio',
          type: 'textarea',
          localized: true,
          admin: { description: 'Dica: Use Enter para definir as quebras de linha.' },
        },
        {
          name: 'statsSubtextAlign',
          label: 'Alinhamento do texto de apoio',
          type: 'select',
          options: [
            { label: 'Esquerda', value: 'left' },
            { label: 'Centro', value: 'center' },
            { label: 'Direita', value: 'right' },
            { label: 'Justificado', value: 'justify' },
          ],
          defaultValue: 'left',
        },
        {
          name: 'stats',
          label: 'Indicadores',
          type: 'array',
          minRows: 1,
          maxRows: 6,
          defaultValue: [
            { prefix: '+', value: 400000, suffix: '', label: 'Hectares atendidos', color: 'peach' },
            { prefix: '+', value: 300, suffix: 'm', label: 'Em pull de compras', color: 'dark' },
            { prefix: '+', value: 80, suffix: '', label: 'Fazendas/Grupos atendidos', color: 'lime' },
            { prefix: '+', value: 29, suffix: '', label: 'Safras de experiência somada', color: 'paleGreen' },
          ],
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'prefix',
                  label: 'Prefixo',
                  type: 'text',
                  admin: { width: '20%', description: 'Ex: +' },
                },
                {
                  name: 'value',
                  label: 'Número',
                  type: 'number',
                  required: true,
                  admin: { width: '30%' },
                },
                {
                  name: 'suffix',
                  label: 'Sufixo',
                  type: 'text',
                  admin: { width: '20%', description: 'Ex: m, k' },
                },
                {
                  name: 'label',
                  label: 'Legenda',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: { width: '30%', description: 'Ex: Hectares atendidos' },
                },
              ],
            },
            {
              name: 'icon',
              label: 'Ícone',
              type: 'upload',
              relationTo: 'media',
              admin: {
                components: {
                  Description: '@/components/CMSDescriptionTooltip/IconTooltip',
                },
              },
            },
            {
              name: 'color',
              label: 'Cor / Paleta do card',
              type: 'select',
              options: [
                { label: 'Pêssego (Design 1)', value: 'peach' },
                { label: 'Verde Escuro (Design 2)', value: 'dark' },
                { label: 'Limão (Design 3)', value: 'lime' },
                { label: 'Verde Claro (Design 4)', value: 'paleGreen' },
                { label: 'Bronze / Terra', value: 'bronze' },
                { label: 'Floresta / Pinheiro', value: 'forest' },
                { label: 'Branco Minimalista', value: 'white' },
                { label: 'Cinza Neutro', value: 'gray' },
                { label: 'Amarelo Suave', value: 'softYellow' },
                { label: 'Azul Suave', value: 'softBlue' },
                { label: 'Personalizado (Inserir Hexadecimal)...', value: 'custom' },
              ],
              admin: {
                description: 'Escolha uma paleta de cores pré-definida ou selecione "Personalizado" para inserir cores sob medida.',
              },
            },
            {
              name: 'customBgColor',
              label: 'Cor de fundo personalizada (Hex)',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.color === 'custom',
                description: 'Ex: #ffd087',
              },
            },
            {
              name: 'customTextColor',
              label: 'Cor do texto personalizada (Hex)',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.color === 'custom',
                description: 'Ex: #965a30',
              },
            },
          ],
        },
      ],
    },

    // ── Seção Metodologia ──────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '05 · Metodologia / Pilares',
      fields: [
        {
          name: 'methodologyBadge',
          label: 'Tag / Badge',
          type: 'text',
          localized: true,
          defaultValue: 'Estrutura',
        },
        {
          name: 'methodologyTitle',
          label: 'Título',
          type: 'textarea',
          localized: true,
          defaultValue: 'Pilares Metodológicos',
          admin: {
            description: 'Dica: Use Enter para definir as quebras de linha.',
          },
        },
        {
          name: 'methodologyTitleAlign',
          label: 'Alinhamento do Título',
          type: 'select',
          options: [
            { label: 'Esquerda', value: 'left' },
            { label: 'Centro', value: 'center' },
            { label: 'Direita', value: 'right' },
            { label: 'Justificado', value: 'justify' },
          ],
          defaultValue: 'left',
        },
        {
          name: 'methodologyCards',
          label: 'Cards / Pilares',
          type: 'array',
          minRows: 1,
          maxRows: 4,
          labels: {
            singular: 'Pilar',
            plural: 'Pilares',
          },
          fields: [
            {
              name: 'title',
              label: 'Título do pilar',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              label: 'Ícone (PNG/SVG)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                components: {
                  Description: '@/components/CMSDescriptionTooltip/IconTooltip',
                },
              },
            },
            {
              name: 'image',
              label: 'Imagem ativa à direita',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    // ── Seção Mapa / Atuação ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '06 · Mapa de atuação',
      fields: [
        {
          name: 'mapTag',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Atuação' },
        },
        {
          name: 'mapTitle',
          label: 'Título',
          type: 'text',
          localized: true,
        },
        {
          name: 'mapDescription',
          label: 'Descrição',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'mapLogos',
          label: 'Logos do carrossel inferior',
          type: 'array',
          maxRows: 12,
          labels: {
            singular: 'Logo',
            plural: 'Logos',
          },
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                components: {
                  Description: '@/components/CMSDescriptionTooltip/LogoTooltip',
                },
              },
            },
            {
              name: 'alt',
              label: 'Nome da empresa (alt)',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Seção Galeria / Parceria ───────────────────────────────────────────
    {
      type: 'collapsible',
      label: '07 · Galeria de fotos',
      fields: [
        {
          name: 'galleryTitle',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Parceria' },
        },
        {
          name: 'gallerySubtitle',
          label: 'Título principal',
          type: 'text',
          localized: true,
        },
        {
          name: 'galleryImages',
          label: 'Fotos do carrossel',
          type: 'array',
          fields: [
            {
              name: 'image',
              label: 'Foto',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Seção Depoimentos ──────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '08 · Depoimentos',
      fields: [
        {
          name: 'testimonialsTag',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Depoimentos' },
        },
        {
          name: 'testimonialsTitle',
          label: 'Título da seção (parte normal)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: A escolha dos líderes' },
        },
        {
          name: 'testimonialsTitleAccent',
          label: 'Título da seção (parte em destaque)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: que inovam no campo — aparecerá em verde' },
        },
      ],
    },

    // ── CTA Final ──────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '09 · CTA final',
      fields: [
        {
          name: 'ctaText',
          label: 'Texto do CTA',
          type: 'text',
          localized: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ctaButtonLabel',
              label: 'Botão — texto',
              type: 'text',
              localized: true,
              admin: { width: '50%' },
            },
            {
              name: 'ctaButtonUrl',
              label: 'Botão — link',
              type: 'text',
              localized: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
}

export default HomePage
