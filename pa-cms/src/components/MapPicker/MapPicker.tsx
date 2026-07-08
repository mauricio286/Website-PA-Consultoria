'use client'

import React, { useRef } from 'react'
import { useField } from '@payloadcms/ui'

export default function MapPicker() {
  // Use useField hooks for specific positionX and positionY fields
  const { value: x, setValue: setX } = useField({ path: 'positionX' }) as any
  const { value: y, setValue: setY } = useField({ path: 'positionY' }) as any

  const containerRef = useRef<HTMLDivElement>(null)

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Calculate click position relative to the container size
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    
    // Scale it to the map's original coordinates (1195 x 1031)
    const scaledX = Math.round((clickX / rect.width) * 1195)
    const scaledY = Math.round((clickY / rect.height) * 1031)

    // Save values in the Payload form fields
    if (setX) setX(scaledX)
    if (setY) setY(scaledY)
  }

  // Draw the indicator pin at current values (convert back to percentages)
  const pinLeft = x ? (x / 1195) * 100 : null
  const pinTop = y ? (y / 1031) * 100 : null

  return (
    <div style={{ marginBottom: '20px' }}>
      <label className="field-label" style={{ marginBottom: '8px', display: 'block', fontWeight: 600 }}>
        Seletor Visual de Posição no Mapa
      </label>
      <div 
        ref={containerRef}
        onClick={handleMapClick}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          aspectRatio: '1195 / 1031',
          border: '1px solid var(--theme-elevation-200)',
          borderRadius: '6px',
          overflow: 'hidden',
          cursor: 'crosshair',
          userSelect: 'none',
          backgroundColor: '#011c15', // Matches map background theme
        }}
      >
        {/* Background Map of Mato Grosso */}
        <img 
          src="/Map Brasil.svg"
          alt="Mapa Mato Grosso"
          style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
        />
        
        {/* Pulsing Visual Pin Indicator */}
        {pinLeft !== null && pinTop !== null && (
          <div 
            style={{
              position: 'absolute',
              left: `${pinLeft}%`,
              top: `${pinTop}%`,
              width: '16px',
              height: '16px',
              backgroundColor: '#e1fe00',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              animation: 'ping 1.5s infinite',
            }}
          />
        )}
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--theme-elevation-400)', marginTop: '6px' }}>
        💡 <strong>Dica:</strong> Clique em qualquer lugar no mapa acima para posicionar o município visualmente. Os campos de coordenadas X e Y abaixo serão atualizados automaticamente.
      </p>
      
      {/* Dynamic Keyframes inline style for the pulsing pin */}
      <style>{`
        @keyframes ping {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
