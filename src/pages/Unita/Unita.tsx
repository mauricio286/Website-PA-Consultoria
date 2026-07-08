import { useEffect } from 'react';
import styles from './Unita.module.css';
import { imgBgServicos, imgLavoura } from '../../assets';
import { useLanguage } from '../../i18n';

import SubpageHero from '../../components/SubpageHero';

export default function Unita() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={t.unitaPage.title} 
        bgImage={imgBgServicos} 
        breadcrumbCurrent={t.unitaPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.unitaPage.p1}
            </p>
            <p>
              {t.unitaPage.p2}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgLavoura} alt={t.unitaPage.title} />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            {t.unitaPage.p3}
          </p>
          <p>
            {t.unitaPage.p4}
          </p>
          <p>
            {t.unitaPage.p5}
          </p>
        </div>
      </section>
      
    </main>
  );
}
