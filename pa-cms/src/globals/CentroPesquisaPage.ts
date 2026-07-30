import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const CentroPesquisaPage: GlobalConfig = {
  slug: 'centro-pesquisa-page',
  label: '2.3.1.3. Centro de Pesquisa',
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

    // ── Seção Principal ─────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · Seção Principal (Texto e Imagem)',
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
  ],
}

export default CentroPesquisaPage
