import { useEffect } from 'react';
import styles from './AldBioenergia.module.css';
import { imgBgAld, imgAld1, imgAld2, imgPaid, imgAgriculture, imgVerified } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import { useLanguage } from '../../i18n';

export default function AldBioenergia() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>

      <SubpageHero
        title={t.aldPage.title}
        bgImage={imgBgAld}
        breadcrumbCurrent={t.aldPage.title}
      />

      <section id="content" className={styles.contentSection}>

        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.aldPage.p1}
            </p>
            <p>
              {t.aldPage.p2}
            </p>
          </div>
          <div className={styles.logoWrapper}>
            <img src={imgAld1} alt="ALD Bioenergia - Logo" />
          </div>
        </div>

        <div className={styles.indicatorsRow}>
          <div className={`${styles.indicatorCard} ${styles.indicatorDark}`}>
            <div className={styles.indicatorIcon}>
              <img src={imgPaid} alt="Etanol" />
            </div>
            <h3 className={styles.indicatorValue}>{t.aldPage.ind1Value}</h3>
            <p className={styles.indicatorDesc}>{t.aldPage.ind1Desc}</p>
          </div>
          <div className={`${styles.indicatorCard} ${styles.indicatorLime}`}>
            <div className={styles.indicatorIcon}>
              <img src={imgAgriculture} alt="DDGS" />
            </div>
            <h3 className={styles.indicatorValue}>{t.aldPage.ind2Value}</h3>
            <p className={styles.indicatorDesc}>{t.aldPage.ind2Desc}</p>
          </div>
          <div className={`${styles.indicatorCard} ${styles.indicatorLight}`}>
            <div className={styles.indicatorIcon}>
              <img src={imgVerified} alt="Energia" />
            </div>
            <h3 className={styles.indicatorValue}>{t.aldPage.ind3Value}</h3>
            <p className={styles.indicatorDesc}>{t.aldPage.ind3Desc}</p>
          </div>
        </div>

        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              {t.aldPage.p3}
            </p>
            <p>
              {t.aldPage.p4}
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgAld2} alt="Usina ALD Bioenergia" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            {t.aldPage.p5}
          </p>
        </div>

      </section>

    </main>
  );
}