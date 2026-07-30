import { useEffect, useState } from 'react';
import styles from './Lavoura.module.css';
import { imgBgAld, imgLavoura } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { useLanguage } from '../../i18n';
import { api, type LavouraPageData } from '../../services/api';

export default function Lavoura() {
  const { t, locale } = useLanguage();
  const [pageData, setPageData] = useState<LavouraPageData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getLavouraPage(locale)
      .then(data => {
        if (data && data.title) {
          setPageData(data);
        }
      })
      .catch(err => {
        console.error('Erro ao carregar dados do CMS para Lavoura:', err);
      });
  }, [locale]);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      <SubpageHero 
        title={pageData?.title || t.lavouraPage.title} 
        bgImage={pageData?.heroImage ? api.getMediaUrl(pageData.heroImage) : imgBgAld} 
        breadcrumbCurrent={pageData?.title || t.lavouraPage.title} 
      />

      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            {pageData?.leftContent ? (
              <LexicalRenderer content={pageData.leftContent} />
            ) : (
              <>
                <p>
                  {t.lavouraPage.p1}
                </p>
                <p>
                  {t.lavouraPage.p2}
                </p>
                <p>
                  {t.lavouraPage.p3}
                </p>
              </>
            )}
          </div>
          <div className={styles.imageWrapper}>
            <img src={pageData?.image ? api.getMediaUrl(pageData.image) : imgLavoura} alt={pageData?.title || t.lavouraPage.title} />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          {pageData?.bottomContent ? (
            <LexicalRenderer content={pageData.bottomContent} />
          ) : (
            <>
              <p>
                {t.lavouraPage.p4}
              </p>
              <p>
                {t.lavouraPage.p5}
              </p>
              <p>
                {t.lavouraPage.p6}
              </p>
            </>
          )}
        </div>
      </section>
      
    </main>
  );
}
