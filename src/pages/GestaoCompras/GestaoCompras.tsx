import { useEffect, useState } from 'react';
import styles from './GestaoCompras.module.css';
import { imgBgGestaoCompras, imgGestaoCompras } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';
import { useLanguage } from '../../i18n';

export default function GestaoCompras() {
  const { locale, t } = useLanguage();
  const initialService = api.getStaticData(locale).collections?.['services']?.find((s: any) => s.slug === 'gestao-de-compras') || null;
  const [service, setService] = useState<Service | null>(() => initialService);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('gestao-de-compras', locale, (updated) => setService(updated))
      .then(data => { if (data) setService(data); })
      .catch(err => console.error('Erro ao carregar dados do serviço:', err));
  }, [locale]);

  const bgImage = service?.coverImage ? api.getMediaUrl(service.coverImage, 'hero') : imgBgGestaoCompras;
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage, 'card') : imgGestaoCompras;

  const leftContent = service?.leftContent;
  const bottomContent = service?.bottomContent;

  const bgImageTablet = service?.coverImageTablet ? api.getMediaUrl(service.coverImageTablet, 'card') : undefined;
  const bgImageMobile = service?.coverImageMobile ? api.getMediaUrl(service.coverImageMobile, 'thumbnail') : undefined;
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
