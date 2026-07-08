import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { autoSlugHook } from '../hooks/autoSlug'

// Galerias de fotos reutilizáveis em diferentes seções do site
const Galleries: CollectionConfig = {
  slug: 'galleries',
  labels: {
    singular: 'Galeria',
    plural: 'Galerias',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'published', 'order'],
    group: 'Conteúdo',
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
    {
      name: 'title',
      label: 'Título da galeria',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
    },
    {
      name: 'images',
      label: 'Fotos',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Imagem',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Legenda',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'order',
      label: 'Ordem de exibição',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'published',
      label: 'Publicada',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default Galleries
