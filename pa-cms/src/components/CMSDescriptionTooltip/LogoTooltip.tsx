'use client'

import React, { useState } from 'react'

export default function LogoTooltip() {
  const [isHovered, setIsHovered] = useState(false)

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '6px',
    fontSize: '12px',
    color: '#666',
    fontFamily: 'sans-serif',
  }

  const iconStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: isHovered ? '#002d22' : '#e0e0e0',
    color: isHovered ? '#fff' : '#333',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer',
    marginRight: '6px',
    transition: 'all 0.2s ease',
    border: 'none',
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    top: '24px',
    left: '0',
    width: '340px',
    backgroundColor: '#001a14',
    color: '#e6edea',
    padding: '14px',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    border: '1px solid #144d3b',
    zIndex: 9999,
    fontSize: '12px',
    lineHeight: '1.5',
    visibility: isHovered ? 'visible' : 'hidden',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    pointerEvents: 'none',
  }

  const titleStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: '#e1fe00',
    fontSize: '13px',
  }

  return (
    <div 
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button type="button" style={iconStyle}>
        !
      </button>
      <span style={{ cursor: 'pointer', fontWeight: 500 }}>Instrução para Upload de Logos (Carrossel)</span>
      
      <div style={tooltipStyle}>
        <span style={titleStyle}>Instrução para Upload de Logos (Carrossel)</span>
        Para garantir que as marcas parceiras fiquem perfeitamente visíveis sobre o nosso fundo escuro, é fundamental que você faça o upload das logos exclusivamente no formato SVG e já pintadas na cor 100% branca, lembrando sempre de cortar qualquer sobra excessiva de espaço transparente nas margens do arquivo para que o alinhamento automático do site funcione com perfeição e mantenha nosso layout sempre limpo e sólido.
      </div>
    </div>
  )
}
