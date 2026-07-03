import { useEffect } from 'react';
import styles from './Unita.module.css';
import { imgBgServicos, imgLavoura } from '../../assets';

import SubpageHero from '../../components/SubpageHero';

export default function Unita() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Unitá" 
        bgImage={imgBgServicos} 
        breadcrumbCurrent="Unitá" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              Nem sempre o resultado de uma aplicação depende apenas do produto utilizado. Regulagem do equipamento e qualidade operacional fazem toda a diferença para que o manejo entregue o resultado esperado.
            </p>
            <p>
              Por meio da parceria entre a PA Consultoria e a Kimberlit, os clientes da consultoria têm acesso ao UniTA, um serviço que avalia a qualidade das aplicações realizadas na propriedade e identifica oportunidades de melhoria nos equipamentos e na operação.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgLavoura} alt="Unitá" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            O trabalho é realizado diretamente na propriedade, analisando detalhes que impactam a eficiência das pulverizações e ajudando a garantir que os manejos recomendados pela equipe técnica sejam executados da melhor forma possível.
          </p>
          <p>
            Muitas vezes, pequenos ajustes podem gerar ganhos importantes em eficiência, reduzir perdas e melhorar o aproveitamento dos produtos utilizados na lavoura.
          </p>
          <p>
            O UniTA é um benefício exclusivo para clientes da PA Consultoria e não possui custo adicional. Mais uma ferramenta para apoiar as decisões no campo e ajudar o produtor a extrair o máximo resultado de cada aplicação.
          </p>
        </div>
      </section>
      
    </main>
  );
}
