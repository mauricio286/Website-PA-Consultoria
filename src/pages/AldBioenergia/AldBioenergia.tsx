import { useEffect, useState } from 'react';
import styles from './AldBioenergia.module.css';
import { imgBgAld, imgAld1, imgAld2, imgPaid, imgAgriculture, imgVerified } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { useLanguage } from '../../i18n';
import { api, type AldBioenergiaPageData } from '../../services/api';

export default function AldBioenergia() {
  const { t, locale } = useLanguage();
  const [pageData, setPageData] = useState<AldBioenergiaPageData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getAldBioenergiaPage(locale)
      .then(data => {
        if (data && data.title) {
          setPageData(data);
        }
      })
      .catch(err => {
        console.error('Erro ao carregar dados do CMS para ALD Bioenergia:', err);
      });
  }, [locale]);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>

      <SubpageHero
        title={pageData?.title || t.aldPage.title}
        bgImage={pageData?.heroImage ? api.getMediaUrl(pageData.heroImage, 'hero') : imgBgAld}
        breadcrumbCurrent={pageData?.title || t.aldPage.title}
      />

      <section id="content" className={styles.contentSection}>

        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            {pageData?.leftContent ? (
              <LexicalRenderer content={pageData.leftContent} />
            ) : (
              <>
                <p>
                  {t.aldPage.p1}
                </p>
                <p>
                  {t.aldPage.p2}
                </p>
              </>
            )}
          </div>
          <div className={styles.logoWrapper}>
            <img src={pageData?.logoImage ? api.getMediaUrl(pageData.logoImage) : imgAld1} alt="ALD Bioenergia - Logo" />
          </div>
        </div>

        <div className={styles.indicatorsRow}>
          {pageData?.indicators && pageData.indicators.length > 0 ? (
            pageData.indicators.map((ind, idx) => {
              const themeClass = ind.theme === 'dark' 
                ? styles.indicatorDark 
                : ind.theme === 'lime' 
                  ? styles.indicatorLime 
                  : styles.indicatorLight;
              return (
                <div key={ind.id || idx} className={`${styles.indicatorCard} ${themeClass}`}>
                  {ind.icon && (
                    <div className={styles.indicatorIcon}>
                      <img src={api.getMediaUrl(ind.icon)} alt={ind.description} />
                    </div>
                  )}
                  <h3 className={styles.indicatorValue}>{ind.value}</h3>
                  <p className={styles.indicatorDesc}>{ind.description}</p>
                </div>
              );
            })
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            {pageData?.section3Content ? (
              <LexicalRenderer content={pageData.section3Content} />
            ) : (
              <>
                <p>
                  {t.aldPage.p3}
                </p>
                <p>
                  {t.aldPage.p4}
                </p>
              </>
            )}
          </div>
          <div className={styles.imageWrapper}>
            <img src={pageData?.section3Image ? api.getMediaUrl(pageData.section3Image) : imgAld2} alt="Usina ALD Bioenergia" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          {pageData?.bottomContent ? (
            <LexicalRenderer content={pageData.bottomContent} />
          ) : (
            <p>
              {t.aldPage.p5}
            </p>
          )}
        </div>

      </section>

    </main>
  );
}