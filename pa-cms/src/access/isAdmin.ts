import type { Access } from 'payload'

// Permite acesso apenas para usuários logados com role 'admin'
export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'admin')
}

// Permite acesso para qualquer usuário autenticado (admin ou editor)
export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

// Permite leitura pública, mas escrita apenas para admins
export const isAdminOrReadPublic: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'admin')
}
