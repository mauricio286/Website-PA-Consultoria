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
      name: 'description',
      label: 'Conteúdo completo',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({}),
      admin: {
        description: 'Corpo da página de detalhe do serviço.',
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
        condition: (data) => data?.slug === 'consultoria-agronomica',
        description: 'Se ativado, exibe a imagem ilustrativa ao lado do texto. Se desativado, o texto ocupa a largura total (Layout Sem Imagem).',
      },
    },
  ],
}

export default Services
