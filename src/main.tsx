import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ── Umami Analytics Integration ─────────────────────────────────────────────
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID
const umamiScriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js'

if (umamiWebsiteId && typeof window !== 'undefined') {
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = umamiScriptUrl
  script.setAttribute('data-website-id', umamiWebsiteId)
  document.head.appendChild(script)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
