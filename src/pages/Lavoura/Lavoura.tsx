import { useEffect } from 'react';
import styles from './Lavoura.module.css';
import { imgBgAld, imgLavoura } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import { useLanguage } from '../../i18n';

export default function Lavoura() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      <SubpageHero 
        title={t.lavouraPage.title} 
        bgImage={imgBgAld} 
        breadcrumbCurrent={t.lavouraPage.title} 
      />

      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.lavouraPage.p1}
            </p>
            <p>
              {t.lavouraPage.p2}
            </p>
            <p>
              {t.lavouraPage.p3}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgLavoura} alt={t.lavouraPage.title} />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            {t.lavouraPage.p4}
          </p>
          <p>
            {t.lavouraPage.p5}
          </p>
          <p>
            {t.lavouraPage.p6}
          </p>
        </div>
      </section>
      
    </main>
  );
}
