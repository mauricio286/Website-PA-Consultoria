import { useEffect, useState } from 'react';
import styles from './Palestras.module.css';
import { imgBgServicos, imgEventos } from '../../assets'; // Palestras/Eventos image
import { useLanguage } from '../../i18n';
import { api, type PalestrasPageData } from '../../services/api';
import LexicalRenderer from '../../components/LexicalRenderer';
import SubpageHero from '../../components/SubpageHero';

export default function Palestras() {
  const { t, locale } = useLanguage();
  const [pageData, setPageData] = useState<PalestrasPageData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getPalestrasPage(locale)
      .then(data => {
        if (data && data.title) {
          setPageData(data);
        }
      })
      .catch(err => {
        console.error('Erro ao carregar dados do CMS para Palestras:', err);
      });
  }, [locale]);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={pageData?.title || t.palestrasPage.title} 
        bgImage={pageData?.heroImage ? api.getMediaUrl(pageData.heroImage, 'hero') : imgBgServicos} 
        breadcrumbCurrent={pageData?.title || t.palestrasPage.title} 
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
              </>
            )}
          </div>
          <div className={styles.imageWrapper}>
            <img src={pageData?.image ? api.getMediaUrl(pageData.image) : imgEventos} alt={pageData?.title || t.palestrasPage.title} />
          </div>
        </div>
      </section>
      
    </main>
  );
}
