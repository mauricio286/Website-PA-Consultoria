import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { imgLogoPa } from '../assets';
import { api, type FooterSettingsData } from '../services/api';
import { useLanguage } from '../i18n';

// Standard inline SVGs for perfectly scaled and colored icons
const IconLinkedIn = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const IconInstagram = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const IconFacebook = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IconYouTube = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const { locale, t } = useLanguage();
  const [footerData, setFooterData] = useState<FooterSettingsData | null>(null);

  useEffect(() => {
    api.getFooterSettings(locale)
      .then(res => setFooterData(res))
      .catch(err => console.error('Erro ao carregar rodapé:', err));
  }, [locale]);

  const staticAddresses = [
    {
      label: t.footer.matrizTangara || "Matriz Tangará",
      text: "Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra - MT, 78306-157",
      mapsUrl: "https://www.google.com/maps/place/-14.6335131,-57.5054472"
    },
    {
      label: t.footer.filialDiamantino || "Filial Diamantino",
      text: "Rod. BR-364, KM 724 + 15Km à direita - Zona Rural, Diamantino - MT, 78304-000",
      mapsUrl: "https://www.google.com/maps/place/-14.053104768419136,-57.302202616270456"
    }
  ];

  const addressesToRender = footerData?.addresses && footerData.addresses.length > 0
    ? footerData.addresses
    : staticAddresses;

  return (
    <footer id="contact" className={styles.footer} data-node-id="36:1511">
      <div className={styles.container} data-node-id="36:1775">
        {/* Left Column: Logo, Social Icons, and Addresses */}
        <div className={styles.infoCol} data-node-id="36:1776">
          <div className={styles.logoWrapper} data-node-id="36:1540">
            <a href="#hero">
              <img src={imgLogoPa} alt="PA Logo" className={styles.logo} data-node-id="36:1525" />
            </a>
          </div>

          {/* Social Icons List */}
          <div className={styles.socials} data-node-id="36:1759">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <IconLinkedIn />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              <IconInstagram />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              <IconFacebook />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
              <IconYouTube />
            </a>
          </div>

          {/* Addresses with maps links */}
          <div className={styles.addresses} data-node-id="36:1599">
            {addressesToRender.map((addr, idx) => (
              <a 
                key={idx}
                className={styles.addressLink} 
                href={addr.mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <strong>{addr.label}:</strong> {addr.text}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Footer Navigation Menu */}
        <div className={styles.navCol}>
          <div className={styles.footerNavGroup}>
            <span className={styles.navGroupTitle}>{t.footer.institucional}</span>
            <Link to="/#hero" className={styles.navLink}>{t.header.home}</Link>
            <Link to="/quem-somos" className={styles.navLink}>{t.header.quemSomos}</Link>
            <Link to="/carreiras" className={styles.navLink}>{t.header.carreiras}</Link>
            <Link to="/contato" className={styles.navLink}>{t.header.contato}</Link>
          </div>
          
          <div className={styles.footerNavGroup}>
            <Link to="/servicos" className={styles.navGroupTitleLink}>{t.footer.servicos}</Link>
            <Link to="/consultoriaagronomica" className={styles.navLink}>{t.footer.consultoriaAgronomica}</Link>
            <Link to="/unita" className={styles.navLink}>{t.footer.unita}</Link>
            <Link to="/agriculturaprecisao" className={styles.navLink}>{t.footer.agriculturaPrecisao}</Link>
            <Link to="/gestaocompras" className={styles.navLink}>{t.footer.gestaoCompras}</Link>
          </div>

          <div className={styles.footerNavGroup}>
            <Link to="/servicos#ecossistema" className={styles.navGroupTitleLink}>{t.footer.ecossistema}</Link>
            <Link to="/aldbioenergia" className={styles.navLink}>{t.footer.aldBioenergia}</Link>
            <Link to="/lavoura" className={styles.navLink}>{t.footer.lavoura}</Link>
            <Link to="/centrodepesquisa" className={styles.navLink}>{t.footer.centroPesquisa}</Link>
            <Link to="/eventos" className={styles.navLink}>{t.footer.eventos}</Link>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar} data-node-id="36:1556">
        <p className={styles.copyrightText} data-node-id="36:1571">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
        <p className={styles.studioText}>
          {t.footer.studio}
        </p>
      </div>
    </footer>
  );
}
