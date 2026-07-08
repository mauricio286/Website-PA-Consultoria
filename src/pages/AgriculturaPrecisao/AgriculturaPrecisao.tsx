import { useEffect } from 'react';
import styles from './AgriculturaPrecisao.module.css';
import { imgBgAgriculturaPrecisao, imgAgriculturaPrecisao } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import CicloPrecisao from './components/CicloPrecisao/CicloPrecisao';
import { useLanguage } from '../../i18n';

export default function AgriculturaPrecisao() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={t.agriculturaPage.title} 
        bgImage={imgBgAgriculturaPrecisao} 
        breadcrumbCurrent={t.agriculturaPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.agriculturaPage.p1}
            </p>
            <p>
              {t.agriculturaPage.p2}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgAgriculturaPrecisao} alt={t.agriculturaPage.title} />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            {t.agriculturaPage.p3}
          </p>
          <p>
            {t.agriculturaPage.p4}
          </p>
          <p>
            {t.agriculturaPage.p5}
          </p>
        </div>
      </section>

      {/* Ciclo Animado */}
      <CicloPrecisao />
      
    </main>
  );
}
