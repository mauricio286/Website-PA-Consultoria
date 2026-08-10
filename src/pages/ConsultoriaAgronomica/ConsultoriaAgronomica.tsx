import { useEffect, useState } from 'react';
import styles from './ConsultoriaAgronomica.module.css';
import { imgBgConsultoriaAgronomica, imgConsultoriaAgronomica } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';
import { useLanguage } from '../../i18n';

export default function ConsultoriaAgronomica() {
  const { locale, t } = useLanguage();
  const initialService = api.getStaticData(locale).collections?.['services']?.find((s: any) => s.slug === 'consultoria-agronomica') || null;
  const [service, setService] = useState<Service | null>(() => initialService);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('consultoria-agronomica', locale, (updated) => setService(updated))
      .then(data => { if (data) setService(data); })
      .catch(err => console.error('Erro ao carregar dados do serviço:', err));
  }, [locale]);

  const bgImage = service?.coverImage ? api.getMediaUrl(service.coverImage, 'hero') : imgBgConsultoriaAgronomica;
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage, 'card') : imgConsultoriaAgronomica;

  const leftContent = service?.leftContent;
  const bottomContent = service?.bottomContent;

  const bgImageTablet = service?.coverImageTablet ? api.getMediaUrl(service.coverImageTablet, 'card') : undefined;
  const bgImageMobile = service?.coverImageMobile ? api.getMediaUrl(service.coverImageMobile, 'thumbnail') : undefined;
  const showIllustration = service ? service.showIllustration !== false : true;
  const serviceTitle = service?.title?.replace(/\r?\n/g, ' ') || t.consultoriaPage.title;

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
          {showIllustration && (
            <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
              <img src={contentImage} alt={serviceTitle} />
            </div>
          )}
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
                  {t.consultoriaPage.p1}
                </p>
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt={serviceTitle} />
                  </div>
                )}
                <p>
                  {t.consultoriaPage.p2}
                </p>
                <p>
                  {t.consultoriaPage.p3}
                </p>
              </>
            )}
          </div>
        </div>
 
        <div className={styles.fullTextRow}>
          {bottomContent ? (
            <LexicalRenderer content={bottomContent} />
          ) : !service ? (
            <>
              <p>
                {t.consultoriaPage.p4}
              </p>
              <p>
                {t.consultoriaPage.p5}
              </p>
            </>
          ) : null}
        </div>
      </section>
      
    </main>
  );
}
