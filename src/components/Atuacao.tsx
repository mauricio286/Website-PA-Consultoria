import styles from './Atuacao.module.css';
import { imgMapaCompleto, imgMatoGrosso, imgPin } from '../assets';
import AnimatedText from './AnimatedText';
import LogoCarousel from './LogoCarousel';

interface LocationInfo {
  name: string;
  area: string;
  top: number;
  left: number;
}

export default function Atuacao() {
  // Coordenadas exatas baseadas no Figma (1195x1031 viewBox)
  const locations: LocationInfo[] = [
    { name: 'Bom Jesus do Araguaia - MT', area: '3.450 Hac.', top: 448, left: 650 },
    { name: 'Tangará da Serra - MT', area: '12.100 Hac.', top: 550.7, left: 468.3 },
    { name: 'Diamantino - MT', area: '9.300 Hac.', top: 535.0, left: 495.9 },
    { name: 'Lucas do Rio Verde - MT', area: '8.500 Hac.', top: 517.4, left: 525.4 },
    { name: 'Sorriso - MT', area: '15.600 Hac.', top: 474.2, left: 480.4 },
    { name: 'Querência - MT', area: '6.200 Hac.', top: 550.7, left: 556.9 },
    { name: 'Nova Mutum - MT', area: '7.800 Hac.', top: 572.2, left: 530.4 },
    { name: 'Primavera do Leste - MT', area: '5.400 Hac.', top: 593.7, left: 500.8 }
  ];

  return (
    <section id="atuacao" className={styles.atuacao} data-node-id="36:1100">
      <div className={styles.container}>
        <div className={styles.topCol}>
          <div className="tag-badge light" data-node-id="36:1102">
            Atuação
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '40px',
              fontWeight: 500,
              lineHeight: '1.2',
              letterSpacing: '-0.8px',
              color: '#ebebeb',
            }}
            data-node-id="36:1104"
          >
            <AnimatedText text="Onde estamos" type="char" delay={0} stagger={0.02} />
          </h2>
          <p className={styles.description} data-node-id="36:1295">
            Estamos presentes em mais de 30 municípios, o que totaliza uma área de mais de 394 mil hectares e atuando nas culturas de soja, milho, entre outras.
          </p>
          <div className={styles.btnWrapper} style={{ marginTop: '10px' }}>
            <a href="/quem-somos" className="btn-pa white">
              <span className="btn-label">Ver mais</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
              </span>
            </a>
          </div>
        </div>

        <div className={styles.mapWrapper} data-node-id="36:1130">
          <div className={styles.mapContainer} data-node-id="36:1131">
            <svg viewBox="0 0 1195 1031" className={styles.mapSvg} preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="filter_pin_shadow" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="2.1"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.37 0 0 0 0 0.82 0 0 0 0 0.27 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
              </defs>

              <image href={imgMapaCompleto} x="0" y="0" width="1195" height="1031" />
              
              {/* Mato Grosso highlighted layer positioned exactly as in Figma */}
              <image href={imgMatoGrosso} x="373.5" y="329" width="368" height="348" />

              {locations.map((loc, index) => {
                return (
                  <g 
                    key={index} 
                    className={styles.pinGroup} 
                    transform={`translate(${loc.left}, ${loc.top})`}
                  >
                    <g transform="translate(-14, -28)" className={styles.pinIconSvg}>
                      <image href={imgPin} width="28" height="28" />
                    </g>
                    <circle 
                      cx="0" 
                      cy="-14" 
                      r="24" 
                      fill="transparent" 
                      className={styles.pinHitArea} 
                      aria-label={loc.name}
                    />
                    <title>{loc.name}</title>
                  </g>
                );
              })}
            </svg>
            <div className={styles.stateLabel}>MT</div>
          </div>
        </div>
      </div>
      
      <div className={styles.carouselWrapper}>
        <LogoCarousel />
      </div>
    </section>
  );
}
