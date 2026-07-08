import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import AnimatedText from '../../components/AnimatedText';
import styles from './QuemSomos.module.css';
import { useLanguage } from '../../i18n';

// Import images from assets
import { 
  imgBg, 
  imgImagem
} from '../../assets';

export default function QuemSomos() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { locale, t } = useLanguage();
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    if (timelineRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
      const progress = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      setScrollProgress(progress);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByAmount = (direction: 'next' | 'prev') => {
    if (timelineRef.current) {
      const gapValue = window.getComputedStyle(timelineRef.current).getPropertyValue('gap');
      const gap = parseInt(gapValue) || 85;
      const amount = timelineRef.current.clientWidth + gap;
      timelineRef.current.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
    }
  };

  return (
    <main className={`${styles.quemSomosPage} page-transition-enter`}>
      {/* Sessão 1 — Hero Banner */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <img src={imgBg} alt="Background da PA" className={styles.heroBg} />
        </div>
        
        {/* Scroll down button instead of back button */}
        <div className={styles.scrollDownWrapper}>
          <a href="#intro" className={styles.scrollDownButton} aria-label="Rolar para baixo">
            <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>arrow_downward</span>
          </a>
        </div>
      </section>

      {/* Sessão 2 — Nossa gente faz a diferença */}
      <section id="intro" className={styles.introSection}>
        <div className={styles.introContainer}>
          <div className={styles.introLeft}>
            <span className="tag-badge dark">
              {t.quemSomos.tag}
            </span>
            <h2 className={styles.introTitle}>
              {t.quemSomos.introTitle1} <br /><span className={styles.highlight}>{t.quemSomos.introHighlight}</span>
            </h2>
          </div>
          <div className={styles.introDescription}>
            <p dangerouslySetInnerHTML={{ __html: t.quemSomos.introP1 }} />
            <br />
            <p dangerouslySetInnerHTML={{ __html: t.quemSomos.introP2 }} />
          </div>
        </div>
      </section>

      {/* Sessão 3 — Valores / Cards */}
      <section className={styles.cardsSection}>
        {/* Card 1 */}
        <div className={`${styles.card} ${styles.cardDark}`}>
          <motion.span 
            className={`material-symbols-rounded ${styles.cardIcon}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            handshake
          </motion.span>
          <h3 className={styles.cardTitle}>
            <AnimatedText key={`comp-${locale}`} text={t.quemSomos.compromissoTitle} type="char" delay={0} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <p className={styles.cardText}>
            {t.quemSomos.compromissoText}
          </p>
        </div>

        {/* Card 2 */}
        <div className={`${styles.card} ${styles.cardLime}`}>
          <motion.span 
            className={`material-symbols-rounded ${styles.cardIcon}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            rocket_launch
          </motion.span>
          <h3 className={styles.cardTitleDark}>
            <AnimatedText key={`visao-${locale}`} text={t.quemSomos.visaoTitle} type="char" delay={0.2} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <p className={styles.cardTextDark}>
            {t.quemSomos.visaoText}
          </p>
        </div>

        {/* Card 3 */}
        <div className={`${styles.card} ${styles.cardLight}`}>
          <motion.span 
            className={`material-symbols-rounded ${styles.cardIcon}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            diamond
          </motion.span>
          <h3 className={styles.cardTitleGreen}>
            <AnimatedText key={`valores-${locale}`} text={t.quemSomos.valoresTitle} type="char" delay={0.4} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <p className={styles.cardTextGreen}>
            {t.quemSomos.valoresText}
          </p>
        </div>
      </section>

      {/* Sessão 4 — Vídeo Institucional */}
      <section className={styles.videoSection}>
        <div className={styles.videoContainer}>
          <div className={styles.videoHeader}>
            <span className="tag-badge dark">
              {t.quemSomos.institucionalTag}
            </span>
            <h2 className={styles.videoTitle}>
              <AnimatedText key={`vid1-${locale}`} text={t.quemSomos.videoTitle1} type="word" />
              <span className={styles.highlight}>
                <AnimatedText key={`vid2-${locale}`} text={t.quemSomos.videoTitle2} type="word" delay={0.1} />
              </span>
            </h2>
          </div>

          <div className={styles.videoPlayerWrapper}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/2Val9IbUWHk" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Sessão 5 — Nossa História (Timeline) */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineHeader}>
            <div>
              <span className="tag-badge dark">
                {t.quemSomos.timelineTag}
              </span>
              <h2 className={styles.timelineTitle}>
                <AnimatedText key={`hist-${locale}`} text={t.quemSomos.timelineTitle} type="word" />
              </h2>
            </div>
            <div className={`${styles.timelineControls} ${styles.desktopControls}`}>
              <button onClick={() => scrollByAmount('prev')} className={styles.controlBtn} aria-label="Voltar no tempo">
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <button onClick={() => scrollByAmount('next')} className={styles.controlBtn} aria-label="Avançar no tempo">
                <span className="material-symbols-rounded">chevron_right</span>
              </button>
            </div>
          </div>

          <div className={styles.timelineScroller}>
            {/* Mobile Controls absolute positioned next to the Year */}
            <div className={`${styles.timelineControls} ${styles.mobileControls}`}>
              <button onClick={() => scrollByAmount('prev')} className={styles.controlBtn} aria-label="Voltar no tempo">
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <button onClick={() => scrollByAmount('next')} className={styles.controlBtn} aria-label="Avançar no tempo">
                <span className="material-symbols-rounded">chevron_right</span>
              </button>
            </div>
            <div className={styles.timelineTrack}>
              <div 
                className={`${styles.timelineItems} ${isDragging ? styles.dragging : ''}`} 
                ref={timelineRef} 
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                data-lenis-prevent="true"
              >
                {t.quemSomos.timeline.map((item, idx) => (
                  <div key={idx} className={styles.timelineItemWrapper}>
                    <div className={styles.timelineLine}>
                      <span className="tag-badge light" style={{ background: '#e1fe00', border: 'none', color: '#002d22' }}>{item.tag}</span>
                    </div>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineYearWrapper}>
                        <span className={styles.timelineYear}>
                          <AnimatedText key={`year-${idx}-${locale}`} text={item.year} type="char" delay={0} stagger={0.05} once={false} />
                        </span>
                      </div>
                      <div className={styles.timelineContent}>
                        <p className={styles.timelineText}>{item.text}</p>
                        <div className={styles.timelineImageWrapper}>
                          <img src={imgImagem} alt={`História em ${item.year}`} className={styles.timelineImage} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator bar */}
            <div className={styles.scrollIndicatorWrapper}>
              <div className={styles.scrollIndicator}>
                <div 
                  className={styles.scrollIndicatorThumb} 
                  style={{ left: `calc(${scrollProgress * 100}% - ${scrollProgress * 67}px)` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
