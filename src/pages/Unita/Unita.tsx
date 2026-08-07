import { useEffect, useState } from 'react';
import styles from './Unita.module.css';
import { imgBgServicos, imgLavoura } from '../../assets';
import { useLanguage } from '../../i18n';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';

export default function Unita() {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { locale, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('unita', locale)
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar dados do serviço:', err);
        setLoading(false);
      });
  }, [locale]);

  const bgImage = loading ? undefined : (service?.coverImage ? api.getMediaUrl(service.coverImage, 'hero') : imgBgServicos);
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage, 'card') : imgLavoura;

  const leftContent = service?.leftContent;
  const bottomContent = service?.bottomContent;

  const bgImageTablet = loading ? undefined : (service?.coverImageTablet ? api.getMediaUrl(service.coverImageTablet, 'card') : undefined);
  const bgImageMobile = loading ? undefined : (service?.coverImageMobile ? api.getMediaUrl(service.coverImageMobile, 'thumbnail') : undefined);
  const showIllustration = service ? service.showIllustration !== false : true;
  const serviceTitle = service?.title?.replace(/\r?\n/g, ' ') || t.unitaPage.title;

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
                  {t.unitaPage.p1}
                </p>
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt={serviceTitle} />
                  </div>
                )}
                <p>
                  {t.unitaPage.p2}
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
                {t.unitaPage.p3}
              </p>
              <p>
                {t.unitaPage.p4}
              </p>
              <p>
                {t.unitaPage.p5}
              </p>
            </>
          ) : null}
        </div>
      </section>
      
    </main>
  );
}
