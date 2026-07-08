import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

// Configuração do conteúdo editável da página de Carreiras
const CareersPage: GlobalConfig = {
  slug: 'careers-page',
  label: 'Carreiras',
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
      label: '01 · Capa',
      fields: [
        {
          name: 'heroImage',
          label: 'Imagem de capa (Hero)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // ── Conteúdo / Introdução ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · Introdução',
      fields: [
        {
          name: 'title',
          label: 'Título (Parte normal)',
          type: 'text',
          localized: true,
          admin: {
            description: 'Exemplo: "Faça parte "',
          },
        },
        {
          name: 'titleHighlight',
          label: 'Título destacado (em outra cor)',
          type: 'text',
          localized: true,
          admin: {
            description: 'Exemplo: "da PA"',
          },
        },
        {
          name: 'introText',
          label: 'Texto de introdução',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Texto exibido logo abaixo do título principal. Dica: Use Enter para quebras de linha.',
          },
        },
      ],
    },
  ],
}

export default CareersPage
