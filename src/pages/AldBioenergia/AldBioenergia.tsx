import { useEffect } from 'react';
import styles from './AldBioenergia.module.css';
import { imgBgAld, imgAld1, imgAld2, imgPaid, imgAgriculture, imgVerified } from '../../assets';
import SubpageHero from '../../components/SubpageHero';

export default function AldBioenergia() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>

      <SubpageHero
        title="ALD Bioenergia"
        bgImage={imgBgAld}
        breadcrumbCurrent="ALD BIOENERGIA"
      />

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
          <div className={styles.logoWrapper}>
            <img src={imgAld1} alt="ALD Bioenergia - Logo" />
          </div>
        </div>

        <div className={styles.indicatorsRow}>
          <div className={`${styles.indicatorCard} ${styles.indicatorDark}`}>
            <div className={styles.indicatorIcon}>
              <img src={imgPaid} alt="Etanol" />
            </div>
            <h3 className={styles.indicatorValue}>225 milhões</h3>
            <p className={styles.indicatorDesc}>Litros de Etanol</p>
          </div>
          <div className={`${styles.indicatorCard} ${styles.indicatorLime}`}>
            <div className={styles.indicatorIcon}>
              <img src={imgAgriculture} alt="DDGS" />
            </div>
            <h3 className={styles.indicatorValue}>155 ton</h3>
            <p className={styles.indicatorDesc}>DDGS (Grãos Secos por Destilação)</p>
          </div>
          <div className={`${styles.indicatorCard} ${styles.indicatorLight}`}>
            <div className={styles.indicatorIcon}>
              <img src={imgVerified} alt="Energia" />
            </div>
            <h3 className={styles.indicatorValue}>42.000 megawatts</h3>
            <p className={styles.indicatorDesc}>Geração de energia</p>
          </div>
        </div>

        <div className={styles.imageTextRow}>
          <div className={styles.textContent}>
            <p>
              Esses números representam a magnitude do empreendimento e seu potencial para impulsionar a economia local. O etanol produzido pela USINA ALD BIOENERGIA e uma fonte de combustível renovável, com reduzidas emissões de gases de efeito estufa, colaborando para a mitigação das mudanças climáticas e a preservação do meio ambiente.
            </p>
            <p>
              Além disso, a produção de DDGS é um subproduto do processo de fabricação do etanol que possui diversos usos, principalmente na alimentação animal. Esse subproduto e uma valiosa fonte de nutrientes para a indústria pecúária, promovendo a sustentabilidade do setor agropecuário na região.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imgAld2} alt="Usina ALD Bioenergia" />
          </div>
        </div>

        <div className={styles.fullTextRow}>
          <p>
            O Grupo PA orgulha-se de participar dessa iniciativa, que representa um avanço significativo para o Estado do Mato Grosso. Por meio do investimento no setor de biocombustíveis a PA e a ALD BIOENERGIA, constrói um futuro mais próspero e sustentável para a região, impulsionando o desenvolvimento econômico e contribuindo para a preservação do meio ambiente.
          </p>
        </div>

      </section>

    </main>
  );
}