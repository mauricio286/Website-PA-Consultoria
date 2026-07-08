import { useEffect } from 'react';
import styles from './Palestras.module.css';
import { imgBgServicos, imgEventos } from '../../assets'; // Palestras/Eventos image
import { useLanguage } from '../../i18n';

import SubpageHero from '../../components/SubpageHero';

export default function Palestras() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={t.palestrasPage.title} 
        bgImage={imgBgServicos} 
        breadcrumbCurrent={t.palestrasPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.palestrasPage.p1}
            </p>
            <p>
              {t.palestrasPage.p2}
            </p>
            <p>
              {t.palestrasPage.p3}
            </p>
            <p>
              {t.palestrasPage.p4}
            </p>
            <p>
              {t.palestrasPage.p5}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgEventos} alt={t.palestrasPage.title} />
          </div>
        </div>
      </section>
      
    </main>
  );
}
