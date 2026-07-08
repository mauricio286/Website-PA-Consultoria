import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

// Configuração do conteúdo editável da página de Ecossistema (Geral) / Serviços
const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Ecossistema (Geral)',
  admin: {
    group: 'Páginas',
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '01 · Hero',
      fields: [
        {
          name: 'heroImage',
          label: 'Imagem de fundo do Hero',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'heroImageTablet',
          label: 'Imagem de fundo (Tablet)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Opcional. Exibida em tablets (telas de até 1024px). Se não informada, usa a de Desktop.',
          },
        },
        {
          name: 'heroImageMobile',
          label: 'Imagem de fundo (Mobile)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Opcional. Exibida em celulares (telas de até 580px). Se não informada, usa a de Desktop ou Tablet.',
          },
        },
      ],
    },

    // ── Seção de Lista de Serviços (Eixos de Atuação) ───────────────────────
    {
      type: 'collapsible',
      label: '02 · Eixos de Atuação',
      fields: [
        {
          name: 'servicesBadge',
          label: 'Badge / Tag da seção',
          type: 'text',
          localized: true,
        },
        {
          name: 'servicesTitle',
          label: 'Título',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Dica: Use Enter para quebras de linha.',
          },
        },
        {
          name: 'servicesSubtitle',
          label: 'Subtítulo em destaque',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Dica: Use Enter para quebras de linha.',
          },
        },
        {
          name: 'servicesDescription',
          label: 'Descrição da seção',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Dica: Use Enter para quebras de linha.',
          },
        },
        {
          name: 'servicesCards',
          label: 'Cards dos Serviços',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              name: 'title',
              label: 'Título do card',
              type: 'textarea',
              localized: true,
              required: true,
              admin: {
                description: 'Dica: Use Enter para definir onde as linhas devem quebrar no card.',
              },
            },
            {
              name: 'shortDescription',
              label: 'Descrição',
              type: 'textarea',
              localized: true,
              required: true,
              admin: {
                description: 'Dica: Use Enter para quebras de linha no card.',
              },
            },
            {
              name: 'slug',
              label: 'Slug de destino (URL)',
              type: 'text',
              admin: {
                readOnly: true,
              },
            },
          ],
        },
      ],
    },

    // ── Seção de Ecossistema ────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '03 · Ecossistema',
      fields: [
        {
          name: 'ecosystemBadge',
          label: 'Badge / Tag da seção',
          type: 'text',
          localized: true,
        },
        {
          name: 'ecosystemTitle',
          label: 'Título',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Dica: Use Enter para quebras de linha.',
          },
        },
        {
          name: 'ecosystemSubtitle',
          label: 'Subtítulo em destaque',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Dica: Use Enter para quebras de linha.',
          },
        },
        {
          name: 'ecosystemCards',
          label: 'Cards do Ecossistema',
          type: 'array',
          fields: [
            {
              name: 'title',
              label: 'Título do card',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'image',
              label: 'Imagem',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'link',
              label: 'Link / URL do botão',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default ServicesPage
