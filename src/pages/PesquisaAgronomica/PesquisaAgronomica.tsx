import { useEffect, useState } from 'react';
import styles from './PesquisaAgronomica.module.css';
import { imgBgServicos, imgCentroPesquisa } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';
import { useLanguage } from '../../i18n';

export default function PesquisaAgronomica() {
  const { locale, t } = useLanguage();
  const initialService = api.getStaticData(locale).collections?.['services']?.find((s: any) => s.slug === 'pesquisa-agronomica') || null;
  const [service, setService] = useState<Service | null>(() => initialService);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('pesquisa-agronomica', locale, (updated) => setService(updated))
      .then(data => { if (data) setService(data); })
      .catch(err => console.error('Erro ao carregar dados do serviço:', err));
  }, [locale]);

  const bgImage = service?.coverImage ? api.getMediaUrl(service.coverImage, 'hero') : imgBgServicos;
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage, 'card') : imgCentroPesquisa;

  const leftContent = service?.leftContent;
  const bottomContent = service?.bottomContent;

  const bgImageTablet = service?.coverImageTablet ? api.getMediaUrl(service.coverImageTablet, 'card') : undefined;
  const bgImageMobile = service?.coverImageMobile ? api.getMediaUrl(service.coverImageMobile, 'thumbnail') : undefined;
  const showIllustration = service ? service.showIllustration !== false : true;
  const serviceTitle = service?.title?.replace(/\r?\n/g, ' ') || t.pesquisaAgroPage.title;

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
              <LexicalRenderer content={leftContent} />
            ) : (
              <>
                <p>{t.pesquisaAgroPage.p1}</p>
                <p>{t.pesquisaAgroPage.p2}</p>
              </>
            )}
          </div>
        </div>

        {bottomContent ? (
          <div className={styles.fullTextRow}>
            <LexicalRenderer content={bottomContent} />
          </div>
        ) : (
          <div className={styles.fullTextRow}>
            <p>{t.pesquisaAgroPage.p3}</p>
            <p>{t.pesquisaAgroPage.p4}</p>
          </div>
        )}
      </section>
      
    </main>
  );
}

