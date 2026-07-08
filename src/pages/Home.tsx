import { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
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
  const bannerRef = useRef<HTMLElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const { locale, t } = useLanguage();

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

  return (
    <main>
      {/* Sessão 01 — Hero Banner with Logo Carousel */}
      <Hero />

      {/* Sessão 02 — Introdução */}
      <Introduction />

      {/* Sessão 03 — Mid-page Banner */}
      <section 
        className={styles.middleBanner}
        data-node-id="29:881"
        aria-label="Próxima safra"
        ref={bannerRef}
      >
        <div className={styles.bannerBgWrapper} aria-hidden="true">
          <img
            src={imgSessao4}
            alt=""
            className={styles.bannerBg}
            ref={bannerImgRef}
          />
          <div className={styles.bannerOverlay} />
        </div>
        <div className={styles.bannerContent}>
          <p className={styles.bannerText} data-node-id="29:895">
            <AnimatedText key={`banner1-${locale}`} text={t.banner.text} type="word" delay={0} stagger={0.05} />
            <span className={styles.bannerTextAccent}>
              <AnimatedText key={`banner2-${locale}`} text={t.banner.accent} type="word" delay={0.4} stagger={0.05} />
            </span>
          </p>
        </div>
      </section>

      {/* Sessão 04 — Resultados / Stats */}
      <Stats />

      {/* Pilares Metodológicos */}
      <Methodology />

      {/* Atuação (Mapa) */}
      <Atuacao />

      {/* Carrossel de Parceria / Imagens */}
      <Parceria />

      {/* Depoimentos */}
      <Testimonials />
    </main>
  );
}
