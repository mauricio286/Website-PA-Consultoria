import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../../components/AnimatedText';
import styles from './Ecosystem.module.css';
import { 
  imgLavoura,
  imgEventos,
  imgCentroPesquisa,
  imgAldBioenergia
} from '../../../../assets';

export default function Ecosystem() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isGridVisible, setIsGridVisible] = useState(false);

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

  return (
    <section className={styles.ecosystemSection}>
      <div className={styles.ecosystemContainer}>
        <div className={styles.tagWrapperCenter}>
           <span className="tag-badge dark" style={{ borderColor: '#88a668', color: '#455336', backgroundColor: 'transparent' }}>
             nossa força no campo
           </span>
        </div>

        <h2 className={styles.ecosystemTitle}>
          <span className={styles.highlight}><AnimatedText text="Eco" type="word" /></span>
          <AnimatedText text="sistema" type="word" delay={0.1} />
        </h2>

        <div ref={gridRef} className={`${styles.ecosystemGrid} ${isGridVisible ? styles.animateEcosystem : ''}`} style={{ marginTop: '0px' }}>
          {/* SVG Lines Overlay (Desktop only ideally) */}
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

          {/* Cards do ecossistema */}
          <div className={styles.ecoCardsWrapper}>
             <div className={`${styles.ecoCard} ${styles.cardDarkGreen}`}>
               <div className={styles.ecoImageWrapper}>
                 <img src={imgAldBioenergia} alt="ALD Bioenergia" />
               </div>
               <h3 className={styles.ecoCardTitle}>ALD Bioenergia</h3>
               <div className={styles.ecoCardButton}>
                  <Link to="/aldbioenergia" className="btn-pa white">
                    <span className="btn-label">Ver mais</span>
                    <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
                  </Link>
               </div>
             </div>

             <div className={`${styles.ecoCard} ${styles.cardGreen}`}>
               <div className={styles.ecoImageWrapper}>
                 <img src={imgLavoura} alt="Lavoura" />
               </div>
               <h3 className={styles.ecoCardTitle}>Lavoura</h3>
               <div className={styles.ecoCardButton}>
                  <a href="#" className="btn-pa white">
                    <span className="btn-label">Ver mais</span>
                    <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
                  </a>
               </div>
             </div>

             <div className={`${styles.ecoCard} ${styles.cardDarkGreen}`}>
               <div className={styles.ecoImageWrapper}>
                 <img src={imgCentroPesquisa} alt="Centro de Pesquisa" />
               </div>
               <h3 className={styles.ecoCardTitle}>Centro de Pesquisa</h3>
               <div className={styles.ecoCardButton}>
                  <a href="#" className="btn-pa white">
                    <span className="btn-label">Ver mais</span>
                    <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
                  </a>
               </div>
             </div>

             <div className={`${styles.ecoCard} ${styles.cardGreen}`}>
               <div className={styles.ecoImageWrapper}>
                 <img src={imgEventos} alt="Eventos" />
               </div>
               <h3 className={styles.ecoCardTitle}>Eventos</h3>
               <div className={styles.ecoCardButton}>
                  <a href="#" className="btn-pa white">
                    <span className="btn-label">Ver mais</span>
                    <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
                  </a>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
