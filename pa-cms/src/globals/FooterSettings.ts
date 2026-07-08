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
              label: 'Rótulo / Unidade (ex: Matriz Tangará)',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '30%' },
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
  ],
}

export default FooterSettings
