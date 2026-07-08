import { Link } from 'react-router-dom';
import styles from './ServicesList.module.css';
import { useLanguage } from '../../../../i18n';

export default function ServicesList() {
  const { t } = useLanguage();

  return (
    <section id="servicos" className={styles.servicesSection}>
      <div className={styles.servicesHeader}>
        <div className={styles.tagWrapper}>
          <span className="tag-badge dark" style={{ borderColor: '#88a668', color: '#455336', backgroundColor: 'transparent' }}>
            {t.servicos.tag}
          </span>
        </div>
        
        <div className={styles.titleWrapper}>
          <h2 className={styles.sectionTitle}>
            {t.servicos.title1}<br /><span className={styles.highlight}>{t.servicos.titleHighlight}</span>
          </h2>
          <p className={styles.sectionDescription}>
            {t.servicos.description}
          </p>
        </div>
      </div>

      <div className={styles.servicesList}>
        {/* Card 1 */}
        <div className={`${styles.serviceCard} ${styles.cardDarkGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleLightGreen}>{t.servicos.consultoriaTitle.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}</h3>
            <p className={styles.cardTextLightGreen}>{t.servicos.consultoriaDesc}</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/consultoriaagronomica" className="btn-pa white">
               <span className="btn-label">{t.servicos.verMais}</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`${styles.serviceCard} ${styles.cardLightGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleDarkGreen}>{t.servicos.unitaTitle}</h3>
            <p className={styles.cardTextDarkGreen}> </p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/unita" className="btn-pa dark-green">
               <span className="btn-label">{t.servicos.verMais}</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`${styles.serviceCard} ${styles.cardDarkGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleLightGreen}>{t.servicos.agriculturaTitle.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}</h3>
            <p className={styles.cardTextLightGreen}>{t.servicos.agriculturaDesc}</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/agriculturaprecisao" className="btn-pa white">
               <span className="btn-label">{t.servicos.verMais}</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 4 */}
        <div className={`${styles.serviceCard} ${styles.cardLightGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleDarkGreen}>{t.servicos.gestaoTitle.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}</h3>
            <p className={styles.cardTextDarkGreen}>{t.servicos.gestaoDesc}</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/gestaocompras" className="btn-pa dark-green">
               <span className="btn-label">{t.servicos.verMais}</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 5 */}
        <div className={`${styles.serviceCard} ${styles.cardDarkGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleLightGreen}>{t.servicos.pesquisaTitle.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}</h3>
            <p className={styles.cardTextLightGreen}>{t.servicos.pesquisaDesc}</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/pesquisaagronomica" className="btn-pa white">
               <span className="btn-label">{t.servicos.verMais}</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
