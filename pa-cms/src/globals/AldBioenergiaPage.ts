import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const AldBioenergiaPage: GlobalConfig = {
  slug: 'ald-bioenergia-page',
  label: '2.3.1.1. ALD Bioenergia',
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

    // ── Seção 1 (Texto e Logo) ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · Seção 1 (Texto e Logo)',
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
          name: 'logoImage',
          label: 'Logo da Usina (Direita)',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // ── Seção 2 (Indicadores) ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '03 · Seção 2 (Indicadores)',
      fields: [
        {
          name: 'indicators',
          label: 'Cards de Indicadores',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'value',
              label: 'Valor (Ex: 1 Milhão)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição (Ex: Litros de Etanol)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              label: 'Ícone Ilustrativo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'theme',
              label: 'Tema de Cor do Card',
              type: 'select',
              options: [
                { label: 'Escuro (Verde Escuro)', value: 'dark' },
                { label: 'Limão (Verde Limão/Amarelo)', value: 'lime' },
                { label: 'Claro (Cinza Claro)', value: 'light' },
              ],
              defaultValue: 'light',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Seção 3 (Texto e Imagem) ─────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '04 · Seção 3 (Texto e Imagem)',
      fields: [
        {
          name: 'section3Content',
          label: 'Conteúdo de Texto (Esquerda)',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({}),
          required: true,
        },
        {
          name: 'section3Image',
          label: 'Imagem da Usina (Direita)',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // ── Seção 4 (Texto Inferior) ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '05 · Seção 4 (Texto Inferior)',
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

export default AldBioenergiaPage
