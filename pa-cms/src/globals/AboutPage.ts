import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Configuração de todos os conteúdos editáveis da página Quem Somos
const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Quem Somos',
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

    // ── Introdução ──────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · Introdução',
      fields: [
        {
          name: 'introTag',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Quem Somos' },
        },
        {
          name: 'title',
          label: 'Título',
          type: 'textarea',
          localized: true,
          admin: { description: 'Título principal. Dica: Use Enter para quebras de linha.' },
        },
        {
          name: 'subtitle',
          label: 'Subtítulo em destaque',
          type: 'textarea',
          localized: true,
          admin: { description: 'Subtítulo em destaque. Dica: Use Enter para quebras de linha.' },
        },
        {
          name: 'introText',
          label: 'Texto introdutório',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({}),
        },
      ],
    },

    // ── Missão / Visão / Valores ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '03 · Missão, Visão e Valores',
      fields: [
        // Missão
        {
          type: 'group',
          name: 'commitment',
          label: 'Card 1',
          fields: [
            { name: 'title', label: 'Título', type: 'text', localized: true },
            { name: 'text', label: 'Texto', type: 'richText', localized: true, editor: lexicalEditor({}) },
          ],
        },
        // Visão
        {
          type: 'group',
          name: 'vision',
          label: 'Card 2',
          fields: [
            { name: 'title', label: 'Título', type: 'text', localized: true },
            { name: 'text', label: 'Texto', type: 'richText', localized: true, editor: lexicalEditor({}) },
          ],
        },
        // Valores
        {
          type: 'group',
          name: 'values',
          label: 'Card 3',
          fields: [
            { name: 'title', label: 'Título', type: 'text', localized: true },
            { name: 'text', label: 'Texto', type: 'richText', localized: true, editor: lexicalEditor({}) },
          ],
        },
      ],
    },

    // ── Vídeo Institucional ─────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '04 · Vídeo institucional',
      fields: [
        {
          name: 'videoSectionTag',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Vídeo Institucional' },
        },
        {
          name: 'videoSectionTitle',
          label: 'Título da seção (parte normal)',
          type: 'text',
          localized: true,
        },
        {
          name: 'videoSectionTitleAccent',
          label: 'Título da seção (parte em destaque)',
          type: 'text',
          localized: true,
        },
        {
          name: 'institutionalVideoUrl',
          label: 'URL do vídeo (YouTube)',
          type: 'text',
          admin: {
            description: 'Cole a URL de embed do YouTube. Ex: https://www.youtube.com/embed/XXXXXXXXX',
          },
        },
      ],
    },

    // ── Timeline ────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '05 · Nossa história (Timeline)',
      fields: [
        {
          name: 'timelineTag',
          label: 'Título da tag (badge)',
          type: 'text',
          localized: true,
          admin: { description: 'Ex: Nossa História' },
        },
        {
          name: 'timelineTitle',
          label: 'Título da timeline',
          type: 'text',
          localized: true,
        },
        {
          name: 'timeline',
          label: 'Eventos da timeline',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'tag',
                  label: 'Tag',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    width: '30%',
                    description: 'Ex: o início, consultoria',
                  },
                },
                {
                  name: 'year',
                  label: 'Ano',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '20%',
                    description: 'Ex: 1993, Atual',
                  },
                },
              ],
            },
            {
              name: 'text',
              label: 'Texto do evento',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({}),
              required: true,
            },
            {
              name: 'image',
              label: 'Imagem',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}

export default AboutPage
