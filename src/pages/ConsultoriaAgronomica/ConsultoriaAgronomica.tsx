import { useEffect } from 'react';
import styles from './ConsultoriaAgronomica.module.css';
import { imgBgConsultoriaAgronomica, imgConsultoriaAgronomica } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import { useLanguage } from '../../i18n';

export default function ConsultoriaAgronomica() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={t.consultoriaPage.title} 
        bgImage={imgBgConsultoriaAgronomica} 
        breadcrumbCurrent={t.consultoriaPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
            <img src={imgConsultoriaAgronomica} alt={t.consultoriaPage.title} />
          </div>
          <div className={styles.textContent}>
            <p>
              {t.consultoriaPage.p1}
            </p>
            <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
              <img src={imgConsultoriaAgronomica} alt={t.consultoriaPage.title} />
            </div>
            <p>
              {t.consultoriaPage.p2}
            </p>
            <p>
              {t.consultoriaPage.p3}
            </p>
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            {t.consultoriaPage.p4}
          </p>
          <p>
            {t.consultoriaPage.p5}
          </p>
        </div>
      </section>
      
    </main>
  );
}
