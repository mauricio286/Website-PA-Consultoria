import styles from './Hero.module.css';
import { imgBgServicos } from '../../../../assets';
import { api, type ServicesPageData } from '../../../../services/api';

interface HeroProps {
  data?: ServicesPageData | null;
}

export default function Hero({ data }: HeroProps) {
  const isLoading = data === null;
  const bgImage = isLoading ? undefined : (data?.heroImage ? api.getMediaUrl(data.heroImage) : imgBgServicos);
  const bgImageTablet = isLoading ? undefined : (data?.heroImageTablet ? api.getMediaUrl(data.heroImageTablet) : undefined);
  const bgImageMobile = isLoading ? undefined : (data?.heroImageMobile ? api.getMediaUrl(data.heroImageMobile) : undefined);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBgWrapper}>
        {bgImage && (
          <picture>
            {bgImageMobile && <source media="(max-width: 580px)" srcSet={bgImageMobile} />}
            {bgImageTablet && <source media="(max-width: 1024px)" srcSet={bgImageTablet} />}
            <img src={bgImage} alt="Background da PA - Serviços" className={styles.heroBg} />
          </picture>
        )}
      </div>
      
      <div className={styles.scrollDownWrapper}>
        <a href="#servicos" className={styles.scrollDownButton} aria-label="Rolar para baixo">
          <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>arrow_downward</span>
        </a>
      </div>
    </section>
  );
}
