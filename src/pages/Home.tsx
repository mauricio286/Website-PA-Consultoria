import { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import { api } from '../services/api';
import type { HomePageData } from '../services/api';
import Introduction from '../components/Introduction';
import Stats from '../components/Stats';
import Methodology from '../components/Methodology';
import Atuacao from '../components/Atuacao';
import Parceria from '../components/Parceria';
import Testimonials from '../components/Testimonials';
import AnimatedText from '../components/AnimatedText';
import { useLanguage } from '../i18n';

import { imgSessao4 } from '../assets';
import styles from '../App.module.css';

export default function Home() {
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const { locale, t } = useLanguage();

  useEffect(() => {
    api.getHomePage(locale)
      .then((res) => {
        setHomeData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [locale]);

  useEffect(() => {
    // Banner Parallax (Zoom suave com delay)
    const handleScroll = () => {
      if (!bannerRef.current || !bannerImgRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If banner is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Progress goes from 0 (entered bottom) to 1 (leaves top)
        const totalScrollDistance = windowHeight + rect.height;
        const currentScroll = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance));
        
        // Zoom from 1.0 to 1.15 for a very subtle effect
        const scale = 1 + (progress * 0.15);
        bannerImgRef.current.style.transform = `scale(${scale})`;
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    handleScroll(); // Initial execution

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  // Banner central — CMS or static fallback
  const bannerText = homeData?.bannerText || t.banner.text;
  const bannerTextAccent = homeData?.bannerTextAccent || t.banner.accent;
  const bannerBgSrc = api.getMediaUrl(homeData?.bannerImage) || imgSessao4;

  // Split banner text by lines to support enter-based wrapping properly
  const bannerTextLines = bannerText.split('\n').map(l => l.trim()).filter(Boolean);
  const bannerAccentLines = bannerTextAccent.split('\n').map(l => l.trim()).filter(Boolean);

  return (
    <main>
      {/* Sessão 01 — Hero Banner with Logo Carousel */}
      <Hero data={homeData} />

      {/* Sessão 02 — Introdução */}
      <Introduction data={homeData} />

      {/* Sessão 03 — Mid-page Banner */}
      <section 
        className={styles.middleBanner}
        data-node-id="29:891"
        aria-label="Próxima safra"
        ref={bannerRef}
      >
        <div className={styles.bannerBgWrapper} aria-hidden="true">
          <img
            src={bannerBgSrc}
            alt=""
            className={styles.bannerBg}
            ref={bannerImgRef}
          />
          <div className={styles.bannerOverlay} />
        </div>
        <div className={styles.bannerContent}>
          <div 
            className={styles.bannerText} 
            data-node-id="29:895"
            style={{ textAlign: homeData?.bannerTextAlign || 'center' }}
          >
            {/* Renderizar todas as linhas do texto normal exceto a última */}
            {bannerTextLines.slice(0, -1).map((line, i) => (
              <span key={`banner-line-${i}`} style={{ display: 'block', width: '100%' }}>
                <AnimatedText key={`banner1-line-${i}-${locale}-${line}`} text={line} type="word" delay={0} stagger={0.05} />
              </span>
            ))}
            
            {/* Renderizar a última linha do texto normal inline com a primeira linha do destaque */}
            <span style={{ display: 'block', width: '100%' }}>
              {bannerTextLines.length > 0 && (
                <AnimatedText 
                  key={`banner1-last-${locale}-${bannerTextLines[bannerTextLines.length - 1]}`} 
                  text={bannerTextLines[bannerTextLines.length - 1]} 
                  type="word" 
                  delay={0} 
                  stagger={0.05} 
                />
              )}
              {bannerTextLines.length > 0 && bannerAccentLines.length > 0 && ' '}
              <span className={styles.bannerTextAccent}>
                {bannerAccentLines.length > 0 && (
                  <AnimatedText 
                    key={`banner2-first-${locale}-${bannerAccentLines[0]}`} 
                    text={bannerAccentLines[0]} 
                    type="word" 
                    delay={0.3} 
                    stagger={0.05} 
                  />
                )}
              </span>
            </span>

            {/* Renderizar quaisquer outras linhas do texto em destaque */}
            {bannerAccentLines.slice(1).map((line, i) => (
              <span key={`banner-accent-line-${i}`} style={{ display: 'block', width: '100%' }} className={styles.bannerTextAccent}>
                <AnimatedText key={`banner2-line-${i}-${locale}-${line}`} text={line} type="word" delay={0.4 + i * 0.1} stagger={0.05} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sessão 04 — Resultados / Stats */}
      <Stats data={homeData} />

      {/* Pilares Metodológicos */}
      <Methodology data={homeData} />

      {/* Atuação (Mapa) */}
      <Atuacao data={homeData} />

      {/* Carrossel de Parceria / Imagens */}
      <Parceria data={homeData} />
      
      {/* Depoimentos */}
      <Testimonials data={homeData} />
    </main>
  );
}
