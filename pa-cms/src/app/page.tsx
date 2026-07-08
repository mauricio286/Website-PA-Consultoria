import { redirect } from 'next/navigation'

// Redireciona a raiz do servidor para o painel admin
export default function RootPage() {
  redirect('/admin')
}
