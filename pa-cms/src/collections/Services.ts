import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { autoSlugHook } from '../hooks/autoSlug'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Serviços oferecidos pela PA Consultoria (cada um tem página própria no frontend)
const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Serviço',
    plural: 'Serviços',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published', 'order'],
    group: 'Páginas',
  },
  disableBulkEdit: true,
  hooks: {
    beforeChange: [autoSlugHook],
  },
  access: {
    read: () => true,
    create: () => false,
    update: isLoggedIn,
    delete: () => false,
  },
  fields: [
    // ── Identificação ──────────────────────────────────────────────────────
    {
      name: 'title',
      label: 'Título',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Dica: Use Enter para definir onde as linhas devem quebrar no card do site.',
      },
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      unique: true,
      admin: {
        description: 'Gerado automaticamente. Usado na URL: /servicos/consultoria-agronomica',
        readOnly: false,
      },
    },

    // ── Textos ─────────────────────────────────────────────────────────────
    {
      name: 'shortDescription',
      label: 'Descrição',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Aparece nos cards da lista de serviços. Dica: Use Enter para quebras de linha.',
      },
    },
    {
      name: 'leftContent',
      label: 'Texto ao lado da imagem (esquerda)',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({}),
      admin: {
        description: 'Texto principal exibido à esquerda da imagem ilustrativa.',
      },
    },
    {
      name: 'bottomContent',
      label: 'Texto abaixo da imagem (fim da página)',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({}),
      admin: {
        description: 'Texto secundário exibido abaixo da imagem ilustrativa (largura total).',
      },
    },

    // ── Imagens ────────────────────────────────────────────────────────────
    {
      name: 'coverImage',
      label: 'Imagem de capa',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'coverImageTablet',
      label: 'Imagem de capa (Tablet)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Opcional. Exibida em tablets (telas de até 1024px). Se não informada, usa a de Desktop.',
      },
    },
    {
      name: 'coverImageMobile',
      label: 'Imagem de capa (Mobile)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Opcional. Exibida em celulares (telas de até 580px). Se não informada, usa a de Desktop ou Tablet.',
      },
    },
    {
      name: 'illustrationImage',
      label: 'Imagem ilustrativa do conteúdo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Imagem exibida ao lado do texto principal da página de detalhes.',
      },
    },
    {
      name: 'showIllustration',
      label: 'Exibir imagem ilustrativa',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Se ativado, exibe a imagem ilustrativa ao lado do texto. Se desativado, o texto ocupa a largura total (Layout Sem Imagem).',
      },
    },
    // ── Seção de Ciclo de Etapas (Customizável apenas em Agricultura de Precisão) ─
    {
      type: 'collapsible',
      label: '03 · Ciclo de Etapas (Opcional)',
      admin: {
        condition: (data) => data?.slug === 'agricultura-de-precisao',
      },
      fields: [
        {
          name: 'cycleActive',
          label: 'Ativar Ciclo de Etapas Animado',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Se ativado, renderiza uma seção com o anel animado de etapas no final da página (desenvolvido originalmente para a página de Agricultura de Precisão).',
          },
        },
        {
          name: 'cycleColor',
          label: 'Cor Principal do Ciclo (Hex)',
          type: 'text',
          defaultValue: '#88a668',
          admin: {
            description: 'Cor em formato Hexadecimal para a borda do anel e número da etapa. Padrão: #88a668',
          },
        },
        {
          name: 'cycleAccentColor',
          label: 'Cor do Texto em Destaque (Hex)',
          type: 'text',
          defaultValue: '#88a668',
          admin: {
            description: 'Cor em formato Hexadecimal para o texto em destaque da etapa. Padrão: #88a668',
          },
        },
        {
          name: 'cycleSteps',
          label: 'Etapas do Ciclo',
          type: 'array',
          fields: [
            {
              name: 'stepNumber',
              label: 'Número / Identificador da etapa',
              type: 'text',
              required: true,
              admin: {
                description: 'Ex: 1, 2, A, B...',
              },
            },
            {
              name: 'titleDark',
              label: 'Título (Parte Escura/Normal)',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Ex: Preparo do',
              },
            },
            {
              name: 'titleLight',
              label: 'Título (Parte Clara/Destaque)',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Ex: Solo',
              },
            },
            {
              name: 'desc',
              label: 'Descrição da etapa',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              label: 'Ícone (Material Symbols)',
              type: 'text',
              required: true,
              admin: {
                description: 'Nome do ícone do Material Icons (Ex: agriculture, eco, biotech, warehouse, settings). Consulte: https://fonts.google.com/icons',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Services
