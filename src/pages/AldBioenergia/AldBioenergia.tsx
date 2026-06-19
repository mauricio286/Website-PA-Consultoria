import { useEffect } from 'react';
import AnimatedCounter from '../../components/AnimatedCounter';
import styles from './AldBioenergia.module.css';
import { imgBgAld, imgAld1, imgAld2 } from '../../assets';
import SubpageHero from '../../components/SubpageHero';

export default function AldBioenergia() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      
      {/* Hero Section */}
      <SubpageHero 
        title="Ald Bioenergia" 
        bgImage={imgBgAld} 
        breadcrumbCurrent="Ald Bioenergia" 
      />

      {/* Content Section */}
      <section id="content" className={styles.contentSection}>
        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              O Grupo PA é uma instituição comprometida com o desenvolvimento econômico e sustentável do Estado do Mato Grosso. Reconhecendo a importância dos biocombustíveis como uma alternativa viável e ecologicamente correta, o Grupo PA investe no setor como acionista na USINA ALD BIOENERGIA, localizada no município de Diamantino-MT.
            </p>
            <p>
              Essa iniciativa representa mais um marco para a região de Deciolândia, onde a PA e outros produtores se uniram em prol de um objetivo comum. A USINA ALD BIOENERGIA é uma indústria de produção de biocombustíveis de destaque, com capacidade máxima impressionante. Em suas instalações, são produzidos anualmente:
            </p>
          </div>
          <div className={styles.imageWrapper} style={{ backgroundColor: 'var(--color-bg-white)' }}>
            <img src={imgAld1} className={styles.aldLogoImage} alt="Logo ALD Bioenergia" />
          </div>
        </div>

        {/* Indicadores */}
        <div className={styles.indicatorsRow}>
          <div className={`${styles.indicatorBox} ${styles.indicatorDarkGreen}`}>
            <span className="material-symbols-rounded" style={{ fontSize: '45px', color: '#e1fe00' }}>payments</span>
            <div className={styles.indicatorValue} style={{ color: '#e1fe00' }}><AnimatedCounter value={225} /> milhões</div>
            <div className={styles.indicatorLabel} style={{ color: '#e1fe00' }}>Litros de Etanol</div>
          </div>
          
          <div className={`${styles.indicatorBox} ${styles.indicatorLime}`}>
            <span className="material-symbols-rounded" style={{ fontSize: '45px', color: '#002d22' }}>agriculture</span>
            <div className={styles.indicatorValue} style={{ color: '#002d22' }}><AnimatedCounter value={155} /> ton</div>
            <div className={styles.indicatorLabel} style={{ color: '#002d22' }}>DDGS (Grãos Secos por Destilação)</div>
          </div>
          
          <div className={`${styles.indicatorBox} ${styles.indicatorLightGreen}`}>
            <span className="material-symbols-rounded" style={{ fontSize: '45px', color: '#4c7043' }}>bolt</span>
            <div className={styles.indicatorValue} style={{ color: '#4c7043' }}><AnimatedCounter value={42000} /> megawatts</div>
            <div className={styles.indicatorLabel} style={{ color: '#596d43' }}>Geração de energia</div>
          </div>
        </div>

        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              Esses números representam a magnitude do empreendimento e seu potencial para impulsionar a economia local, ao mesmo tempo em que contribui para a sustentabilidade ambiental. O etanol produzido pela USINA ALD BIOENERGIA é uma fonte de combustível renovável, com reduzidas emissões de gases de efeito estufa, colaborando assim para a mitigação das mudanças climáticas e a preservação do meio ambiente.
            </p>
            <p>
              Além disso, a produção de DDGS é um subproduto do processo de fabricação do etanol que possui diversos usos, principalmente na alimentação animal. Esse subproduto é uma valiosa fonte de nutrientes para a indústria pecuária, promovendo a sustentabilidade do setor agropecuário na região.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgAld2} className={styles.zoomedImage} alt="Campo e Sustentabilidade" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            O Grupo PA orgulha-se de participar dessa iniciativa, que representa um avanço significativo para o Estado do Mato Grosso. Por meio do investimento no setor de biocombustíveis a PA e a ALD BIOENERGIA, constrói um futuro mais próspero e sustentável para a região, impulsionando o desenvolvimento econômico e contribuindo para a preservação do meio ambiente.
          </p>
        </div>

        <div className={styles.btnCenterWrapper}>
           <a href="https://aldbioenergia.com.br" target="_blank" rel="noopener noreferrer" className="btn-pa dark-green">
             <span className="btn-label">Ver mais</span>
             <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
           </a>
        </div>
      </section>
      
    </main>
  );
}
