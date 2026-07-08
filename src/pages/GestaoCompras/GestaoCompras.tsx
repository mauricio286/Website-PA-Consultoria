import { useEffect, useState } from 'react';
import styles from './GestaoCompras.module.css';
import { imgBgGestaoCompras, imgGestaoCompras } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';

export default function GestaoCompras() {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('gestao-de-compras')
      .then(data => {
        setService(data);
      })
      .catch(err => {
        console.error('Erro ao carregar dados do serviço:', err);
      });
  }, []);

  const bgImage = service?.coverImage ? api.getMediaUrl(service.coverImage) : imgBgGestaoCompras;
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage) : imgGestaoCompras;

  const description = service?.description;
  const children = description?.root?.children || [];
  // For Gestão de Compras, the first 2 paragraphs are next to the image, and the rest are below
  const firstPartChildren = children.slice(0, 2);
  const secondPartChildren = children.slice(2);

  const firstPartContent = description && firstPartChildren.length > 0 ? {
    root: {
      ...description.root,
      children: firstPartChildren
    }
  } : null;

  const secondPartContent = description && secondPartChildren.length > 0 ? {
    root: {
      ...description.root,
      children: secondPartChildren
    }
  } : null;

  const showIllustration = service ? service.showIllustration !== false : true;

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title={service?.title?.replace(/\r?\n/g, ' ') || "Gestão de Compras"} 
        bgImage={bgImage} 
        breadcrumbCurrent={service?.title?.replace(/\r?\n/g, ' ') || "Gestão de Compras"} 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            {firstPartContent ? (
              <>
                <LexicalRenderer content={firstPartContent} />
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt={service?.title || "Gestão de Compras"} />
                  </div>
                )}
              </>
            ) : (
              <>
                <p>
                  A gestão de compras vai muito além da negociação de valores. Nosso trabalho é desenvolver estratégias que tragam mais eficiência, segurança e rentabilidade para o produtor rural, analisando o melhor momento de compra, fornecedores, oportunidades de mercado e o custo-benefício de cada investimento realizado.
                </p>
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt="Gestão de Compras" />
                  </div>
                )}
                <p>
                  Utilizamos as informações geradas pela consultoria e pelos trabalhos de pesquisa para avaliar a viabilidade técnica de produtos, tecnologias e manejos. Dessa forma, cada decisão de compra está alinhada às necessidades da propriedade, ao planejamento da safra e aos objetivos de cada produtor.
                </p>
              </>
            )}
          </div>
          {showIllustration && (
            <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
              <img src={contentImage} alt={service?.title || "Gestão de Compras"} />
            </div>
          )}
        </div>

        <div className={styles.fullTextRow}>
          {secondPartContent ? (
            <LexicalRenderer content={secondPartContent} />
          ) : !service ? (
            <>
              <p>
                Além da análise comercial, acompanhamos tendências de mercado, oscilações de preços e novas tecnologias disponíveis, permitindo mais clareza e segurança na hora de investir. A gestão de compras também simplifica a rotina do produtor. Ao centralizar negociações e acompanhar o mercado de forma contínua, ajudamos a economizar tempo, organizar processos e garantir que os insumos necessários estejam disponíveis para que o manejo recomendado pela consultoria seja executado no momento correto.
              </p>
              <p>
                Hoje, o Grupo PA movimenta milhões de reais em compras de insumos agrícolas, construindo relações sólidas com parceiros e fornecedores para gerar oportunidades e condições competitivas aos produtores atendidos. Este é um serviço exclusivo para clientes da PA Consultoria. Isso garante que as decisões de compra estejam conectadas ao planejamento agronômico da propriedade, unindo estratégia, viabilidade técnica e eficiência econômica. Mais do que negociar insumos, trabalhamos para que o produtor tenha acesso às melhores ferramentas para executar seu planejamento e alcançar melhores resultados dentro da porteira.
              </p>
            </>
          ) : null}
        </div>
      </section>
      
    </main>
  );
}
