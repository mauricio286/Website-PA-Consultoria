'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Componente de barra lateral customizada — aparece após os links nativos do Payload
export default function CustomSidebar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
      router.push('/admin/login')
    } catch {
      router.push('/admin/login')
    }
  }

  return (
    <div style={{ padding: '0 0 1rem 0' }}>
      {/* Botão de sair */}
      <div style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', borderTop: '1px solid var(--theme-elevation-100)' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            background: 'none',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            color: 'var(--theme-elevation-600)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.background = '#fee2e2'
            el.style.color = '#dc2626'
            el.style.borderColor = '#fca5a5'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.background = 'none'
            el.style.color = 'var(--theme-elevation-600)'
            el.style.borderColor = 'var(--theme-elevation-150)'
          }}
        >
          <span>🚪</span> Sair do painel
        </button>
      </div>
    </div>
  )
}
