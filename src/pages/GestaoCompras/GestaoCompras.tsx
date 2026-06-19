import { useEffect } from 'react';
import styles from './GestaoCompras.module.css';
import { imgBgGestaoCompras, imgGestaoCompras } from '../../assets';
import SubpageHero from '../../components/SubpageHero';

export default function GestaoCompras() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Gestão de Compras" 
        bgImage={imgBgGestaoCompras} 
        breadcrumbCurrent="Gestão de Compras" 
      />

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
