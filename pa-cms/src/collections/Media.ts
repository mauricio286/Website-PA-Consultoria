import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

// Armazenamento centralizado de imagens e arquivos do site
const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Mídia',
    plural: 'Mídias',
  },
  admin: {
    group: 'Conteúdo',
  },
  upload: {
    // Tamanhos de imagem gerados automaticamente pelo Payload
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ],
  },
  access: {
    // Qualquer pessoa pode ver as imagens
    read: () => true,
    // Apenas usuários logados podem fazer upload
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo (acessibilidade)',
      type: 'text',
      required: true,
      admin: {
        description: 'Descreva a imagem para leitores de tela. Ex: "Campo de soja ao amanhecer"',
      },
    },
  ],
}

export default Media
