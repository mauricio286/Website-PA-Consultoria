import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import AnimatedText from '../../components/AnimatedText';
import { useLanguage } from '../../i18n';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="page-transition-enter">
      <section className={styles.notFoundSection}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.error404}>404</h1>
          <h2 className={styles.title}>
            <AnimatedText text={t.notFoundPage.title} type="word" />
          </h2>
          <p className={styles.description}>
            {t.notFoundPage.p1}
          </p>
          <div className={styles.btnWrapper}>
            <Link to="/#hero" className="btn-pa dark-green">
              <span className="btn-label">{t.notFoundPage.btn}</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded no-rotate">home</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
