import { useEffect } from 'react';
import styles from './Lavoura.module.css';
import { imgBgAld, imgLavoura } from '../../assets';
import SubpageHero from '../../components/SubpageHero';

export default function Lavoura() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      <SubpageHero 
        title="Lavoura" 
        bgImage={imgBgAld} 
        breadcrumbCurrent="Lavoura" 
      />

      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              A produção agrícola faz parte da história e da essência do Grupo PA. Muito antes da consultoria, da pesquisa e dos demais serviços, tudo começou dentro da fazenda, enfrentando os desafios e tomando as decisões que fazem parte da rotina de todo produtor.
            </p>
            <p>
              Hoje, nossas fazendas estão localizadas na região de Deciolândia-MT, onde cultivamos soja, milho safrinha, arroz e feijão.
            </p>
            <p>
              São aproximadamente 2 mil hectares de área agrícola, dos quais cerca de 400 hectares contam com irrigação por pivô, permitindo maior estabilidade produtiva e oportunidades de cultivo ao longo do ano.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgLavoura} alt="Lavoura" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            Com a realização de três safras anuais, a área cultivada ultrapassa 4 mil hectares, resultado de um sistema produtivo construído com planejamento, tecnologia, gestão eficiente e busca constante por evolução.
          </p>
          <p>
            As propriedades também funcionam como um ambiente de validação prática para muitas das tecnologias, manejos e estratégias agronômicas que fazem parte do dia a dia do Grupo PA. É no campo que avaliamos desafios, observamos resultados e acumulamos experiências que contribuem para o desenvolvimento dos nossos negócios.
          </p>
          <p>
            Produzir continua sendo parte fundamental da nossa identidade. É a atividade que nos mantém conectados à realidade do produtor e reforça o compromisso de buscar, todos os dias, formas de produzir mais e melhor.
          </p>
        </div>
      </section>
      
    </main>
  );
}
