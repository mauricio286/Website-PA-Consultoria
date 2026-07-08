import { useEffect } from 'react';
import styles from './GestaoCompras.module.css';
import { imgBgGestaoCompras, imgGestaoCompras } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import { useLanguage } from '../../i18n';

export default function GestaoCompras() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={t.gestaoPage.title} 
        bgImage={imgBgGestaoCompras} 
        breadcrumbCurrent={t.gestaoPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.gestaoPage.p1}
            </p>
            <p>
              {t.gestaoPage.p2}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgGestaoCompras} alt={t.gestaoPage.title} />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            {t.gestaoPage.p3}
          </p>
          <p>
            {t.gestaoPage.p4}
          </p>
        </div>
      </section>
      
    </main>
  );
}
