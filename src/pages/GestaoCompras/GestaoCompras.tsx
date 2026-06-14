import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './GestaoCompras.module.css';
import { imgBgGestaoCompras, imgGestaoCompras } from '../../assets';
import AnimatedText from '../../components/AnimatedText';

export default function GestaoCompras() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenisInstance;
    if (lenis) {
      lenis.scrollTo('#content', { offset: -50, immediate: false });
    } else {
      const el = document.getElementById('content');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={`${styles.heroBgWrapper} animate-wrapper-slide`}>
          <div className={styles.heroBgOverlay}></div>
          <img className={`${styles.heroBg} animate-bg-zoom`} src={imgBgGestaoCompras} alt="Background Gestão de Compras" />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.titleContainer}>
            <div className={styles.breadcrumb}>
              <Link to="/servicos" className={styles.breadcrumbLink}>Serviços</Link>
              <span className={styles.breadcrumbCurrent}>{` > Gestão de Compras`}</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <AnimatedText text="Gestão de Compras" type="char" delay={0.2} stagger={0.03} />
            </h1>
          </div>
        </div>

        <div className={styles.scrollDownWrapper}>
          <a href="#content" onClick={handleScroll} className={styles.scrollDownButton}>
            <span className={`material-symbols-rounded ${styles.scrollDownIcon}`} style={{ transform: 'rotate(-90deg)' }}>arrow_back</span>
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              A gestão de compras vai muito além da negociação de valores. Nosso trabalho é desenvolver estratégias que tragam mais eficiência, segurança e rentabilidade para o produtor rural, analisando o melhor momento de compra, fornecedores, oportunidades de mercado e custo-benefício de cada investimento realizado.
            </p>
            <p>
              Atuamos na gestão de aquisição de máquinas, equipamentos e insumos agrícolas, fortalecendo o poder de negociação dos nossos clientes e contribuindo para decisões mais assertivas dentro da operação.
            </p>
            <p>
              Com conhecimento técnico e visão estratégica do mercado agro, buscamos alternativas que alinhem desempenho operacional, durabilidade e viabilidade econômica.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgGestaoCompras} alt="Gestão de Compras" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Além da análise comercial, acompanhamos tendências de mercado, oscilações de preços e novas tecnologias disponíveis, permitindo que o produtor tenha mais clareza e segurança na hora de investir. Nosso objetivo é transformar a compra em uma ferramenta estratégica para melhorar resultados no campo e otimizar custos da operação agrícola. Hoje, o Grupo PA movimenta milhões em gestão de compras, construindo relações sólidas com parceiros e fornecedores para gerar melhores oportunidades aos produtores atendidos.
          </p>
        </div>
      </section>
      
    </main>
  );
}
