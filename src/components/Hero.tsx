import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { imgProperty1Default } from '../assets';
import LogoCarousel from './LogoCarousel';
import AnimatedText from './AnimatedText';
import { useLanguage } from '../i18n';

import { Link } from 'react-router-dom';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { locale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !parallaxRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If hero is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalScrollDistance = windowHeight + rect.height;
        const currentScroll = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance));
        
        // Zoom from 1.0 to 1.15
        const scale = 1 + (progress * 0.15);
        parallaxRef.current.style.transform = `scale(${scale})`;
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
    handleScroll();

    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <section id="hero" className={styles.hero} data-node-id="34:1004" ref={heroRef}>
      {/* Background — Figma BgSessaoHero */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <div ref={parallaxRef} className={styles.parallaxWrapper}>
          <img
            src={imgProperty1Default}
            alt=""
            className={styles.bgImage}
          />
        </div>
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {/* Left column: Heading + CTA */}
          <div className={styles.leftCol}>
            {/* Title — Figma node 80:1652 / 80:1707 (text animation SVGs) */}
            {/* Rendered as styled text for the web */}
            <h1 className={styles.titleWrapper}>
              <span className={styles.titleLine1}>
                <AnimatedText key={`hero1-${locale}`} text={t.hero.line1} type="char" delay={0.6} stagger={0.02} sessionOnce={true} sessionKey={`heroHome1-${locale}`} />
              </span>
              <span className={styles.titleLine2}>
                <AnimatedText key={`hero2-${locale}`} text={t.hero.line2} type="char" delay={0.8} stagger={0.02} sessionOnce={true} sessionKey={`heroHome2-${locale}`} />
              </span>
              <span className={styles.titleLine3}>
                <AnimatedText key={`hero3-${locale}`} text={t.hero.line3} type="char" delay={1.0} stagger={0.02} sessionOnce={true} sessionKey={`heroHome3-${locale}`} />
              </span>
            </h1>

            {/* CTA Button — Figma BotaoNossasSolucoes node 54:74 */}
            {/* width: 222px, height: 60px, bg: #fdfdfd, icon: #e1fe00 */}
            <div className={styles.ctaWrapper}>
              <Link
                to="/servicos"
                className="btn-pa white"
                data-node-id="54:74"
              >
                <span className="btn-label">{t.hero.cta}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right column: Description text */}
          {/* Figma node 3:487: font-light, 20px, right aligned, top 436px */}
          <div className={styles.rightCol}>
            <p className={styles.description} data-node-id="3:487">
              {t.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Logo Carousel sits natively at the bottom of the Hero section */}
      <div className={styles.carouselWrapper}>
        <LogoCarousel />
      </div>
    </section>
  );
}
