import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import AnimatedText from '../../components/AnimatedText';

export default function NotFound() {
  return (
    <main className="page-transition-enter">
      <section className={styles.notFoundSection}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.error404}>404</h1>
          <h2 className={styles.title}>
            <AnimatedText text="Página não encontrada" type="word" />
          </h2>
          <p className={styles.description}>
            A página que você está procurando pode ter sido removida, mudado de nome, ou está temporariamente indisponível.
          </p>
          <div className={styles.btnWrapper}>
            <Link to="/#hero" className="btn-pa dark-green">
              <span className="btn-label">Voltar ao início</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded">home</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
