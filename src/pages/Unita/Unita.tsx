import { useEffect, useState } from 'react';
import styles from './Unita.module.css';
import { imgBgServicos, imgLavoura } from '../../assets';
import { useLanguage } from '../../i18n';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';

export default function Unita() {
  const [service, setService] = useState<Service | null>(null);
  const { locale, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('unita', locale)
      .then(data => {
        setService(data);
      })
      .catch(err => {
        console.error('Erro ao carregar dados do serviço:', err);
      });
  }, [locale]);

  const bgImage = service?.coverImage ? api.getMediaUrl(service.coverImage) : imgBgServicos;
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage) : imgLavoura;

  const description = service?.description;
  const children = description?.root?.children || [];
  // For Unita, we split 2 and remaining
  const firstPartChildren = children.slice(0, 2);
  const secondPartChildren = children.slice(2);

  const firstPartContent = description && firstPartChildren.length > 0 ? {
    root: {
      ...description.root,
      children: firstPartChildren
    }
  } : null;

  const secondPartContent = description && secondPartChildren.length > 0 ? {
    root: {
      ...description.root,
      children: secondPartChildren
    }
  } : null;

  const bgImageTablet = service?.coverImageTablet ? api.getMediaUrl(service.coverImageTablet) : undefined;
  const bgImageMobile = service?.coverImageMobile ? api.getMediaUrl(service.coverImageMobile) : undefined;
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
            {firstPartContent ? (
              <>
                <LexicalRenderer content={firstPartContent} />
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
          {secondPartContent ? (
            <LexicalRenderer content={secondPartContent} />
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
