import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../i18n';
import { api, type EventsPageData } from '../../services/api';
import AnimatedText from '../../components/AnimatedText';
import { EVENTS_DEFAULTS } from './eventosDefaults';
import styles from './Eventos.module.css';

// ─── Imagens padrão (mesmas do modelo) — usadas quando o CMS não tem foto ───
const IMG = {
  hero: '/eventos/hero.webp',
  lavoura: '/eventos/lavoura.webp',
  centro: '/eventos/centro-pesquisa.webp',
  consultoria: '/eventos/consultoria.webp',
  precisao: '/eventos/precisao.webp',
  g1: '/eventos/galeria-1.webp',
  g2: '/eventos/galeria-2.webp',
  g3: '/eventos/galeria-3.webp',
  g4: '/eventos/galeria-4.webp',
};
const UNIVERSE_IMGS = [IMG.lavoura, IMG.precisao, IMG.consultoria];
const STEP_IMGS = [IMG.hero, IMG.consultoria, IMG.centro, IMG.lavoura];
const GALLERIES = [
  [IMG.hero, IMG.centro, IMG.g1, IMG.consultoria],
  [IMG.centro, IMG.hero, IMG.g2, IMG.precisao],
  [IMG.consultoria, IMG.g3, IMG.lavoura, IMG.hero],
  [IMG.lavoura, IMG.g4, IMG.centro, IMG.hero],
];
const DEFAULT_LOGOS = [
  { src: '/eventos/syngenta.png', alt: 'Syngenta', cls: styles.logoSyngenta },
  { src: '/eventos/corteva.svg', alt: 'Corteva', cls: styles.logoCorteva },
  { src: '/eventos/basf.png', alt: 'BASF', cls: styles.logoBasf },
  { src: '/eventos/bayer.png', alt: 'Bayer', cls: styles.logoBayer },
];

type Img = Parameters<typeof api.getMediaUrl>[0];

/** Texto do CMS (se preenchido) ou o padrão do modelo. */
const txt = (cms: string | undefined | null, fallback: string | undefined): string =>
  cms && cms.trim() ? cms : fallback || '';

/** Lista do CMS (se tiver itens) ou a padrão. */
const list = <T,>(cms: T[] | undefined | null, fallback: T[] | undefined): T[] =>
  cms && cms.length > 0 ? cms : fallback || [];

