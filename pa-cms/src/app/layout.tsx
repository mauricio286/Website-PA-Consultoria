import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'PA Consultoria CMS',
}

// Layout raiz — não inclui html/body pois o grupo (payload) cuida disso no admin
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
