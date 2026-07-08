import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

// Depoimentos de clientes exibidos na Home
const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Depoimento',
    plural: 'Depoimentos',
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'authorDescription', 'published', 'order'],
    group: 'Conteúdo',
  },
  disableBulkEdit: true,
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    beforeValidate: [
      async ({ req, operation }) => {
        if (operation === 'create') {
          const count = await req.payload.count({
            collection: 'testimonials',
          })
          if (count.total >= 6) {
            throw new Error('Limite máximo de 6 depoimentos atingido. Remova um depoimento antes de cadastrar outro.')
          }
        }
      }
    ]
  },
  fields: [
    {
      name: 'authorName',
      label: 'Nome do autor',
      type: 'text',
      required: true,
    },
    {
      name: 'authorDescription',
      label: 'Cargo / Empresa',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Ex: Grupo Mantovani • Sorriso - MT',
      },
    },
    {
      name: 'photo',
      label: 'Foto do autor',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'quote',
      label: 'Depoimento',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'order',
      label: 'Ordem de exibição',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'published',
      label: 'Publicado',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Testimonials
