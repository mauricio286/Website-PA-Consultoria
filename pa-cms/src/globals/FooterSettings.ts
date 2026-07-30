import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: 'Footer',
  admin: {
    group: 'Administração',
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'addresses',
      label: 'Endereços do Rodapé',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Cadastre os endereços e os links correspondentes do Google Maps que serão exibidos no rodapé do site.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'Rótulo / Unidade',
              type: 'text',
              localized: true,
              required: true,
              admin: { 
                width: '30%',
                description: 'Ex: Matriz Tangará',
              },
            },
            {
              name: 'text',
              label: 'Endereço Completo',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '70%' },
            },
          ],
        },
        {
          name: 'mapsUrl',
          label: 'Link do Google Maps (URL completa para redirecionamento ao clicar)',
          type: 'text',
          required: true,
        },
      ],
    },
    // ── Redes Sociais ────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Redes Sociais',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'linkedinUrl',
              label: 'Link do LinkedIn',
              type: 'text',
              admin: { 
                width: '50%',
                placeholder: 'https://linkedin.com/company/agropa',
              },
            },
            {
              name: 'instagramUrl',
              label: 'Link do Instagram',
              type: 'text',
              admin: { 
                width: '50%',
                placeholder: 'https://instagram.com/agropa',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'facebookUrl',
              label: 'Link do Facebook',
              type: 'text',
              admin: { 
                width: '50%',
                placeholder: 'https://facebook.com/agropa',
              },
            },
            {
              name: 'youtubeUrl',
              label: 'Link do YouTube',
              type: 'text',
              admin: { 
                width: '50%',
                placeholder: 'https://youtube.com/@agropa',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default FooterSettings
