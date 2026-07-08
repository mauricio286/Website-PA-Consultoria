'use client'

import React from 'react'

interface StopPropagationProps {
  children: React.ReactNode
  className?: string
}

export default function StopPropagation({ children, className }: StopPropagationProps) {
  return (
    <span className={className} onClick={e => e.stopPropagation()}>
      {children}
    </span>
  )
}
