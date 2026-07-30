import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const LavouraPage: GlobalConfig = {
  slug: 'lavoura-page',
  label: '2.3.1.2. Lavoura',
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
          required: true,
        },
        {
          name: 'title',
          label: 'Título da página',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },

    // ── Seção 1 (Texto e Imagem) ─────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · Seção 1 (Texto e Imagem)',
      fields: [
        {
          name: 'leftContent',
          label: 'Conteúdo de Texto (Esquerda)',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({}),
          required: true,
        },
        {
          name: 'image',
          label: 'Imagem Ilustrativa (Direita)',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // ── Seção 2 (Texto Inferior) ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '03 · Seção 2 (Texto Inferior)',
      fields: [
        {
          name: 'bottomContent',
          label: 'Conteúdo de Texto (Largura Total)',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({}),
          required: true,
        },
      ],
    },
  ],
}

export default LavouraPage
