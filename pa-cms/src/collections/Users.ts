import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '../access/isAdmin'

// Usuários que acessam o painel administrativo do CMS
const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Administração',
  },
  access: {
    create: isAdmin,
    read: isLoggedIn,
    update: isAdmin,
    delete: isAdmin,
  },
  labels: {
    singular: 'Usuário',
    plural: 'Usuários',
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Perfil de acesso',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'Administrador pode criar e excluir usuários. Editor só edita conteúdo.',
      },
    },
  ],
}

export default Users
