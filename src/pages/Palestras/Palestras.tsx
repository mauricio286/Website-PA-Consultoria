import { useEffect } from 'react';
import styles from './Palestras.module.css';
import { imgBgServicos, imgEventos } from '../../assets'; // Palestras/Eventos image

import SubpageHero from '../../components/SubpageHero';

export default function Palestras() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Palestras e Eventos" 
        bgImage={imgBgServicos} 
        breadcrumbCurrent="Palestras e Eventos" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              Ao longo dos anos, as informações geradas pela consultoria, pela pesquisa agronômica e pela experiência prática no campo passaram a ser compartilhadas por meio de palestras, treinamentos, dias de campo e eventos técnicos voltados a produtores rurais, equipes técnicas e empresas do agronegócio.
            </p>
            <p>
              Os temas abordados acompanham os principais desafios da agricultura, incluindo manejo de doenças, pragas, fertilidade do solo, cultivares, tecnologia de aplicação, cenário climático e tendências para as principais culturas da região.
            </p>
            <p>
              Além dos treinamentos realizados para empresas e equipes técnicas, o Grupo PA promove anualmente o PA Summit, um dos principais eventos do agronegócio regional.
            </p>
            <p>
              Em sua 13ª edição, o evento reúne produtores, pesquisadores, consultores, empresas e lideranças do setor para a apresentação de resultados de pesquisa, novas tecnologias, networking e troca de experiências.
            </p>
            <p>
              Esses encontros são oportunidades para propagar o conhecimento gerado no campo para quem toma decisões diariamente dentro de suas propriedades.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgEventos} alt="Palestras e Eventos" />
          </div>
        </div>
      </section>
      
    </main>
  );
}
