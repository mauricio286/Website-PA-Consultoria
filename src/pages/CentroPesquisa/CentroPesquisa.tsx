import { useEffect } from 'react';
import styles from './CentroPesquisa.module.css';
import { imgBgServicos, imgCentroPesquisa } from '../../assets';

import SubpageHero from '../../components/SubpageHero';

export default function CentroPesquisa() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Centro de Pesquisa" 
        bgImage={imgBgServicos} 
        breadcrumbCurrent="Centro de Pesquisa" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              A pesquisa faz parte do ecossistema do Grupo PA e tem papel fundamental na evolução contínua dos serviços prestados aos nossos clientes.
            </p>
            <p>
              A proximidade entre a PA Consultoria e a PA Pesquisa Agronômica permite que dúvidas, desafios e oportunidades observadas nas lavouras se transformem em trabalhos de pesquisa dentro da nossa estação experimental.
            </p>
            <p>
              Todos os anos, são conduzidos diversos trabalhos com o objetivo de gerar informações que auxiliem na tomada de decisão dos produtores atendidos pela consultoria.
            </p>
            <p>
              Essa integração faz com que muitas das recomendações da equipe técnica sejam apoiadas por dados produzidos dentro da nossa própria estrutura de pesquisa, em condições semelhantes às encontradas na região de atuação dos nossos clientes.
            </p>
            <p>
              Além de acompanhar tendências e novas tecnologias, buscamos entender como elas se comportam na prática e qual valor podem agregar ao sistema produtivo.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgCentroPesquisa} alt="Centro de Pesquisa" />
          </div>
        </div>
      </section>
      
    </main>
  );
}
