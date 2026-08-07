import { useEffect, useState } from 'react';
import styles from './CentroPesquisa.module.css';
import { imgBgServicos, imgCentroPesquisa } from '../../assets';
import { useLanguage } from '../../i18n';
import { api, type CentroPesquisaPageData } from '../../services/api';
import LexicalRenderer from '../../components/LexicalRenderer';
import SubpageHero from '../../components/SubpageHero';

export default function CentroPesquisa() {
  const { t, locale } = useLanguage();
  const [pageData, setPageData] = useState<CentroPesquisaPageData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getCentroPesquisaPage(locale)
      .then(data => {
        if (data && data.title) {
          setPageData(data);
        }
      })
      .catch(err => {
        console.error('Erro ao carregar dados do CMS para Centro de Pesquisa:', err);
      });
  }, [locale]);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={pageData?.title || t.centroPesquisaPage.title} 
        bgImage={pageData?.heroImage ? api.getMediaUrl(pageData.heroImage, 'hero') : imgBgServicos} 
        breadcrumbCurrent={pageData?.title || t.centroPesquisaPage.title} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            {pageData?.leftContent ? (
              <LexicalRenderer content={pageData.leftContent} />
            ) : (
              <>
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
              </>
            )}
          </div>
          <div className={styles.imageWrapper}>
            <img src={pageData?.image ? api.getMediaUrl(pageData.image) : imgCentroPesquisa} alt={pageData?.title || t.centroPesquisaPage.title} />
          </div>
        </div>
      </section>
      
    </main>
  );
}
