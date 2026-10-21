import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { imgProperty1Default } from '../assets';
import LogoCarousel from './LogoCarousel';
import AnimatedText from './AnimatedText';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { HomePageData } from '../services/api';
import { useLanguage } from '../i18n';

import MediaContainer from './MediaContainer';

interface HeroProps {
  data?: HomePageData | null;
}

export default function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { locale, t } = useLanguage();

  // Computação dos dados dinâmicos do CMS ou fallbacks
  const heroMediaType = data?.heroMediaType || 'upload';
  const heroVimeoUrl = data?.heroVimeoUrl;
  const heroVimeoUrlTablet = data?.heroVimeoUrlTablet;
  const heroVimeoUrlMobile = data?.heroVimeoUrlMobile;
  const heroOverlayType = data?.heroOverlayType || 'solid';
  const heroOverlayOpacity = typeof data?.heroOverlayOpacity === 'number' ? data.heroOverlayOpacity : 50;
  const heroVideoPositionMobile = data?.heroVideoPositionMobile || 'center';
  const heroMobileHeightMode = data?.heroMobileHeightMode || 'fullscreen';
  const heroDisableEntranceAnimation = !!data?.heroDisableEntranceAnimation;

  const bgImageUrl = api.getMediaUrl(data?.heroImage) || imgProperty1Default;
  const subtitle = data?.heroSubtitle || t.hero.description;
  const ctaLabel = data?.heroCtaLabel || t.hero.cta;
  const ctaUrl = data?.heroCtaUrl || "/servicos";
  const isHash = ctaUrl.startsWith('#');

  // Cálculo dinâmico do overlay (película sobre o vídeo/imagem)
  let overlayStyle: React.CSSProperties = {};
  if (heroOverlayType === 'none' || heroOverlayOpacity === 0) {
    overlayStyle = { display: 'none' };
  } else if (heroOverlayType === 'gradient') {
    const alpha = heroOverlayOpacity / 100;
    overlayStyle = {
      background: `linear-gradient(to right, rgba(0, 0, 0, ${alpha}) 0%, rgba(0, 0, 0, ${alpha * 0.4}) 55%, transparent 100%), linear-gradient(to top, rgba(0, 0, 0, ${alpha * 0.8}) 0%, transparent 40%)`,
    };
  } else {
    // 'solid'
    const alpha = heroOverlayOpacity / 100;
    overlayStyle = {
      backgroundColor: `rgba(0, 0, 0, ${alpha})`,
    };
  }

  // Smart CTA handler: scroll if anchor exists on page, otherwise navigate to route
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(ctaUrl);
    if (target) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(ctaUrl, { offset: -50 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Anchor not found on this page — treat the hash as a route
      navigate(ctaUrl.replace(/^#/, '/'));
    }
  };

  // Dividir o título pelas quebras de linha definidas no CMS (\n)
  // Respeita exatamente o que foi digitado no painel de administração
  let lines = [t.hero.line1, t.hero.line2, t.hero.line3].filter(Boolean);

  if (data?.heroTitle) {
    lines = data.heroTitle.split('\n').map((l: string) => l.trim()).filter(Boolean);
  }

  useEffect(() => {
    if (heroDisableEntranceAnimation) {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = 'none';
      }
      return;
    }

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
  }, [heroDisableEntranceAnimation]);

  return (
    <section 
      id="hero" 
      className={`${styles.hero} ${heroMobileHeightMode === 'proportional' ? styles.proportionalHeight : ''}`} 
      data-node-id="34:1004" 
      ref={heroRef}
    >
      {/* Background — Design BgSessaoHero */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <div ref={parallaxRef} className={styles.parallaxWrapper}>
          <MediaContainer
            mediaType={heroMediaType}
            vimeoUrl={heroVimeoUrl}
            vimeoUrlTablet={heroVimeoUrlTablet}
            vimeoUrlMobile={heroVimeoUrlMobile}
            objectPositionMobile={heroVideoPositionMobile}
            media={data?.heroImage || bgImageUrl}
            mediaTablet={data?.heroImageTablet}
            mediaMobile={data?.heroImageMobile}
            defaultFallbackSrc={imgProperty1Default}
            alt={(data?.heroImage && typeof data.heroImage === 'object') ? data.heroImage.alt : "Background Hero"}
            className={styles.bgImage}
            fitMode="cover"
            size="hero"
          />
        </div>
        <div className={styles.overlay} style={overlayStyle} />
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {/* Top Row: Title on the left, Subtitle on the right */}
          <div className={styles.titleDescRow}>
            {/* Title — Layout / 80:1707 (text animation SVGs) */}
            <h1 className={styles.titleWrapper}>
              {lines.map((line, i) => (
                <span 
                  key={i} 
                  className={styles[`titleLine${i + 1}`] || styles.titleLine}
                >
                  <AnimatedText 
                    key={`heroLine-${i}-${locale}-${line}`}
                    text={line} 
                    type="char" 
                    delay={0.6 + i * 0.2} 
                    stagger={0.02} 
                    sessionOnce={true} 
                    sessionKey={`heroHomeLine-${i}-${locale}-${line}`} 
                  />
                </span>
              ))}
            </h1>

            {/* Right column: Description text */}
            <div className={styles.rightCol}>
              <p 
                className={styles.description} 
                data-node-id="3:487"
                style={{ whiteSpace: 'pre-line' }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          {/* Bottom Row: CTA Button */}
          <div className={styles.ctaWrapper}>
            {isHash ? (
              <a
                href={ctaUrl}
                onClick={handleCtaClick}
                className="btn-pa white"
              >
                <span className="btn-label">{ctaLabel}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded notranslate" translate="no" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
                </span>
              </a>
            ) : (
              <Link
                to={ctaUrl}
                className="btn-pa white"
                data-node-id="54:74"
              >
                <span className="btn-label">{ctaLabel}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded notranslate" translate="no" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Logo Carousel sits natively at the bottom of the Hero section */}
      <div className={styles.carouselWrapper}>
        <LogoCarousel logos={data?.heroLogos} />
      </div>
    </section>
  );
}
