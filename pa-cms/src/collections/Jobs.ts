import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { autoSlugHook } from '../hooks/autoSlug'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Vagas de emprego abertas para candidatura no site
const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Vaga',
    plural: 'Vagas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'visible', 'openingDate', 'order'],
    group: 'Páginas',
  },
  disableBulkEdit: true,
  hooks: {
    beforeChange: [autoSlugHook],
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    // ── Identificação ──────────────────────────────────────────────────────
    {
      name: 'title',
      label: 'Título da vaga',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      unique: true,
      admin: { readOnly: false },
    },

    // ── Textos ─────────────────────────────────────────────────────────────
    {
      name: 'summary',
      label: 'Resumo',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Texto curto exibido no card da vaga. Máximo 200 caracteres.',
      },
    },
    {
      name: 'description',
      label: 'Descrição completa',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({}),
    },

    // ── Listas estruturadas ─────────────────────────────────────────────────
    {
      name: 'requirements',
      label: 'Requisitos',
      type: 'array',
      fields: [
        {
          name: 'item',
          label: 'Requisito',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'responsibilities',
      label: 'Atribuições',
      type: 'array',
      fields: [
        {
          name: 'item',
          label: 'Atribuição',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },

    // ── Controle de status ─────────────────────────────────────────────────
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Aberta', value: 'open' },
        { label: 'Pausada', value: 'paused' },
        { label: 'Encerrada', value: 'closed' },
      ],
    },
    {
      name: 'visible',
      label: 'Visível no site',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Se marcado, a vaga será exibida na listagem do site.',
      },
    },
    {
      name: 'openingDate',
      label: 'Data de abertura',
      type: 'date',
      admin: {
        date: { displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'closingDate',
      label: 'Data de encerramento',
      type: 'date',
      admin: {
        date: { displayFormat: 'dd/MM/yyyy' },
        description: 'Opcional. Apenas para controle interno.',
      },
    },
    {
      name: 'order',
      label: 'Ordem de exibição',
      type: 'number',
      defaultValue: 0,
    },
  ],
}

export default Jobs
