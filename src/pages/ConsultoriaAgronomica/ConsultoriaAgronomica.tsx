import { useEffect } from 'react';
import styles from './ConsultoriaAgronomica.module.css';
import { imgBgConsultoriaAgronomica, imgConsultoriaAgronomica } from '../../assets';
import SubpageHero from '../../components/SubpageHero';

export default function ConsultoriaAgronomica() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Consultoria Agronômica" 
        bgImage={imgBgConsultoriaAgronomica} 
        breadcrumbCurrent="Consultoria Agronômica" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
            <img src={imgConsultoriaAgronomica} alt="Produção agrícola" />
          </div>
          <div className={styles.textContent}>
            <p>
              Nossa produção agrícola é construída com planejamento, tecnologia e gestão eficiente em cada operação. Atuamos diretamente no cultivo de soja, milho safrinha e feijão, utilizando técnicas modernas de manejo e agricultura de precisão para garantir maior desempenho produtivo e sustentabilidade no campo.
            </p>
            <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
              <img src={imgConsultoriaAgronomica} alt="Produção agrícola" />
            </div>
            <p>
              Cada etapa do processo é acompanhada de forma estratégica, desde o preparo do solo até a colheita. Trabalhamos com monitoramento constante das áreas, controle operacional, análise de desempenho e otimização dos recursos utilizados na lavoura, sempre com foco em produtividade e rentabilidade.
            </p>
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Além da experiência prática adquirida ao longo dos anos, nossa estrutura produtiva também funciona como base para validação de novas tecnologias, manejos e soluções agronômicas. Isso permite que nossas decisões sejam fundamentadas em resultados reais de campo, aproximando inovação e aplicação prática dentro da agricultura.
          </p>
          <p>
            Com mais de 1.800 hectares de produção própria e atuação em diferentes regiões do Mato Grosso, vivemos diariamente os desafios da lavoura e entendemos a importância de decisões rápidas, técnicas e eficientes para alcançar resultados consistentes safra após safra.
          </p>
        </div>
      </section>
      
    </main>
  );
}
