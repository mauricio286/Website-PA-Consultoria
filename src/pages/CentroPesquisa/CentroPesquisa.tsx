import { useEffect } from 'react';
import styles from './CentroPesquisa.module.css';
import { imgBgServicos, imgCentroPesquisa } from '../../assets';
import { useLanguage } from '../../i18n';

import SubpageHero from '../../components/SubpageHero';

export default function CentroPesquisa() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={t.centroPesquisaPage.title} 
        bgImage={imgBgServicos} 
        breadcrumbCurrent={t.centroPesquisaPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.centroPesquisaPage.p1}
            </p>
            <p>
              {t.centroPesquisaPage.p2}
            </p>
            <p>
              {t.centroPesquisaPage.p3}
            </p>
            <p>
              {t.centroPesquisaPage.p4}
            </p>
            <p>
              {t.centroPesquisaPage.p5}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgCentroPesquisa} alt={t.centroPesquisaPage.title} />
          </div>
        </div>
      </section>
      
    </main>
  );
}
