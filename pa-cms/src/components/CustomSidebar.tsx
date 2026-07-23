import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import StopPropagation from './StopPropagation'
import './custom-sidebar.css'

export default async function CustomSidebar() {
  const payload = await getPayload({ config: configPromise })
  
  // Buscar os serviços no banco de dados para listar dinamicamente no menu!
  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 10,
    sort: 'order',
  })

  // Ordenar e formatar a lista de serviços para corresponder aos subitens 2.3.2 a 2.3.6
  const orderedServices = [...services].sort((a, b) => {
    const getOrderValue = (title?: string, slug?: string) => {
      const t = (title || '').toLowerCase()
      const s = (slug || '').toLowerCase()
      if (t.includes('consultoria') || s.includes('consultoria')) return 1
      if (t.includes('unitá') || t.includes('unita') || s.includes('unita')) return 2
      if (t.includes('precisão') || t.includes('precisao') || s.includes('precisao')) return 3
      if (t.includes('compras') || t.includes('gestão') || t.includes('gestao') || s.includes('compras')) return 4
      if (t.includes('pesquisa') || s.includes('pesquisa')) return 5
      return 6
    }
    return getOrderValue(a.title, a.slug) - getOrderValue(b.title, b.slug)
  })

  return (
    <div className="pa-custom-sidebar">
      {/* ── 1. Administração ────────────────────────────────────────────────── */}
      <h4 className="pa-nav-heading">1. Administração</h4>
      <ul className="pa-nav-list" style={{ marginBottom: '1.5rem' }}>
        <li>
          <Link href="/admin/collections/users" className="pa-nav-link">
            1.1. Usuários
          </Link>
        </li>
      </ul>

      {/* ── 2. Páginas ──────────────────────────────────────────────────────── */}
      <h4 className="pa-nav-heading">2. Páginas</h4>
      <ul className="pa-nav-list" style={{ marginBottom: '1.5rem' }}>
        {/* 2. Home com submenu expandível */}
        <li className="pa-nav-dropdown">
          <details open>
            <summary className="pa-nav-link pa-nav-link-summary">
              2. Home
            </summary>
            <ul className="pa-sub-list">
              <li>
                <Link href="/admin/globals/home-page" className="pa-sub-link">
                  2.1. Home
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/map-locations" className="pa-sub-link">
                  2.1.1. Localizações
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/testimonials" className="pa-sub-link">
                  2.1.2. Depoimentos
                </Link>
              </li>
            </ul>
          </details>
        </li>

        {/* 2.2. Quem Somos */}
        <li>
          <Link href="/admin/globals/about-page" className="pa-nav-link">
            2.2. Quem Somos
          </Link>
        </li>

        {/* 2.3. Serviços com submenu expandível */}
        <li className="pa-nav-dropdown">
          <details open>
            <summary className="pa-nav-link pa-nav-link-summary">
              2.3. Serviços
            </summary>
            <ul className="pa-sub-list">
              <li>
                <Link href="/admin/globals/services-page" className="pa-sub-link">
                  2.3.1. Ecossistema (Geral)
                </Link>
              </li>
              <li>
                <Link href="/admin/globals/ald-bioenergia-page" className="pa-sub-link pa-sidebar-sub-item">
                  2.3.1.1. ALD Bioenergia
                </Link>
              </li>
              <li>
                <Link href="/admin/globals/lavoura-page" className="pa-sub-link pa-sidebar-sub-item">
                  2.3.1.2. Lavoura
                </Link>
              </li>
              <li>
                <Link href="/admin/globals/centro-pesquisa-page" className="pa-sub-link pa-sidebar-sub-item">
                  2.3.1.3. Centro de Pesquisa
                </Link>
              </li>
              <li>
                <Link href="/admin/globals/palestras-page" className="pa-sub-link pa-sidebar-sub-item">
                  2.3.1.4. Palestras e Eventos
                </Link>
              </li>
              {orderedServices.map((svc, index) => (
                <li key={svc.id}>
                  <Link href={`/admin/collections/services/${svc.id}`} className="pa-sub-link">
                    2.3.{index + 2}. {svc.title?.replace(/\r?\n/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>

        {/* 2.4. Carreiras com submenu expandível */}
        <li className="pa-nav-dropdown">
          <details open>
            <summary className="pa-nav-link pa-nav-link-summary">
              2.4. Carreiras
            </summary>
            <ul className="pa-sub-list">
              <li>
                <Link href="/admin/globals/careers-page" className="pa-sub-link">
                  2.4.1. Geral
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/jobs" className="pa-sub-link">
                  2.4.2. Vagas
                </Link>
              </li>
            </ul>
          </details>
        </li>

        {/* 2.5. Contato */}
        <li>
          <Link href="/admin/globals/contact-settings" className="pa-nav-link">
            2.5. Contato
          </Link>
        </li>

        {/* 2.6. Footer */}
        <li>
          <Link href="/admin/globals/footer-settings" className="pa-nav-link">
            2.6. Footer
          </Link>
        </li>
      </ul>

      {/* ── 3. Conteúdo ──────────────────────────────────────────────────────── */}
      <h4 className="pa-nav-heading">3. Conteúdo</h4>
      <ul className="pa-nav-list" style={{ marginBottom: '1.5rem' }}>
        <li>
          <Link href="/admin/collections/media" className="pa-nav-link">
            3.1. Mídias e Imagens
          </Link>
        </li>
        <li>
          <Link href="/admin/collections/galleries" className="pa-nav-link">
            3.2. Galeria de Fotos
          </Link>
        </li>
      </ul>

      {/* ── 4. Estatísticas ─────────────────────────────────────────────────── */}
      <h4 className="pa-nav-heading">4. Estatísticas</h4>
      <ul className="pa-nav-list">
        <li>
          <Link href="/admin/analytics" className="pa-nav-link">
            4.1. Monitoramento de Acessos
          </Link>
        </li>
      </ul>
    </div>
  )
}
