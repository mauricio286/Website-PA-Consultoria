import { useEffect } from 'react';
import styles from './PesquisaAgronomica.module.css';
import { imgBgServicos, imgCentroPesquisa } from '../../assets';

import SubpageHero from '../../components/SubpageHero';

export default function PesquisaAgronomica() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Pesquisa Agronômica" 
        bgImage={imgBgServicos} 
        breadcrumbCurrent="Pesquisa Agronômica" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              A pesquisa faz parte da história do Grupo PA. Ela nasceu da vontade de entender melhor o campo, testar novas tecnologias e encontrar respostas para os desafios que fazem parte da rotina de todo produtor rural. Desde 2011, contamos com uma estação experimental própria, onde avaliamos cultivares, produtos, manejos e novas tecnologias nas culturas de soja, milho, algodão, entre outras.
            </p>
            <p>
              São mais de 60 hectares dedicados exclusivamente à pesquisa, gerando informações em condições reais de campo. A cada safra, milhares de tratamentos passam por avaliação. Somente na última temporada foram mais de 2.000 tratamentos conduzidos por nossa equipe. Todo esse trabalho gera um dos patrimônios mais valiosos do Grupo PA: conhecimento construído ao longo de anos de observação, comparação e validação prática.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgCentroPesquisa} alt="Pesquisa Agronômica" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Foi essa seriedade que aproximou o Grupo PA das principais empresas do agronegócio mundial, que utilizam nosso serviço para avaliar tecnologias e gerar informações que ajudam a direcionar o futuro da agricultura. A pesquisa não termina na coleta de dados, ela ganha valor quando se transforma em informação útil para quem está produzindo. Os resultados dos experimentos são compartilhados com produtores e empresas parceiras, contribuindo para decisões mais seguras e manejos mais eficientes.
          </p>
          <p>
            Todas as informações que chegam aos nossos clientes e aos participantes do PA Summit passaram primeiro pelos nossos campos de pesquisa. Antes de recomendar, preferimos testar. Antes de opinar, buscamos dados. E antes de levar uma tecnologia ao produtor, queremos entender como ela realmente se comporta no campo. A pesquisa é uma das formas que encontramos de continuar evoluindo e ajudando a agricultura a evoluir junto conosco.
          </p>
        </div>
      </section>
      
    </main>
  );
}
