import { useEffect, useState } from 'react';
import styles from './AgriculturaPrecisao.module.css';
import { imgBgAgriculturaPrecisao, imgAgriculturaPrecisao } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import CicloPrecisao from './components/CicloPrecisao/CicloPrecisao';
import LexicalRenderer from '../../components/LexicalRenderer';
import { api, type Service } from '../../services/api';

export default function AgriculturaPrecisao() {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getServiceBySlug('agricultura-de-precisao')
      .then(data => {
        setService(data);
      })
      .catch(err => {
        console.error('Erro ao carregar dados do serviço:', err);
      });
  }, []);

  const bgImage = service?.coverImage ? api.getMediaUrl(service.coverImage) : imgBgAgriculturaPrecisao;
  const contentImage = service?.illustrationImage ? api.getMediaUrl(service.illustrationImage) : imgAgriculturaPrecisao;

  const description = service?.description;
  const children = description?.root?.children || [];
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
        title={service?.title?.replace(/\r?\n/g, ' ') || "Agricultura de Precisão"} 
        bgImage={bgImage} 
        breadcrumbCurrent={service?.title?.replace(/\r?\n/g, ' ') || "Agricultura de Precisão"} 
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
                    <img src={contentImage} alt={service?.title || "Agricultura de Precisão"} />
                  </div>
                )}
              </>
            ) : (
              <>
                <p>
                  Cada lavoura possui características próprias. Diferenças de solo, fertilidade, relevo e histórico produtivo fazem com que uma mesma área responda de formas diferentes ao longo da safra. Entender essas variações é o primeiro passo para produzir melhor.
                </p>
                {showIllustration && (
                  <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
                    <img src={contentImage} alt="Agricultura de Precisão" />
                  </div>
                )}
                <p>
                  A Agricultura de Precisão da PA foi desenvolvida para ajudar nossos clientes a conhecerem sua propriedade em detalhes e tomarem decisões mais assertivas. Por meio de amostragens georreferenciadas, mapas, análises e acompanhamento técnico, identificamos oportunidades de correção, manejo e investimento dentro de cada talhão.
                </p>
              </>
            )}
          </div>
          {showIllustration && (
            <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
              <img src={contentImage} alt={service?.title || "Agricultura de Precisão"} />
            </div>
          )}
        </div>

        <div className={styles.fullTextRow}>
          {secondPartContent ? (
            <LexicalRenderer content={secondPartContent} />
          ) : !service ? (
            <>
              <p>
                Nosso objetivo não é apenas gerar mapas, mas transformar informações em ações práticas no campo. Os dados coletados são interpretados pela equipe técnica da PA e utilizados para direcionar recomendações que contribuam para o melhor aproveitamento dos insumos, maior eficiência operacional e construção da fertilidade do solo ao longo dos anos.
              </p>
              <p>
                Por ser uma ferramenta integrada ao trabalho de consultoria, a Agricultura de Precisão permite que cada recomendação seja construída considerando a realidade da propriedade, o histórico das áreas e os objetivos de cada produtor.
              </p>
              <p>
                Esse é um serviço exclusivo para clientes da PA Consultoria, reforçando nosso compromisso de entregar informações cada vez mais precisas para extrair ao máximo o que o campo pode nos oferecer.
              </p>
            </>
          ) : null}
        </div>
      </section>

      {/* Ciclo Animado */}
      <CicloPrecisao />
      
    </main>
  );
}
