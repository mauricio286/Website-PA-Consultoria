import { useEffect } from 'react';
import styles from './AgriculturaPrecisao.module.css';
import { imgBgAgriculturaPrecisao, imgAgriculturaPrecisao } from '../../assets';
import SubpageHero from '../../components/SubpageHero';

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
              A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente em estudos e validações a campo para desenvolver soluções mais eficientes, sustentáveis e alinhadas à realidade do produtor rural.
            </p>
            <p>
              Nosso objetivo é transformar dados e experimentos em estratégias práticas que contribuam para o aumento da produtividade e da rentabilidade das lavouras.
              <br/>
              Atualmente, contamos com mais de 60 hectares destinados exclusivamente à pesquisa, onde realizamos testes envolvendo cultivares, fertilidade, manejo fitossanitário, posicionamento de insumos, interferências climáticas e novas tecnologias aplicadas à agricultura.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgAgriculturaPrecisao} alt="Agricultura de Precisão" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Cada experimento é conduzido com acompanhamento técnico e análise detalhada dos resultados obtidos em campo.
            <br /><br />
            Através da pesquisa, conseguimos compreender com mais profundidade o comportamento das culturas e antecipar soluções para os desafios enfrentados pelo produtor. Isso permite gerar informações confiáveis, reduzir riscos e apoiar tomadas de decisão mais assertivas dentro da operação agrícola.
            <br /><br />
            Nosso compromisso é aproximar inovação e prática de campo, conectando ciência, tecnologia e experiência agronômica para impulsionar resultados sustentáveis no agro.
          </p>
        </div>
      </section>
      
    </main>
  );
}
