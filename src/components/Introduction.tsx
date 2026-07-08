import { useRef, useEffect } from 'react';
import styles from './Introduction.module.css';
import { imgIntroducao } from '../assets';
import { api } from '../services/api';
import type { HomePageData } from '../services/api';
import LexicalRenderer from './LexicalRenderer';
import { Link, useNavigate } from 'react-router-dom';

interface IntroductionProps {
  data?: HomePageData | null;
}

export default function Introduction({ data }: IntroductionProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let isHovering = false;
    let activationTimer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      // Direct DOM update — no React re-render, no framer-motion compositing layer
      wrapper.style.transform =
        `perspective(1200px) rotateX(${yPct * -5}deg) rotateY(${xPct * 5}deg)`;
    };

    const handleMouseEnter = () => {
      // 200ms delay before effect activates
      activationTimer = setTimeout(() => { isHovering = true; }, 200);
    };

    const handleMouseLeave = () => {
      clearTimeout(activationTimer);
      isHovering = false;
      // CSS transition handles the smooth return to flat
      wrapper.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(activationTimer);
    };
  }, []);

  // Dados do CMS ou fallbacks
  const badgeTitle = data?.introTitle || 'Introdução';
  
  const hasRichText = data?.introText && data.introText.root && data.introText.root.children && data.introText.root.children.length > 0;
  
  const rightImageSrc = api.getMediaUrl(data?.introImage) || imgIntroducao;
  const rightImageAlt = (data?.introImage && typeof data.introImage === 'object') ? data.introImage.alt : "Introdução";

  const ctaLabel = data?.introCtaLabel || 'Ver mais';
  const ctaUrl = data?.introCtaUrl || '/quem-somos';
  const isHash = ctaUrl.startsWith('#');

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

  return (
    <section id="intro" className={styles.intro} data-node-id="16:522">
      <div className={styles.container}>
        {/* Left — text and button */}
        <div className={styles.leftCol} data-node-id="16:526">
          <span className="tag-badge dark" data-node-id="16:523">
            {badgeTitle}
          </span>

          {/* Main paragraph — Layout */}
          <div className={styles.mainText} data-node-id="16:525">
            {hasRichText ? (
              <LexicalRenderer content={data.introText} />
            ) : (
              <p>
                No campo, resultado não acontece por acaso. Ele nasce de experiência, estratégia e decisões bem tomadas. Há mais de 20 anos, o Grupo PA caminha ao lado do produtor rural, unindo consultoria técnica, agricultura de precisão e gestão para transformar conhecimento em produtividade.
              </p>
            )}
          </div>

          <div className={styles.btnWrapper} data-node-id="27:878">
            {isHash ? (
              <a
                href={ctaUrl}
                onClick={handleCtaClick}
                className="btn-pa dark-green"
              >
                <span className="btn-label">{ctaLabel}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
                </span>
              </a>
            ) : (
              <Link to={ctaUrl} className="btn-pa dark-green" data-node-id="54:105">
                <span className="btn-label">{ctaLabel}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Right — Image with CSS-native 3D effect */}
        <div
          className={styles.rightCol}
          ref={containerRef}
          data-node-id="122:1934"
        >
          <div ref={wrapperRef} className={styles.imageWrapper3D}>
            <div className={styles.imageScaler}>
              <img
                src={rightImageSrc}
                alt={rightImageAlt}
                className={styles.image}
                data-node-id="677:894"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
