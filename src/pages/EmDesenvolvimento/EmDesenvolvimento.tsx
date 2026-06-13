import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './EmDesenvolvimento.module.css';
import { imgBg, imgLogoPa1 } from '../../assets';

export default function EmDesenvolvimento() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={`${styles.page} page-transition-enter`}>
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <img src={imgBg} alt="Background da PA" className={styles.heroBg} />
          <div className={styles.overlay}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img src={imgLogoPa1} alt="Grupo PA" className={styles.logo} />
          </div>
          <h1 className={styles.title}>Em Desenvolvimento</h1>
          <p className={styles.subtitle}>Esta página estará disponível em breve.</p>
        </div>

        <div className={styles.backButtonWrapper}>
          <Link to="/" className={styles.backButton} aria-label="Voltar para Home">
            <span className={`material-symbols-rounded ${styles.backIcon}`} style={{ fontSize: '24px' }}>arrow_back</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
