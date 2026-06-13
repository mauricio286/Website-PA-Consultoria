import styles from './Hero.module.css';
import { imgBgServicos } from '../../../../assets';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBgWrapper}>
        <img src={imgBgServicos} alt="Background da PA - Serviços" className={styles.heroBg} />
      </div>
      
      <div className={styles.scrollDownWrapper}>
        <a href="#servicos" className={styles.scrollDownButton} aria-label="Rolar para baixo">
          <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>arrow_downward</span>
        </a>
      </div>
    </section>
  );
}