export default function Eventos() {
  const { locale } = useLanguage();

  // Frame 0: dados estáticos do build (SWR). Revalida em segundo plano contra o CMS.
  const [data, setData] = useState<EventsPageData>(() => {
    const staticData = api.getStaticData(locale);
    return staticData?.globals?.['events-page'] || {};
  });

  useEffect(() => {
    let alive = true;
    const apply = (fresh?: EventsPageData | null) => {
      if (alive && fresh) setData(fresh);
    };
    api.getEventsPage(locale, apply).then(apply);
    return () => {
      alive = false;
    };
  }, [locale]);

  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [activeUniverse, setActiveUniverse] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax do hero (zoom suave conforme a rolagem)
  useEffect(() => {
    const update = () => {
      if (!heroRef.current || !parallaxRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        const total = vh + rect.height;
        const done = vh - rect.top;
        const scale = 1 + Math.max(0, Math.min(1, done / total)) * 0.12;
        parallaxRef.current.style.transform = `scale(${scale})`;
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo(target, { offset: -40 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeGallery = useCallback(() => setLightbox(null), []);

  // Galeria: teclado (Esc, ← e →)
  const galleryLen = useCallback(
    (idx: number | null) => {
      if (idx === null) return 0;
      const ev = data.pastEvents?.[idx];
      const own = (ev?.gallery || []).map((g) => api.getMediaUrl(g.image, 'hero')).filter(Boolean);
      return own.length || GALLERIES[idx % GALLERIES.length].length;
    },
    [data.pastEvents],
  );

  const stepPhoto = useCallback(
    (dir: number) => {
      if (lightbox === null) return;
      const len = galleryLen(lightbox);
      if (!len) return;
      setPhotoIndex((p) => (p + dir + len) % len);
    },
    [lightbox, galleryLen],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') stepPhoto(1);
      if (e.key === 'ArrowLeft') stepPhoto(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeGallery, stepPhoto]);

  // ─── Evento desativado no CMS ───
  if (data.enabled !== true) {
    return (
      <main className={styles.disabledPage}>
        <div className={styles.disabledCard}>
          <svg className={styles.disabledIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <h1 className={styles.disabledTitle}>
            {locale === 'en' ? 'No Active Events' : 'Nenhum Evento no Momento'}
          </h1>
          <p className={styles.disabledText}>
            {locale === 'en'
              ? 'Stay tuned to our social networks for news on upcoming dates and editions.'
              : 'Fique atento às nossas redes sociais para novidades sobre próximas datas e edições.'}
          </p>
          <Link to="/" className="btn-pa dark-green">
            <span className="btn-label">{locale === 'en' ? 'Back to Home' : 'Voltar ao Início'}</span>
            <span className="btn-icon">
              <span className="material-symbols-rounded">arrow_back</span>
            </span>
          </Link>
        </div>
      </main>
    );
  }

  // ─── Conteúdo: CMS com fallback para o padrão do modelo ───
  const D = EVENTS_DEFAULTS[locale === 'en' ? 'en' : 'pt'];

  const heroTitle1 = txt(data.heroTitleLine1, D.heroTitleLine1);
  const heroTitle2 = txt(data.heroTitleLine2, D.heroTitleLine2);
  const heroImg = api.getMediaUrl(data.heroImage, 'hero') || IMG.hero;

  const stats = list(data.highlightsStats, D.highlightsStats);
  const infoItems = list(data.infoItems, D.infoItems);
  const universes = list(data.universes, D.universes);
  const steps = list(data.experienceSteps, D.experienceSteps);
  const pastEvents = list(data.pastEvents, D.pastEvents);

  const baseLogos: Array<{ src: string; alt: string; cls?: string }> =
    data.partnersLogos && data.partnersLogos.length > 0
      ? data.partnersLogos
          .map((p) => ({ src: api.getMediaUrl(p.logo, 'card'), alt: p.name || '', cls: styles.logoDefault }))
          .filter((l) => l.src)
      : DEFAULT_LOGOS;
  const repeat = Math.max(1, Math.ceil(8 / Math.max(1, baseLogos.length)));
  const logoSet = Array.from({ length: repeat }, () => baseLogos).flat();
  const logoTrack = [...logoSet, ...logoSet];

  const stepIdx = Math.min(activeStep, Math.max(0, steps.length - 1));
  const currentStep = steps[stepIdx];
  const stepImage = (i: number) => api.getMediaUrl(steps[i]?.image as Img, 'hero') || STEP_IMGS[i % STEP_IMGS.length];

  const goStep = (dir: number) => {
    if (!steps.length) return;
    setActiveStep((s) => (s + dir + steps.length) % steps.length);
  };

  // Galeria da edição selecionada (fotos do CMS ou galeria padrão)
  const galleryOf = (idx: number): string[] => {
    const own = (pastEvents[idx]?.gallery || [])
      .map((g) => api.getMediaUrl(g.image, 'hero'))
      .filter(Boolean);
    return own.length ? own : GALLERIES[idx % GALLERIES.length];
  };
  const coverOf = (idx: number): string =>
    api.getMediaUrl(pastEvents[idx]?.cover as Img, 'card') || galleryOf(idx)[0];

  const openGallery = (idx: number) => {
    setLightbox(idx);
    setPhotoIndex(0);
  };

  const activeEvent = lightbox === null ? null : pastEvents[lightbox];
  const activeGallery = lightbox === null ? [] : galleryOf(lightbox);

  const ticketsUrl = data.ticketsCtaUrl || 'https://www.sympla.com.br/';

  return (
    <main className={styles.eventosPage}>
      {/* ─── 01 · HERO ─── */}
      <section ref={heroRef} className={styles.heroSection} aria-label={`${heroTitle1} ${heroTitle2}`}>
        <div className={styles.heroBgWrapper} aria-hidden="true">
          <div ref={parallaxRef} className={styles.heroParallax}>
            <img src={heroImg} alt="" className={styles.heroBg} />
          </div>
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContentWrapper}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <span className="tag-badge light">{txt(data.heroBadge, D.heroBadge)}</span>
              <h1 className={styles.heroTitle}>
                <span>
                  <AnimatedText key={`h1-${locale}-${heroTitle1}`} text={heroTitle1} type="word" delay={0.2} stagger={0.08} />
                </span>
                <span className={styles.heroTitleAccent}>
                  <AnimatedText key={`h2-${locale}-${heroTitle2}`} text={heroTitle2} type="word" delay={0.4} stagger={0.08} />
                </span>
              </h1>
              <a href="#ingressos" onClick={(e) => scrollTo(e, '#ingressos')} className="btn-pa white">
                <span className="btn-label">{txt(data.heroCtaLabel, D.heroCtaLabel)}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded">arrow_back</span>
                </span>
              </a>
            </div>

            <div className={styles.heroRight}>
              <p className={styles.heroSubtitle}>{txt(data.heroSubtitle, D.heroSubtitle)}</p>
              <p className={styles.heroDateLocation}>{txt(data.heroDateLocation, D.heroDateLocation)}</p>
            </div>
          </div>
        </div>

        <div className={styles.scrollDownWrapper}>
          <a
            href="#o-evento"
            onClick={(e) => scrollTo(e, '#o-evento')}
            className={styles.scrollDownButton}
            aria-label={locale === 'en' ? 'Scroll to content' : 'Rolar para o conteúdo'}
          >
            <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>arrow_downward</span>
          </a>
        </div>
      </section>

      {/* ─── 02 · O EVENTO ─── */}
      <section id="o-evento" className={styles.highlightsSection} aria-label={txt(data.highlightsTag, D.highlightsTag)}>
        <div className={styles.container}>
          <div className={styles.highlightsHeader}>
            <span className="tag-badge dark">{txt(data.highlightsTag, D.highlightsTag)}</span>
            <div className={styles.headingRow}>
              <h2 className={styles.sectionTitle}>
                <AnimatedText key={`hl1-${locale}`} text={txt(data.highlightsTitle1, D.highlightsTitle1)} type="word" />
                <br />
                <span className={styles.highlight}>
                  <AnimatedText key={`hl2-${locale}`} text={txt(data.highlightsTitleAccent, D.highlightsTitleAccent)} type="word" delay={0.12} />
                </span>
              </h2>
              <p className={styles.highlightsDesc}>{txt(data.highlightsDescription, D.highlightsDescription)}</p>
            </div>
          </div>

          <motion.div
            className={styles.metricsBar}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((s, i) => (
              <div key={`${s.value}-${i}`} className={styles.metricItem}>
                <span className={styles.metricValue}>{s.value}</span>
                <span className={styles.metricLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 03 · SOBRE ─── */}
      <section className={styles.aboutSection} aria-label={txt(data.aboutTitleAccent, D.aboutTitleAccent)}>
        <div className={styles.container}>
          <div className={styles.aboutLayout}>
            <div className={styles.aboutTopGrid}>
              <div className={styles.aboutNarrative}>
                <h2 className={styles.sectionTitle}>
                  {txt(data.aboutTitle1, D.aboutTitle1)}{' '}
                  <span className={styles.highlight}>{txt(data.aboutTitleAccent, D.aboutTitleAccent)}</span>
                </h2>
                <div className={styles.aboutParagraphs}>
                  <p>{txt(data.aboutP1, D.aboutP1)}</p>
                  <p>{txt(data.aboutP2, D.aboutP2)}</p>
                </div>
              </div>

              <div className={styles.infoSheet}>
                {infoItems.map((item, i) => (
                  <div key={`${item.key}-${i}`} className={styles.infoSheetRow}>
                    <span className={styles.infoSheetKey}>{item.key}</span>
                    <span className={styles.infoSheetValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.universesPanels}>
              {universes.map((u, i) => {
                const active = activeUniverse === i;
                const img = api.getMediaUrl(u.image as Img, 'hero') || UNIVERSE_IMGS[i % UNIVERSE_IMGS.length];
                return (
                  <div
                    key={`${u.crop}-${i}`}
                    className={`${styles.universePanel} ${active ? styles.universePanelActive : ''}`}
                    onMouseEnter={() => setActiveUniverse(i)}
                    onClick={() => setActiveUniverse(i)}
                  >
                    <img src={img} alt={u.crop || ''} className={styles.universePanelBg} />
                    <div className={styles.universePanelOverlay} />
                    <div className={styles.universePanelTop}>
                      {u.tag && <span className="tag-badge light">{u.tag}</span>}
                    </div>
                    <div className={styles.universePanelBottom}>
                      <h3 className={styles.universeCropTitle}>{u.crop}</h3>
                      <p className={styles.universeCropDesc}>{u.focus}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 · EMPRESAS CONFIRMADAS ─── */}
      <section className={styles.partnersSection} aria-label={txt(data.partnersTag, D.partnersTag)}>
        <div className={styles.container}>
          <div className={styles.partnersHeader}>
            <span className="tag-badge light">{txt(data.partnersTag, D.partnersTag)}</span>
            <h2 className={styles.sectionTitleLight}>
              <AnimatedText key={`p1-${locale}`} text={txt(data.partnersTitle1, D.partnersTitle1)} type="word" />{' '}
              <span className={styles.highlightLime}>
                <AnimatedText key={`p2-${locale}`} text={txt(data.partnersTitleAccent, D.partnersTitleAccent)} type="word" delay={0.1} />
              </span>
            </h2>
          </div>

          <div className={styles.logoCarousel}>
            <div className={styles.logoTrack}>
              {logoTrack.map((logo, i) => (
                <img
                  key={`${logo.alt}-${i}`}
                  src={logo.src}
                  alt={i < logoSet.length ? logo.alt : ''}
                  aria-hidden={i >= logoSet.length ? true : undefined}
                  className={`${styles.partnerLogo} ${logo.cls || ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 · A EXPERIÊNCIA ─── */}
      <section id="programacao" className={styles.experienceSection} aria-label={txt(data.experienceTag, D.experienceTag)}>
        <div className={styles.darkBgEmblemWrap} aria-hidden="true">
          <img src="/eventos/simbolo.svg" alt="" className={styles.darkBgEmblem} />
        </div>

        <div className={`${styles.container} ${styles.experienceContainer}`}>
          <div className={styles.experienceHeader}>
            <div className={styles.experienceHeaderLeft}>
              <span className="tag-badge light">{txt(data.experienceTag, D.experienceTag)}</span>
              <h2 className={styles.sectionTitleLight}>
                <AnimatedText key={`x1-${locale}`} text={txt(data.experienceTitle1, D.experienceTitle1)} type="word" />{' '}
                <span className={styles.highlightLime}>
                  <AnimatedText key={`x2-${locale}`} text={txt(data.experienceTitleAccent, D.experienceTitleAccent)} type="word" delay={0.1} />
                </span>
              </h2>
            </div>
            <div className={styles.stageControls}>
              <button type="button" onClick={() => goStep(-1)} className={styles.controlBtn} aria-label={locale === 'en' ? 'Previous stage' : 'Etapa anterior'}>
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <button type="button" onClick={() => goStep(1)} className={styles.controlBtn} aria-label={locale === 'en' ? 'Next stage' : 'Próxima etapa'}>
                <span className="material-symbols-rounded">chevron_right</span>
              </button>
            </div>
          </div>

          <div className={styles.experienceBody}>
            <ol className={styles.scheduleList}>
              {steps.map((step, i) => {
                const isActive = stepIdx === i;
                const isPassed = i < stepIdx;
                const isLast = i === steps.length - 1;
                return (
                  <li
                    key={`${step.time}-${i}`}
                    className={`${styles.scheduleItem} ${isActive ? styles.scheduleItemActive : ''} ${isPassed ? styles.scheduleItemPassed : ''}`}
                    onMouseEnter={() => setActiveStep(i)}
                    onClick={() => setActiveStep(i)}
                  >
                    <div className={styles.timelineAxis} aria-hidden="true">
                      {!isLast && <span className={`${styles.timelineConnector} ${isPassed ? styles.timelineConnectorFilled : ''}`} />}
                      <span className={styles.timelineNode} />
                    </div>
                    <div className={styles.scheduleCard}>
                      <div className={styles.scheduleCardTop}>
                        <span className={styles.scheduleTimeBadge}>{step.time}</span>
                      </div>
                      <h3 className={styles.scheduleTitle}>{step.title}</h3>
                      {step.description && <p className={styles.scheduleDesc}>{step.description}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className={styles.experienceStage}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={stepIdx}
                  src={stepImage(stepIdx)}
                  alt={currentStep?.title || ''}
                  className={styles.experienceStageImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <div className={styles.experienceStageOverlay}>
                <span className={styles.experienceStageStep}>
                  {txt(data.experienceStepLabel, D.experienceStepLabel)} {String(stepIdx + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  {currentStep?.time ? ` · ${currentStep.time}` : ''}
                </span>
                {currentStep?.caption && <p className={styles.experienceStageCaption}>{currentStep.caption}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06 · INGRESSOS ─── */}
      <section id="ingressos" className={styles.ticketsSection} aria-label={txt(data.ticketsTitle, D.ticketsTitle)}>
        <motion.div
          className={styles.ticketsBanner}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/eventos/simbolo-cheio.svg" alt="" aria-hidden="true" className={styles.ticketsWatermark} />
          <div className={styles.ticketsLeft}>
            <span className={styles.ticketsBadge}>{txt(data.ticketsBadge, D.ticketsBadge)}</span>
            <h2 className={styles.ticketsTitle}>{txt(data.ticketsTitle, D.ticketsTitle)}</h2>
            <p className={styles.ticketsDesc}>{txt(data.ticketsDescription, D.ticketsDescription)}</p>
          </div>
          <div className={styles.ticketsCtaCol}>
            <a href={ticketsUrl} target="_blank" rel="noopener noreferrer" className={`btn-pa dark-green ${styles.symplaBtn}`}>
              <span className="btn-label">{txt(data.ticketsCtaLabel, D.ticketsCtaLabel)}</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded">arrow_back</span>
              </span>
            </a>
          </div>
        </motion.div>
        <p className={styles.symplaNote}>{txt(data.ticketsNote, D.ticketsNote)}</p>
      </section>

      {/* ─── 07 · EDIÇÕES ANTERIORES ─── */}
      <section className={styles.pastSection} aria-label={txt(data.pastTag, D.pastTag)}>
        <div className={styles.container}>
          <div className={styles.pastHeader}>
            <span className="tag-badge dark">{txt(data.pastTag, D.pastTag)}</span>
            <h2 className={styles.sectionTitle}>
              <AnimatedText key={`pa1-${locale}`} text={txt(data.pastTitle1, D.pastTitle1)} type="word" />{' '}
              <span className={styles.highlight}>
                <AnimatedText key={`pa2-${locale}`} text={txt(data.pastTitleAccent, D.pastTitleAccent)} type="word" delay={0.1} />
              </span>
            </h2>
          </div>

          <div className={styles.pastGrid}>
            {pastEvents.map((ev, i) => (
              <motion.article
                key={`${ev.name}-${i}`}
                className={styles.pastCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.pastImageWrap}>
                  <img src={coverOf(i)} alt={ev.name || ''} className={styles.pastImage} />
                </div>
                <div className={styles.pastBody}>
                  <div className={styles.pastMetaTop}>
                    {ev.date && <span className="tag-badge dark">{ev.date}</span>}
                    {ev.people && <span className={styles.pastPeople}>{ev.people}</span>}
                  </div>
                  <h3 className={styles.pastName}>{ev.name}</h3>
                  <p className={styles.pastDesc}>{ev.desc}</p>
                  <hr className={styles.pastDivider} />
                  <div className={styles.pastCardFooter}>
                    <button type="button" onClick={() => openGallery(i)} className="btn-pa dark-green">
                      <span className="btn-label">{txt(data.pastViewLabel, D.pastViewLabel)}</span>
                      <span className="btn-icon">
                        <span className="material-symbols-rounded">arrow_back</span>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERIA (lightbox) ─── */}
      <AnimatePresence>
        {activeEvent && lightbox !== null && (
          <motion.div
            className={styles.lightboxBackdrop}
            data-lenis-prevent="true"
            role="dialog"
            aria-modal="true"
            aria-label={activeEvent.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeGallery}
          >
            <motion.div
              className={styles.lightboxDialog}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxHeader}>
                <div className={styles.lightboxTitleGroup}>
                  <h3 className={styles.lightboxTitle}>{activeEvent.name}</h3>
                  {activeEvent.date && <span className="tag-badge light">{activeEvent.date}</span>}
                  {activeEvent.people && <span className={styles.lightboxMeta}>{activeEvent.people}</span>}
                </div>
                <button type="button" onClick={closeGallery} className={styles.lightboxCloseBtn} aria-label={txt(data.pastCloseLabel, D.pastCloseLabel)}>
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>

              <div className={styles.lightboxStage}>
                <img src={activeGallery[photoIndex]} alt={`${activeEvent.name} — ${photoIndex + 1}`} className={styles.lightboxImg} />
                <button type="button" onClick={() => stepPhoto(-1)} className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`} aria-label={locale === 'en' ? 'Previous photo' : 'Foto anterior'}>
                  <span className="material-symbols-rounded">chevron_left</span>
                </button>
                <button type="button" onClick={() => stepPhoto(1)} className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`} aria-label={locale === 'en' ? 'Next photo' : 'Próxima foto'}>
                  <span className="material-symbols-rounded">chevron_right</span>
                </button>
              </div>

              <div className={styles.lightboxFooter}>
                <span className={styles.lightboxMeta}>
                  {txt(data.pastPhotoLabel, D.pastPhotoLabel)} {photoIndex + 1} / {activeGallery.length}
                </span>
                <div className={styles.lightboxThumbs}>
                  {activeGallery.map((src, t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPhotoIndex(t)}
                      className={`${styles.lightboxThumb} ${t === photoIndex ? styles.lightboxThumbActive : ''}`}
                      aria-label={`${txt(data.pastPhotoLabel, D.pastPhotoLabel)} ${t + 1}`}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
