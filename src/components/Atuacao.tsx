import { useEffect, useState, useRef } from 'react';
import styles from './Atuacao.module.css';
import { imgMapaCompleto, imgMatoGrosso, imgPin } from '../assets';
import AnimatedText from './AnimatedText';
import LogoCarousel from './LogoCarousel';
import { api } from '../services/api';
import type { HomePageData, MapLocation } from '../services/api';

interface AtuacaoProps {
  data?: HomePageData | null;
}

export default function Atuacao({ data }: AtuacaoProps) {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getMapLocations()
      .then((res) => {
        setLocations(res);
      })
      .catch((err) => {
        console.error("Erro ao buscar localizações do mapa:", err);
      });
  }, []);

  // Close active pin badge when clicking anywhere outside of any pin
  useEffect(() => {
    const handleAnywhereClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedPin = target.closest(`.${styles.pinGroup}`);
      if (!clickedPin) {
        setActivePinId(null);
      }
    };

    document.addEventListener('click', handleAnywhereClick);
    return () => {
      document.removeEventListener('click', handleAnywhereClick);
    };
  }, []);

  // Auto-dismiss active pin after 10 seconds
  useEffect(() => {
    if (!activePinId) return;

    const timer = setTimeout(() => {
      setActivePinId(null);
    }, 10000);

    return () => clearTimeout(timer);
  }, [activePinId]);

  const fallbackLocations: MapLocation[] = [
    { id: '1', title: 'Bom Jesus do Araguaia - MT', area: '3.450 Hac.', positionY: 448, positionX: 650 },
    { id: '2', title: 'Tangará da Serra - MT', area: '12.100 Hac.', positionY: 550.7, positionX: 468.3 },
    { id: '3', title: 'Diamantino - MT', area: '9.300 Hac.', positionY: 535.0, positionX: 495.9 },
    { id: '4', title: 'Lucas do Rio Verde - MT', area: '8.500 Hac.', positionY: 517.4, positionX: 525.4 },
    { id: '5', title: 'Sorriso - MT', area: '15.600 Hac.', positionY: 474.2, positionX: 480.4 },
    { id: '6', title: 'Querência - MT', area: '6.200 Hac.', positionY: 550.7, positionX: 556.9 },
    { id: '7', title: 'Nova Mutum - MT', area: '7.800 Hac.', positionY: 572.2, positionX: 530.4 },
    { id: '8', title: 'Primavera do Leste - MT', area: '5.400 Hac.', positionY: 593.7, positionX: 500.8 }
  ];

  const activeLocations = locations.length > 0 ? locations : fallbackLocations;

  const mapTitle = data?.mapTitle || "Onde estamos";
  const mapDescription = data?.mapDescription || "Estamos presentes em mais de 30 municípios, o que totaliza uma área de mais de 394 mil hectares e atuando nas culturas de soja, milho, entre outras.";

  const handlePinClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePinId(prev => prev === id ? null : id);
  };

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
            <AnimatedText text={mapTitle} type="char" delay={0} stagger={0.02} />
          </h2>
          <p className={styles.description} data-node-id="36:1295" style={{ whiteSpace: 'pre-line' }}>
            {mapDescription}
          </p>
        </div>

        <div className={styles.mapWrapper} data-node-id="36:1130" ref={mapRef}>
          <div className={styles.mapContainer} data-node-id="36:1131">
            <svg viewBox="0 0 1195 1031" className={styles.mapSvg} preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="filter_pin_shadow" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="2.1"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.37 0 0 0 0 0.82 0 0 0 0 0.27 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                <filter id="filter_tooltip_shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
                </filter>
              </defs>

              <image href={imgMapaCompleto} x="0" y="0" width="1195" height="1031" />
              
              {/* Mato Grosso highlighted layer positioned exactly as in Design */}
              <image href={imgMatoGrosso} x="373.5" y="329" width="368" height="348" />

              {activeLocations.map((loc) => {
                const isPinActive = activePinId === loc.id;
                const isPinHovered = hoveredPinId === loc.id;
                return (
                  <g 
                    key={loc.id} 
                    className={`${styles.pinGroup} ${isPinActive || isPinHovered ? styles.activePin : ''}`} 
                    transform={`translate(${loc.positionX}, ${loc.positionY})`}
                    onClick={(e) => handlePinClick(loc.id, e)}
                    onMouseEnter={() => setHoveredPinId(loc.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                  >
                    <g transform="translate(0, -14)">
                      <g className={styles.pinIconSvg}>
                        <image href={imgPin} x="-14" y="-14" width="28" height="28" />
                      </g>
                    </g>
                    <circle 
                      cx="0" 
                      cy="-14" 
                      r="24" 
                      fill="transparent" 
                      className={styles.pinHitArea} 
                      aria-label={loc.title}
                    />
                  </g>
                );
              })}

              {/* Render the active or hovered tooltip on top of all pins */}
              {activeLocations.map((loc) => {
                const isPinActive = activePinId === loc.id;
                const isPinHovered = hoveredPinId === loc.id;
                if (!isPinActive && !isPinHovered) return null;
                return (
                  <g 
                    key={`tooltip-${loc.id}`}
                    transform={`translate(${loc.positionX}, ${loc.positionY})`}
                    style={{ pointerEvents: 'none' }}
                  >
                    <foreignObject 
                      x="20" 
                      y="-39" 
                      width="550" 
                      height="50" 
                      className={styles.tooltipForeignObject}
                    >
                      <div className={styles.tooltipWrapper}>
                        <div className={styles.tooltipBadge}>
                          <span className={styles.tooltipTitle}>{loc.title}</span>
                          {loc.area && (
                            <span className={styles.tooltipArea}>Área: {loc.area}</span>
                          )}
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
            <div className={styles.stateLabel}>MT</div>
          </div>
        </div>
      </div>
      
      <div className={styles.carouselWrapper}>
        <LogoCarousel logos={data?.mapLogos} />
      </div>
    </section>
  );
}
