import { useEffect, useState } from 'react';
import styles from './Unita.module.css';
import { imgBgServicos, imgLavoura } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';

export default function Unita() {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('unita')
      .then(data => {
        setService(data);
      })
      .catch(err => {
        console.error('Erro ao carregar dados do serviço:', err);
      });
  }, []);

  const bgImage = service?.coverImage ? api.getMediaUrl(service.coverImage) : imgBgServicos;
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage) : imgLavoura;

  const description = service?.description;
  const children = description?.root?.children || [];
  // For Unita, we split 2 and remaining
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
        title={service?.title?.replace(/\r?\n/g, ' ') || "Unitá"} 
        bgImage={bgImage} 
        breadcrumbCurrent={service?.title?.replace(/\r?\n/g, ' ') || "Unitá"} 
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
                    <img src={contentImage} alt={service?.title || "Unitá"} />
                  </div>
                )}
              </>
            ) : (
              <>
                <p>
                  Nem sempre o resultado de uma aplicação depende apenas do produto utilizado. Regulagem do equipamento e qualidade operacional fazem toda a diferença para que o manejo entregue o resultado esperado.
                </p>
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt="Unitá" />
                  </div>
                )}
                <p>
                  Por meio da parceria entre a PA Consultoria e a Kimberlit, os clientes da consultoria têm acesso ao UniTA, um serviço que avalia a qualidade das aplicações realizadas na propriedade e identifica oportunidades de melhoria nos equipamentos e na operação.
                </p>
              </>
            )}
          </div>
          {showIllustration && (
            <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
              <img src={contentImage} alt={service?.title || "Unitá"} />
            </div>
          )}
        </div>

        <div className={styles.fullTextRow}>
          {secondPartContent ? (
            <LexicalRenderer content={secondPartContent} />
          ) : !service ? (
            <>
              <p>
                O trabalho é realizado diretamente na propriedade, analisando detalhes que impactam a eficiência das pulverizações e ajudando a garantir que os manejos recomendados pela equipe técnica sejam executados da melhor forma possível.
              </p>
              <p>
                Muitas vezes, pequenos ajustes podem gerar ganhos importantes em eficiência, reduzir perdas e melhorar o aproveitamento dos produtos utilizados na lavoura.
              </p>
              <p>
                O UniTA é um benefício exclusivo para clientes da PA Consultoria e não possui custo adicional. Mais uma ferramenta para apoiar as decisões no campo e ajudar o produtor a extrair o máximo resultado de cada aplicação.
              </p>
            </>
          ) : null}
        </div>
      </section>
      
    </main>
  );
}
