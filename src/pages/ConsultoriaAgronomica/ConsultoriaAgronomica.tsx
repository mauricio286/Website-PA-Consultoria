import { useEffect } from 'react';
import styles from './ConsultoriaAgronomica.module.css';
import { imgBgConsultoriaAgronomica, imgConsultoriaAgronomica } from '../../assets';
import SubpageHero from '../../components/SubpageHero';

export default function ConsultoriaAgronomica() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Consultoria Agronômica" 
        bgImage={imgBgConsultoriaAgronomica} 
        breadcrumbCurrent="Consultoria Agronômica" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={`${styles.imageWrapper} ${styles.desktopImage}`}>
            <img src={imgConsultoriaAgronomica} alt="Consultoria Agronômica" />
          </div>
          <div className={styles.textContent}>
            <p>
              A PA Consultoria nasceu do campo e construiu sua reputação entregando aquilo que realmente importa ao produtor: informação confiável para tomada de decisão.
            </p>
            <div className={`${styles.imageWrapper} ${styles.mobileImage}`}>
              <img src={imgConsultoriaAgronomica} alt="Consultoria Agronômica" />
            </div>
            <p>
              Por trás da empresa existe uma família produtora que, há mais de três décadas, vive os desafios da agricultura na prática. E essa essência permanece até hoje. Além de consultores e pesquisadores, continuamos sendo produtores, enfrentando os mesmos desafios, oportunidades e riscos de cada safra.
            </p>
            <p>
              Foi essa vivência que moldou nossa forma de trabalhar. Acreditamos que uma recomendação só tem valor quando funciona dentro da realidade da fazenda. Por isso, combinamos experiência prática, pesquisa agronômica e acompanhamento técnico para transformar conhecimento em resultados.
            </p>
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Com uma sólida estrutura de pesquisa, geramos informações próprias. Esse conhecimento é validado em campo e aplicado diretamente na realidade dos nossos clientes, garantindo recomendações independentes, seguras e alinhadas às necessidades de cada propriedade.
          </p>
          <p>
            Ao longo de nossa trajetória, conquistamos a confiança de centenas de produtores e nos tornamos referência em consultoria agronômica, pesquisa e geração de conhecimento para o agronegócio. Nossa credibilidade é resultado de um trabalho construído com proximidade, seriedade e compromisso com resultados. Mais do que uma consultoria, somos parceiros estratégicos de quem busca produzir mais, com eficiência, sustentabilidade e segurança nas decisões.
          </p>
        </div>
      </section>
      
    </main>
  );
}
