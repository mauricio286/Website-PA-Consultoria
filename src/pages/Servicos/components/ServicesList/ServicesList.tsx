import { Link } from 'react-router-dom';
import styles from './ServicesList.module.css';

export default function ServicesList() {
  return (
    <section id="servicos" className={styles.servicesSection}>
      <div className={styles.servicesHeader}>
        <div className={styles.tagWrapper}>
          <span className="tag-badge dark" style={{ borderColor: '#88a668', color: '#455336', backgroundColor: 'transparent' }}>
            eixos de atuação
          </span>
        </div>
        
        <div className={styles.titleWrapper}>
          <h2 className={styles.sectionTitle}>
            Nossos<br /><span className={styles.highlight}>serviços</span>
          </h2>
          <p className={styles.sectionDescription}>
            Do planejamento ao pós-colheita, atuamos de forma estratégica para que cada decisão no campo seja mais eficiente e rentável. Nossos serviços unem acompanhamento técnico, agricultura de precisão, pesquisa e análise de dados para otimizar produtividade, reduzir perdas e gerar resultados consistentes em cada safra.
          </p>
        </div>
      </div>

      <div className={styles.servicesList}>
        {/* Card 1 */}
        <div className={`${styles.serviceCard} ${styles.cardDarkGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleLightGreen}>Consultoria<br />Agronômica</h3>
            <p className={styles.cardTextLightGreen}>A PA Consultoria nasceu do campo e construiu sua reputação entregando aquilo que realmente...</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/consultoriaagronomica" className="btn-pa white">
               <span className="btn-label">Ver mais</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`${styles.serviceCard} ${styles.cardLightGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleDarkGreen}>Unitá</h3>
            <p className={styles.cardTextDarkGreen}> </p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/unita" className="btn-pa dark-green">
               <span className="btn-label">Ver mais</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`${styles.serviceCard} ${styles.cardDarkGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleLightGreen}>Agricultura<br />de Precisão</h3>
            <p className={styles.cardTextLightGreen}>A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente...</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/agriculturaprecisao" className="btn-pa white">
               <span className="btn-label">Ver mais</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 4 */}
        <div className={`${styles.serviceCard} ${styles.cardLightGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleDarkGreen}>Gestão<br />de Compras</h3>
            <p className={styles.cardTextDarkGreen}>A gestão de compras vai muito além da negociação de valores. Nosso...</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/gestaocompras" className="btn-pa dark-green">
               <span className="btn-label">Ver mais</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>

        {/* Card 5 */}
        <div className={`${styles.serviceCard} ${styles.cardDarkGreen}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleLightGreen}>Pesquisa<br />Agronômica</h3>
            <p className={styles.cardTextLightGreen}>A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente...</p>
          </div>
          <div className={styles.cardButton}>
             <Link to="/pesquisaagronomica" className="btn-pa white">
               <span className="btn-label">Ver mais</span>
               <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
