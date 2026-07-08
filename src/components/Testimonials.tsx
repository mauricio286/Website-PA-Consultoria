import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Testimonials.module.css';
import {
  imgPerfil,
  imgPerfil1,
  imgPerfil2,
  imgPerfil3,
} from '../assets';
import AnimatedText from './AnimatedText';
import { api } from '../services/api';
import type { HomePageData, TestimonialDoc } from '../services/api';
import { useLanguage } from '../i18n';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

interface TestimonialsProps {
  data?: HomePageData | null;
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [dbTestimonials, setDbTestimonials] = useState<TestimonialDoc[]>([]);
  const [selectedId, setSelectedId] = useState<string>('dep-3'); // default selected
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { locale, t } = useLanguage();

  // Figma Depoimentos — 4 cards in 2x2 grid
  // Top-left and bottom-right are dark (#002d22), others light (#eee)
  const staticTestimonials: Testimonial[] = useMemo(() => [
    {
      id: 'dep-3',
      name: t.testimonials.dep3Name,
      location: t.testimonials.dep3Location,
      text: t.testimonials.dep3Text,
      avatar: imgPerfil3,
    },
    {
      id: 'dep-1',
      name: t.testimonials.dep1Name,
      location: t.testimonials.dep1Location,
      text: t.testimonials.dep1Text,
      avatar: imgPerfil,
    },
    {
      id: 'dep-2',
      name: t.testimonials.dep2Name,
      location: t.testimonials.dep2Location,
      text: t.testimonials.dep2Text,
      avatar: imgPerfil2,
    },
    {
      id: 'dep-4',
      name: t.testimonials.dep4Name,
      location: t.testimonials.dep4Location,
      text: t.testimonials.dep4Text,
      avatar: imgPerfil1,
    },
  ], [t]);

  const itemsToRender = useMemo(() => {
    return (dbTestimonials.length > 0
      ? dbTestimonials.map((t) => ({
          id: t.id,
          name: t.authorName,
          location: t.authorDescription,
          text: t.quote,
          avatar: api.getMediaUrl(t.photo) || imgPerfil,
        }))
      : staticTestimonials).slice(0, 6);
  }, [dbTestimonials, staticTestimonials]);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      if (gridRef.current && window.innerWidth <= 991) {
        const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
        
        const cardElement = gridRef.current.querySelector(`.${styles.card}`) as HTMLElement;
        const gap = 15;
        const cardWidth = cardElement ? cardElement.offsetWidth + gap : clientWidth * 0.85;

        // If we reached the end, scroll back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          gridRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by one exact card width
          gridRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3500);
  };

  useEffect(() => {
    api.getTestimonials(locale)
      .then((res) => {
        setDbTestimonials(res);
        if (res.length > 0) {
          setSelectedId(res[0].id);
        }
      })
      .catch((err) => {
        console.error('Error fetching testimonials:', err);
      });
  }, [locale]);

  const ctaText = data?.ctaText;
  const ctaLabel = data?.ctaButtonLabel || t.testimonials.cta || "Fale com um consultor";
  const ctaUrl = data?.ctaButtonUrl || "/contato";

  const isHash = ctaUrl.startsWith('#');
  const isExternal = ctaUrl.startsWith('http://') || ctaUrl.startsWith('https://');

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      e.preventDefault();
      const target = document.querySelector(ctaUrl);
      if (target) {
        const lenis = (window as any).lenisInstance;
        if (lenis) {
          lenis.scrollTo(ctaUrl, { offset: -50 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleTouchStart = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleTouchEnd = () => {
    startAutoPlay();
  };

  const handleScrollEvent = () => {
    if (gridRef.current) {
      const { scrollLeft } = gridRef.current;
      const cardElement = gridRef.current.querySelector(`.${styles.card}`) as HTMLElement;
      const gap = 15;
      const cardWidth = cardElement ? cardElement.offsetWidth + gap : gridRef.current.clientWidth * 0.85;
      
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < itemsToRender.length) {
        setActiveIndex(newIndex);
        setSelectedId(itemsToRender[newIndex].id);
      }
    }
  };

  useEffect(() => {
    startAutoPlay();

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [itemsToRender.length]);

  const titleNormal = data?.testimonialsTitle || t.testimonials.title || "Parcerias que comprovam";
  const titleAccent = data?.testimonialsTitleAccent || "";

  return (
    <section id="testimonials" className={styles.testimonials} data-node-id="36:1348">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className="tag-badge dark" data-node-id="36:1350">
            {t.testimonials.tag}
          </span>
          <h2 className={`${styles.title} ${styles.animatedTitle}`} data-node-id="36:1352">
            <AnimatedText key={`testimonials-${locale}-${titleNormal}`} text={titleNormal} delay={0} stagger={0.03} type="word" />{' '}
            {titleAccent && (
              <span className={styles.titleAccent}>
                <AnimatedText key={`testimonials-accent-${locale}-${titleAccent}`} text={titleAccent} delay={0.2} stagger={0.03} type="word" />
              </span>
            )}
          </h2>
        </div>

        {/* 2x2 Grid or Mobile Carousel */}
        <div 
          className={styles.grid} 
          ref={gridRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScrollEvent}
          data-lenis-prevent="true"
        >
          {itemsToRender.map((dep) => (
            <div
              key={dep.id}
              className={`${styles.card} ${selectedId === dep.id ? styles.cardDark : styles.cardLight} ${selectedId === dep.id ? styles.cardSelected : ''}`}
              onClick={() => setSelectedId(dep.id)}
              data-node-id={dep.id}
            >
              {/* Quote mark — Design: Chivo 128px */}
              <div className={styles.quoteMark}>''</div>

              <p className={styles.quoteText}>{dep.text}</p>

              <div className={styles.profile}>
                <img src={dep.avatar} alt={dep.name} className={styles.avatar} />
                <div className={styles.profileInfo}>
                  <span className={styles.profileName}>{dep.name}</span>
                  <span className={styles.profileLocation}>{dep.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className={styles.paginationDots}>
          {itemsToRender.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              onClick={() => {
                if (gridRef.current) {
                  gridRef.current.scrollTo({
                    left: index * gridRef.current.clientWidth * 0.85,
                    behavior: 'smooth'
                  });
                  setActiveIndex(index);
                  if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA — Design BotaoFaleComUmConsultor: w=266px */}
        <div className={styles.ctaWrapper}>
          {ctaText && (
            <p className={styles.ctaText}>{ctaText}</p>
          )}
          {isExternal ? (
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-pa dark-green-lg" data-node-id="64:437">
              <span className="btn-label">{ctaLabel}</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
              </span>
            </a>
          ) : isHash ? (
            <a href={ctaUrl} onClick={handleCtaClick} className="btn-pa dark-green-lg" data-node-id="64:437">
              <span className="btn-label">{ctaLabel}</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
              </span>
            </a>
          ) : (
            <Link to={ctaUrl} className="btn-pa dark-green-lg" data-node-id="64:437">
              <span className="btn-label">{ctaLabel}</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
