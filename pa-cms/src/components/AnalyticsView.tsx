import React from 'react'
import Link from 'next/link'

export default function AnalyticsView() {
  const shareUrl = process.env.UMAMI_SHARE_URL || ''
  
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 40px)', padding: '30px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--theme-elevation-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link 
            href="/admin" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              textDecoration: 'none', 
              color: 'var(--theme-elevation-600)', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              border: '1px solid var(--theme-elevation-150)', 
              fontSize: '0.875rem', 
              fontWeight: 500,
              backgroundColor: 'var(--theme-elevation-50)',
              transition: 'all 0.15s ease'
            }}
          >
            ⬅️ Voltar ao Painel
          </Link>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600 }}>Estatísticas de Acesso</h1>
            <p style={{ margin: '5px 0 0 0', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
              Monitore o tráfego do seu site em tempo real (visitantes, regiões, aparelhos e páginas mais acessadas).
            </p>
          </div>
        </div>
        {!shareUrl && (
          <div style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.875rem', border: '1px solid #fde68a' }}>
            ⚠️ Painel de Estatísticas não configurado. Defina a variável <strong>UMAMI_SHARE_URL</strong> no arquivo .env do servidor.
          </div>
        )}
      </div>
      <div style={{ flex: 1, marginTop: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--theme-elevation-150)', backgroundColor: 'var(--theme-elevation-50)' }}>
        {shareUrl ? (
          <iframe
            src={`${shareUrl}?embed=true`}
            title="Umami Analytics Dashboard"
            style={{ width: '100%', height: '100%', border: 'none' }}
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
            <span style={{ fontSize: '3rem' }}>📊</span>
            <h3 style={{ margin: 0, color: 'var(--theme-elevation-600)' }}>Nenhum painel configurado</h3>
            <p style={{ margin: 0, color: 'var(--theme-elevation-400)', fontSize: '0.875rem', maxWidth: '400px', textAlign: 'center' }}>
              Para visualizar as métricas do site, cadastre o seu painel compartilhado na variável de ambiente <code>UMAMI_SHARE_URL</code> do servidor.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
