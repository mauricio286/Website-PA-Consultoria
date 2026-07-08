import { useEffect, useRef, useState, useMemo } from 'react';
import AnimatedText from '../../components/AnimatedText';
import styles from './QuemSomos.module.css';
import { api } from '../../services/api';
import type { AboutPageData } from '../../services/api';
import LexicalRenderer from '../../components/LexicalRenderer';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n';

// Import images from assets
import { 
  imgBg, 
  imgImagem
} from '../../assets';

// Helper to convert YouTube links (standard or short share urls) to the required embed format
function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return "https://www.youtube.com/embed/2Val9IbUWHk";
  const trimmed = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  if (trimmed.length === 11) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }
  return trimmed;
}

export default function QuemSomos() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { locale, t } = useLanguage();
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);

  // Ensure we start at the top of the page when navigating here and fetch CMS data
  useEffect(() => {
    window.scrollTo(0, 0);
    api.getAboutPage(locale)
      .then((res) => {
        setAboutData(res);
      })
      .catch((err) => {
        console.error('Error fetching AboutPage data:', err);
      });
  }, [locale]);

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

  const videoMainTitle = aboutData?.videoSectionTitle || t.quemSomos.videoTitle1 || "Vídeo";
  const videoHighlightTitle = aboutData?.videoSectionTitleAccent || t.quemSomos.videoTitle2 || "Institucional";

  const staticTimelineItems = useMemo(() => [
    { tag: t.quemSomos.timeline[0]?.tag || "o início", year: "1993", text: t.quemSomos.timeline[0]?.text || "O Grupo PA teve o início de sua história...", image: imgImagem },
    { tag: t.quemSomos.timeline[1]?.tag || "consultoria", year: "2002", text: t.quemSomos.timeline[1]?.text || "No ano de 2002, nosso fundador Paulo Asunção...", image: imgImagem },
    { tag: t.quemSomos.timeline[2]?.tag || "tecnologia", year: "2009", text: t.quemSomos.timeline[2]?.text || "Em 2009, a PA Consultoria passou a disponibilizar...", image: imgImagem },
    { tag: t.quemSomos.timeline[3]?.tag || "pesquisa", year: "2011", text: t.quemSomos.timeline[3]?.text || "Iniciamos os trabalhos de Pesquisa Agronômica...", image: imgImagem },
    { tag: t.quemSomos.timeline[4]?.tag || "evento", year: "2013", text: t.quemSomos.timeline[4]?.text || "A PA Pesquisa realizou seu primeiro dia de campo...", image: imgImagem },
    { tag: t.quemSomos.timeline[5]?.tag || "novas culturas", year: "2023", text: t.quemSomos.timeline[5]?.text || "A PA Consultoria passou a atender a cultura...", image: imgImagem },
    { tag: t.quemSomos.timeline[6]?.tag || "expansão", year: "2024", text: t.quemSomos.timeline[6]?.text || "Comprometidos com nossa missão em contribuir...", image: imgImagem },
    { tag: t.quemSomos.timeline[7]?.tag || "investimento", year: "2026", text: t.quemSomos.timeline[7]?.text || "O Grupo PA segue investindo no agro...", image: imgImagem }
  ], [t]);

  const timelineItemsToRender = useMemo(() => {
    return aboutData?.timeline && aboutData.timeline.length > 0
      ? aboutData.timeline.map((item) => ({
          tag: item.tag,
          year: item.year,
          textNode: <div className={styles.timelineText}><LexicalRenderer content={item.text} /></div>,
          imageSrc: api.getMediaUrl(item.image) || imgImagem,
        }))
      : staticTimelineItems.map((item) => ({
          tag: item.tag,
          year: item.year,
          textNode: <p className={styles.timelineText}>{item.text}</p>,
          imageSrc: item.image,
        }));
  }, [aboutData, staticTimelineItems]);

  return (
    <main className={`${styles.quemSomosPage} page-transition-enter`}>
      {/* Sessão 1 — Hero Banner */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <picture>
            {aboutData?.heroImageMobile && <source media="(max-width: 580px)" srcSet={api.getMediaUrl(aboutData.heroImageMobile)} />}
            {aboutData?.heroImageTablet && <source media="(max-width: 1024px)" srcSet={api.getMediaUrl(aboutData.heroImageTablet)} />}
            <img src={api.getMediaUrl(aboutData?.heroImage) || imgBg} alt="Background da PA" className={styles.heroBg} />
          </picture>
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
              {aboutData?.introTag || t.quemSomos.tag}
            </span>
            <h2 className={styles.introTitle} style={{ whiteSpace: 'pre-line' }}>
              {aboutData?.title || t.quemSomos.introTitle1}
              {(aboutData?.subtitle || t.quemSomos.introHighlight) && (
                <>
                  <br />
                  <span className={styles.highlight}>
                    {aboutData?.subtitle || t.quemSomos.introHighlight}
                  </span>
                </>
              )}
            </h2>
          </div>
          <div className={styles.introDescription}>
            {aboutData?.introText ? (
              <LexicalRenderer content={aboutData.introText} />
            ) : (
              <>
                <p dangerouslySetInnerHTML={{ __html: t.quemSomos.introP1 }} />
                <br />
                <p dangerouslySetInnerHTML={{ __html: t.quemSomos.introP2 }} />
              </>
            )}
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
            <AnimatedText key={`comp-${locale}`} text={aboutData?.commitment?.title || t.quemSomos.compromissoTitle} type="char" delay={0} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <div className={styles.cardText}>
            {aboutData?.commitment?.text ? (
              <LexicalRenderer content={aboutData.commitment.text} />
            ) : (
              <p>{t.quemSomos.compromissoText}</p>
            )}
          </div>
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
            <AnimatedText key={`visao-${locale}`} text={aboutData?.vision?.title || t.quemSomos.visaoTitle} type="char" delay={0.2} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <div className={styles.cardTextDark}>
            {aboutData?.vision?.text ? (
              <LexicalRenderer content={aboutData.vision.text} />
            ) : (
              <p>{t.quemSomos.visaoText}</p>
            )}
          </div>
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
            <AnimatedText key={`valores-${locale}`} text={aboutData?.values?.title || t.quemSomos.valoresTitle} type="char" delay={0.4} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <div className={styles.cardTextGreen}>
            {aboutData?.values?.text ? (
              <LexicalRenderer content={aboutData.values.text} />
            ) : (
              <p>{t.quemSomos.valoresText}</p>
            )}
          </div>
        </div>
      </section>

      {/* Sessão 4 — Vídeo Institucional */}
      <section className={styles.videoSection}>
        <div className={styles.videoContainer}>
          <div className={styles.videoHeader}>
            <span className="tag-badge dark">
              {aboutData?.videoSectionTag || t.quemSomos.institucionalTag}
            </span>
            <h2 className={styles.videoTitle}>
              <AnimatedText key={`vid1-${locale}-${videoMainTitle}`} text={videoMainTitle} type="word" />
              {videoMainTitle && videoHighlightTitle && ' '}
              {videoHighlightTitle && (
                <span className={styles.highlight}>
                  <AnimatedText key={`vid2-${locale}-${videoHighlightTitle}`} text={videoHighlightTitle} type="word" delay={0.1} />
                </span>
              )}
            </h2>
          </div>

          <div className={styles.videoPlayerWrapper}>
            <iframe 
              width="100%" 
              height="100%" 
              src={getYouTubeEmbedUrl(aboutData?.institutionalVideoUrl)} 
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
                {aboutData?.timelineTag || t.quemSomos.timelineTag}
              </span>
              <h2 className={styles.timelineTitle}>
                <AnimatedText key={`hist-${locale}-${aboutData?.timelineTitle}`} text={aboutData?.timelineTitle || t.quemSomos.timelineTitle} type="word" />
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
                {timelineItemsToRender.map((item, idx) => (
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
                        {item.textNode}
                        <div className={styles.timelineImageWrapper}>
                          <img src={item.imageSrc} alt={`História em ${item.year}`} className={styles.timelineImage} />
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
