import React from 'react'

export default function CustomLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      {/* Imagem da Agência (carregada da pasta public/) */}
      <img 
        src="/065.jpeg" 
        alt="Agência Logada" 
        style={{ 
          height: 'auto',
          maxHeight: '100px', 
          maxWidth: '240px', 
          objectFit: 'contain',
          borderRadius: '6px'
        }} 
      />
      <span style={{ fontSize: '0.8rem', color: 'var(--theme-elevation-400)', fontWeight: 500 }}>
        Painel Administrativo
      </span>
    </div>
  )
}
