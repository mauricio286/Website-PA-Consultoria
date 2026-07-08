import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import styles from './SubpageHero.module.css';
import { useLanguage } from '../i18n';

interface SubpageHeroProps {
  title: string;
  bgImage: string;
  bgImageTablet?: string;
  bgImageMobile?: string;
  breadcrumbCurrent: string;
}

export default function SubpageHero({ title, bgImage, bgImageTablet, bgImageMobile, breadcrumbCurrent }: SubpageHeroProps) {
  const { t } = useLanguage();

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo('#content', { offset: -50, immediate: false });
    } else {
      const el = document.getElementById('content');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={`${styles.heroBgWrapper} animate-wrapper-slide`}>
        <div className={styles.heroBgOverlay}></div>
        <picture>
          {bgImageMobile && <source media="(max-width: 580px)" srcSet={bgImageMobile} />}
          {bgImageTablet && <source media="(max-width: 1024px)" srcSet={bgImageTablet} />}
          <img className={`${styles.heroBg} animate-bg-zoom`} src={bgImage} alt={`Background ${title}`} />
        </picture>
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.titleContainer}>
          <div className={styles.breadcrumb}>
            <Link to="/servicos" className={styles.breadcrumbLink}>{t.subpageHero.breadcrumb}</Link>
            <span className={styles.breadcrumbCurrent}>{` > ${breadcrumbCurrent}`}</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            <AnimatedText text={title} type="char" delay={0.2} stagger={0.03} />
          </h1>
        </div>
      </div>

      <div className={styles.scrollDownWrapper}>
        <a href="#content" onClick={handleScroll} className={styles.scrollDownButton}>
          <span className={`material-symbols-rounded ${styles.scrollDownIcon}`} style={{ transform: 'rotate(-90deg)' }}>arrow_back</span>
        </a>
      </div>
    </section>
  );
}
