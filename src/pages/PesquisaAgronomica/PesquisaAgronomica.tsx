import { useEffect } from 'react';
import styles from './PesquisaAgronomica.module.css';
import { imgBgServicos, imgCentroPesquisa } from '../../assets';
import { useLanguage } from '../../i18n';

import SubpageHero from '../../components/SubpageHero';

export default function PesquisaAgronomica() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={t.pesquisaAgroPage.title} 
        bgImage={imgBgServicos} 
        breadcrumbCurrent={t.pesquisaAgroPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.pesquisaAgroPage.p1}
            </p>
            <p>
              {t.pesquisaAgroPage.p2}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgCentroPesquisa} alt={t.pesquisaAgroPage.title} />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            {t.pesquisaAgroPage.p3}
          </p>
          <p>
            {t.pesquisaAgroPage.p4}
          </p>
        </div>
      </section>
      
    </main>
  );
}
