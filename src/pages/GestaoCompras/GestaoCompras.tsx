import { useEffect, useState } from 'react';
import styles from './GestaoCompras.module.css';
import { imgBgGestaoCompras, imgGestaoCompras } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';
import { useLanguage } from '../../i18n';

export default function GestaoCompras() {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { locale, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('gestao-de-compras', locale)
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar dados do serviço:', err);
        setLoading(false);
      });
  }, [locale]);

  const bgImage = loading ? undefined : (service?.coverImage ? api.getMediaUrl(service.coverImage) : imgBgGestaoCompras);
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage) : imgGestaoCompras;

  const leftContent = service?.leftContent;
  const bottomContent = service?.bottomContent;

  const bgImageTablet = loading ? undefined : (service?.coverImageTablet ? api.getMediaUrl(service.coverImageTablet) : undefined);
  const bgImageMobile = loading ? undefined : (service?.coverImageMobile ? api.getMediaUrl(service.coverImageMobile) : undefined);
  const showIllustration = service ? service.showIllustration !== false : true;
  const serviceTitle = service?.title?.replace(/\r?\n/g, ' ') || t.gestaoPage.title;

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={serviceTitle} 
        bgImage={bgImage} 
        bgImageTablet={bgImageTablet}
        bgImageMobile={bgImageMobile}
        breadcrumbCurrent={serviceTitle} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            {leftContent ? (
              <>
                <LexicalRenderer content={leftContent} />
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt={serviceTitle} />
                  </div>
                )}
              </>
            ) : (
              <>
                <p>
                  {t.gestaoPage.p1}
                </p>
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt={serviceTitle} />
                  </div>
                )}
                <p>
                  {t.gestaoPage.p2}
                </p>
              </>
            )}
          </div>
          {showIllustration && (
            <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
              <img src={contentImage} alt={serviceTitle} />
            </div>
          )}
        </div>

        <div className={styles.fullTextRow}>
          {bottomContent ? (
            <LexicalRenderer content={bottomContent} />
          ) : !service ? (
            <>
              <p>
                {t.gestaoPage.p3}
              </p>
              <p>
                {t.gestaoPage.p4}
              </p>
            </>
          ) : null}
        </div>
      </section>
      
    </main>
  );
}
