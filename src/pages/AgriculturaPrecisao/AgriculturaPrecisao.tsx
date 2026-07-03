import { useEffect } from 'react';
import styles from './AgriculturaPrecisao.module.css';
import { imgBgAgriculturaPrecisao, imgAgriculturaPrecisao } from '../../assets';
import SubpageHero from '../../components/SubpageHero';
import CicloPrecisao from './components/CicloPrecisao/CicloPrecisao';

export default function AgriculturaPrecisao() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Agricultura de Precisão" 
        bgImage={imgBgAgriculturaPrecisao} 
        breadcrumbCurrent="Agricultura de Precisão" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              Cada lavoura possui características próprias. Diferenças de solo, fertilidade, relevo e histórico produtivo fazem com que uma mesma área responda de formas diferentes ao longo da safra. Entender essas variações é o primeiro passo para produzir melhor.
            </p>
            <p>
              A Agricultura de Precisão da PA foi desenvolvida para ajudar nossos clientes a conhecerem sua propriedade em detalhes e tomarem decisões mais assertivas. Por meio de amostragens georreferenciadas, mapas, análises e acompanhamento técnico, identificamos oportunidades de correção, manejo e investimento dentro de cada talhão.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgAgriculturaPrecisao} alt="Agricultura de Precisão" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Nosso objetivo não é apenas gerar mapas, mas transformar informações em ações práticas no campo. Os dados coletados são interpretados pela equipe técnica da PA e utilizados para direcionar recomendações que contribuam para o melhor aproveitamento dos insumos, maior eficiência operacional e construção da fertilidade do solo ao longo dos anos.
          </p>
          <p>
            Por ser uma ferramenta integrada ao trabalho de consultoria, a Agricultura de Precisão permite que cada recomendação seja construída considerando a realidade da propriedade, o histórico das áreas e os objetivos de cada produtor.
          </p>
          <p>
            Esse é um serviço exclusivo para clientes da PA Consultoria, reforçando nosso compromisso de entregar informações cada vez mais precisas para extrair ao máximo o que o campo pode nos oferecer.
          </p>
        </div>
      </section>

      {/* Ciclo Animado */}
      <CicloPrecisao />
      
    </main>
  );
}
