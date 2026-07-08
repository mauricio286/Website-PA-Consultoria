import styles from './Hero.module.css';
import { imgBgServicos } from '../../../../assets';
import { api, type ServicesPageData } from '../../../../services/api';

interface HeroProps {
  data?: ServicesPageData | null;
}

export default function Hero({ data }: HeroProps) {
  const bgImage = data?.heroImage ? api.getMediaUrl(data.heroImage) : imgBgServicos;

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBgWrapper}>
        <img src={bgImage} alt="Background da PA - Serviços" className={styles.heroBg} />
      </div>
      
      <div className={styles.scrollDownWrapper}>
        <a href="#servicos" className={styles.scrollDownButton} aria-label="Rolar para baixo">
          <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>arrow_downward</span>
        </a>
      </div>
    </section>
  );
}
