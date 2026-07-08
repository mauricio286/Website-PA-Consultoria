import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../../components/AnimatedText';
import styles from './Ecosystem.module.css';
import { api, type ServicesPageData } from '../../../../services/api';
import { 
  imgLavoura,
  imgEventos,
  imgCentroPesquisa,
  imgAldBioenergia
} from '../../../../assets';
import { useLanguage } from '../../../../i18n';

interface EcosystemProps {
  data?: ServicesPageData | null;
}

export default function Ecosystem({ data }: EcosystemProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const { locale, t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const badge = data?.ecosystemBadge || t.servicos.ecosistemaTag;
  const titleNormal = data?.ecosystemTitle || t.servicos.ecosistemaTitle2;
  const titleAccent = data?.ecosystemSubtitle || t.servicos.ecosistemaTitle1;

  const staticCards = [
    {
      title: t.servicos.aldBioenergia || "ALD Bioenergia",
      image: imgAldBioenergia,
      link: "/aldbioenergia",
    },
    {
      title: t.servicos.lavoura || "Lavoura",
      image: imgLavoura,
      link: "/lavoura",
    },
    {
      title: t.servicos.centroPesquisa || "Centro de Pesquisa",
      image: imgCentroPesquisa,
      link: "/centropesquisa",
    },
    {
      title: t.servicos.palestrasEventos || "Palestras e Eventos",
      image: imgEventos,
      link: "/palestras",
    },
  ];

  const cardsToRender = data?.ecosystemCards && data.ecosystemCards.length > 0
    ? data.ecosystemCards
    : staticCards;

  return (
    <section className={styles.ecosystemSection}>
      <div className={styles.ecosystemContainer}>
        <div className={styles.tagWrapperCenter}>
          <span className="tag-badge dark" style={{ borderColor: '#88a668', color: '#455336', backgroundColor: 'transparent' }}>
            {badge}
          </span>
        </div>

        <h2 className={styles.ecosystemTitle}>
          {titleAccent && (
            <span className={styles.highlight}>
              <AnimatedText key={`eco1-${locale}-${titleAccent}`} text={titleAccent} type="word" />
              {" "}
            </span>
          )}
          {titleNormal && (
            <AnimatedText key={`eco2-${locale}-${titleNormal}`} text={titleNormal} type="word" delay={titleAccent ? 0.1 : 0} />
          )}
        </h2>

        <div ref={gridRef} className={`${styles.ecosystemGrid} ${isGridVisible ? styles.animateEcosystem : ''}`} style={{ marginTop: '0px' }}>
          {/* SVG Lines Overlay (Desktop only) */}
          <div className={styles.svgOverlay}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* To Card 1 */}
              <path pathLength="100" d="M 50 5 C 50 40, 12.5 40, 12.5 72" stroke="#E2E2E2" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
              {/* To Card 2 */}
              <path pathLength="100" d="M 50 5 C 50 40, 37.5 40, 37.5 72" stroke="#E2E2E2" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
              {/* To Card 3 */}
              <path pathLength="100" d="M 50 5 C 50 40, 62.5 40, 62.5 72" stroke="#E2E2E2" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
              {/* To Card 4 */}
              <path pathLength="100" d="M 50 5 C 50 40, 87.5 40, 87.5 72" stroke="#E2E2E2" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Circle Markers */}
            <div className={styles.circleMarker} style={{ left: '50%', top: '0%' }} />
            <div className={styles.circleMarker} style={{ left: '12.5%', top: '80%' }} />
            <div className={styles.circleMarker} style={{ left: '37.5%', top: '80%' }} />
            <div className={styles.circleMarker} style={{ left: '62.5%', top: '80%' }} />
            <div className={styles.circleMarker} style={{ left: '87.5%', top: '80%' }} />
          </div>

          {/* Ecosystem Cards */}
          <div className={styles.ecoCardsWrapper}>
            {cardsToRender.map((card: any, idx: number) => {
              const isEven = idx % 2 === 0;
              const cardClass = isEven ? styles.cardDarkGreen : styles.cardGreen;
              
              let imgSource = "";
              if (card.image && typeof card.image === 'object' && 'url' in card.image) {
                imgSource = api.getMediaUrl(card.image);
              } else if (typeof card.image === 'string' && card.image) {
                imgSource = api.getMediaUrl(card.image);
              } else {
                imgSource = staticCards[idx]?.image || "";
              }

              const isExternal = card.link?.startsWith('http') || card.link?.startsWith('www');
              const linkUrl = card.link?.startsWith('www') ? `https://${card.link}` : (card.link || '#');

              return (
                <div key={card.id || idx} className={`${styles.ecoCard} ${cardClass}`}>
                  <div className={styles.ecoImageWrapper}>
                    <img src={imgSource} alt={card.title} />
                  </div>
                  <h3 className={styles.ecoCardTitle}>{card.title}</h3>
                  <div className={styles.ecoCardButton}>
                    {isExternal ? (
                      <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="btn-pa white">
                        <span className="btn-label">{t.common?.verMais || 'Ver mais'}</span>
                        <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
                      </a>
                    ) : (
                      <Link to={linkUrl} className="btn-pa white">
                        <span className="btn-label">{t.common?.verMais || 'Ver mais'}</span>
                        <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
