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
        {
          name: 'heroImageTablet',
          label: 'Imagem de capa (Tablet)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Opcional. Exibida em tablets (telas de até 1024px). Se não informada, usa a de Desktop.',
          },
        },
        {
          name: 'heroImageMobile',
          label: 'Imagem de capa (Mobile)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Opcional. Exibida em celulares (telas de até 580px). Se não informada, usa a de Desktop ou Tablet.',
          },
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
          name: 'titleHighlightColor',
          label: 'Cor do destaque (Hex)',
          type: 'text',
          defaultValue: '#88a668',
          admin: {
            description: 'Cor em formato Hexadecimal para o texto em destaque. Padrão: #88a668',
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
