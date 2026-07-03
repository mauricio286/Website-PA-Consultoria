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
              A gestão de compras vai muito além da negociação de valores. Nosso trabalho é desenvolver estratégias que tragam mais eficiência, segurança e rentabilidade para o produtor rural, analisando o melhor momento de compra, fornecedores, oportunidades de mercado e o custo-benefício de cada investimento realizado.
            </p>
            <p>
              Utilizamos as informações geradas pela consultoria e pelos trabalhos de pesquisa para avaliar a viabilidade técnica de produtos, tecnologias e manejos. Dessa forma, cada decisão de compra está alinhada às necessidades da propriedade, ao planejamento da safra e aos objetivos de cada produtor.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgGestaoCompras} alt="Gestão de Compras" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Além da análise comercial, acompanhamos tendências de mercado, oscilações de preços e novas tecnologias disponíveis, permitindo mais clareza e segurança na hora de investir. A gestão de compras também simplifica a rotina do produtor. Ao centralizar negociações e acompanhar o mercado de forma contínua, ajudamos a economizar tempo, organizar processos e garantir que os insumos necessários estejam disponíveis para que o manejo recomendado pela consultoria seja executado no momento correto.
          </p>
          <p>
            Hoje, o Grupo PA movimenta milhões de reais em compras de insumos agrícolas, construindo relações sólidas com parceiros e fornecedores para gerar oportunidades e condições competitivas aos produtores atendidos. Este é um serviço exclusivo para clientes da PA Consultoria. Isso garante que as decisões de compra estejam conectadas ao planejamento agronômico da propriedade, unindo estratégia, viabilidade técnica e eficiência econômica. Mais do que negociar insumos, trabalhamos para que o produtor tenha acesso às melhores ferramentas para executar seu planejamento e alcançar melhores resultados dentro da porteira.
          </p>
        </div>
      </section>
      
    </main>
  );
}
