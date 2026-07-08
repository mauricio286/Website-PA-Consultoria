import { useState, useRef, useEffect } from 'react';
import styles from './Atuacao.module.css';
import { imgMapaCompleto, imgMatoGrosso, imgPin } from '../assets';
import AnimatedText from './AnimatedText';
import LogoCarousel from './LogoCarousel';
import { api } from '../services/api';
import type { HomePageData, MapLocation } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n';

interface AtuacaoProps {
  data?: HomePageData | null;
}

interface CityData {
  name: string;
  area: string | number;
  top: number;
  left: number;
}

export default function Atuacao({ data }: AtuacaoProps) {
  const { locale, t } = useLanguage();
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    api.getMapLocations(locale)
      .then((res) => {
        setLocations(res);
      })
      .catch((err) => {
        console.error("Erro ao buscar localizações do mapa:", err);
      });
  }, [locale]);

  const cities: CityData[] = [
    { name: "Arenápolis - MT", area: 3153.11, top: 565, left: 528 },
    { name: "Barra do Bugres - MT", area: 550, top: 585, left: 525 },
    { name: "Brasnorte - MT", area: 7667.74, top: 490, left: 475 },
    { name: "Campo Novo do Parecis - MT", area: 43235.51, top: 535, left: 505 },
    { name: "Cláudia - MT", area: 3329, top: 450, left: 590 },
    { name: "Comodoro - MT", area: 12755, top: 537, left: 415 },
    { name: "Diamantino - MT", area: 51300.05, top: 550, left: 550 },
    { name: "Ipiranga do Norte - MT", area: 5206.60, top: 485, left: 570 },
    { name: "Juara - MT", area: 3275, top: 455, left: 505 },
    { name: "Marcelândia - MT", area: 3519.79, top: 440, left: 605 },
    { name: "Nortelândia - MT", area: 491.57, top: 565, left: 520 },
    { name: "Nova Marilândia - MT", area: 755.54, top: 562, left: 520 },
    { name: "Nova Maringá - MT", area: 26184.70, top: 500, left: 495 },
    { name: "Nova Mutum - MT", area: 4420.70, top: 535, left: 570 },
    { name: "Nova Olímpia - MT", area: 3006.70, top: 578, left: 515 },
    { name: "Novo Progresso - PA", area: 555.70, top: 265, left: 465 },
    { name: "Porto dos Gaúchos - MT", area: 1420, top: 465, left: 515 },
    { name: "Salto do Céu - MT", area: 2018.55, top: 615, left: 475 },
    { name: "Santa Rita do Trivelato - MT", area: 1400.31, top: 535, left: 590 },
    { name: "Santo Afonso - MT", area: 6049.70, top: 560, left: 515 },
    { name: "São José do Rio Claro - MT", area: 7107.81, top: 520, left: 540 },
    { name: "Sapezal - MT", area: 3509.80, top: 520, left: 450 },
    { name: "Sinop - MT", area: 4284.67, top: 455, left: 570 },
    { name: "Tabaporã - MT", area: 7260.70, top: 440, left: 540 },
    { name: "Tangará da Serra - MT", area: 21289.57, top: 565, left: 515 },
    { name: "União do Sul - MT", area: 2059.13, top: 440, left: 595 }
  ];

  const activeLocations: CityData[] = locations.length > 0
    ? locations.map(loc => ({
        name: loc.title,
        area: loc.area || '',
        top: loc.positionY,
        left: loc.positionX
      }))
    : cities;

  const sortedCities = [...activeLocations].sort((a, b) => a.name.localeCompare(b.name));

  const [selectedCityName, setSelectedCityName] = useState<string>("Diamantino - MT");
  const selectedCity = sortedCities.find(c => c.name === selectedCityName) || sortedCities[0] || { name: '', area: '', top: 0, left: 0 };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (sortedCities.length > 0 && !sortedCities.some(c => c.name === selectedCityName)) {
      setSelectedCityName(sortedCities[0].name);
    }
  }, [sortedCities, selectedCityName]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 580);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      setTimeout(() => {
        const activeOption = dropdownRef.current?.querySelector(`.${styles.isActive}`);
        if (activeOption) {
          activeOption.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }, 50);
    }
  }, [isDropdownOpen]);

  const mapTitle = data?.mapTitle || t.atuacao.title;
  const mapDescription = data?.mapDescription || t.atuacao.description;

  const renderAreaText = (city: CityData) => {
    const areaVal = city.area;
    if (!areaVal) return '';
    if (typeof areaVal === 'number') {
      return `${t.atuacao.areaLabel} ${areaVal.toLocaleString(locale === 'en' ? 'en-US' : 'pt-BR')} ${t.atuacao.areaUnit}`;
    }
    if (/[a-zA-Z]/.test(areaVal)) {
      return `${t.atuacao.areaLabel} ${areaVal}`;
    }
    return `${t.atuacao.areaLabel} ${areaVal} ${t.atuacao.areaUnit}`;
  };

  return (
    <section id="atuacao" className={styles.atuacao} data-node-id="36:1100">
      <div className={styles.container}>
        <div className={styles.topCol}>
          <div className="tag-badge light" data-node-id="36:1102">
            {t.atuacao.tag}
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
            <AnimatedText key={`atuacao-${locale}`} text={mapTitle} type="char" delay={0} stagger={0.02} />
          </h2>
          <p className={styles.description} data-node-id="36:1295" style={{ whiteSpace: 'pre-line' }}>
            {mapDescription}
          </p>
          <div className={styles.infoPanel}>
            <div className={styles.selectWrapper}>
              <button 
                className={`${styles.selectButton} ${isDropdownOpen ? styles.isOpen : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedCity?.name}</span>
                <div className={styles.selectIcon}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    ref={dropdownRef}
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    data-lenis-prevent
                  >
                    {sortedCities.map((city) => (
                      <button
                        key={city.name}
                        className={`${styles.dropdownOption} ${city.name === selectedCityName ? styles.isActive : ''}`}
                        onClick={() => {
                          setSelectedCityName(city.name);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {city.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className={styles.mapWrapper} data-node-id="36:1130">
          <div className={styles.mapContainer} data-node-id="36:1131">
            <div className={styles.mapMasker}>
              <svg 
                viewBox={isMobile ? "250 200 600 600" : "0 0 1195 1031"} 
                className={styles.mapSvg} 
                preserveAspectRatio="xMidYMid meet"
              >
                <image href={imgMapaCompleto} x="0" y="0" width="1195" height="1031" />
                
                <image href={imgMatoGrosso} x="373.5" y="329" width="368" height="348" />

                {sortedCities.map((city) => {
                  const isSelected = city.name === selectedCity?.name;
                  return (
                    <motion.g 
                      key={city.name}
                      initial={false}
                      animate={{ 
                        opacity: isSelected ? 1 : 0, 
                        scale: isSelected ? 1 : 0.5,
                        x: city.left,
                        y: city.top
                      }}
                      style={{ pointerEvents: 'auto' }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={styles.pinGroup} 
                      onClick={() => {
                        setSelectedCityName(city.name);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <g className={styles.pinIconSvg}>
                        {isSelected && (
                          <motion.circle
                            r="12"
                            fill="#e1fe00"
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{ opacity: 0, scale: 3.5 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                          />
                        )}
                        <g opacity={isSelected ? "1" : "0"}>
                          <image href={imgPin} width="50" height="50" x="-25" y="-25" />
                        </g>
                      </g>
                      <circle 
                        cx="0" 
                        cy="0" 
                        r="24" 
                        fill="transparent" 
                        className={styles.pinHitArea} 
                        aria-label={city.name}
                      />
                    </motion.g>
                  );
                })}
              </svg>
            </div>

            {/* HTML Overlay for Tooltips (avoids SVG foreignObject bugs) */}
            {selectedCity?.name && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', transform: 'translate(3.5%, 1.5%)' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCity.name}
                    className={styles.tooltipWrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      left: `${(selectedCity.left / 1195) * 100}%`,
                      top: `${(selectedCity.top / 1031) * 100}%`,
                      transform: 'translate(-50%, calc(-100% - 30px))',
                    }}
                  >
                    <div className={styles.starBorderContainer}>
                      <div className={styles.starBorderMask}>
                        <div className={styles.borderGradientBottom}></div>
                        <div className={styles.borderGradientTop}></div>
                      </div>
                      <div className={styles.pinTooltipInner}>
                        <div className={styles.pinTooltipCity}>{selectedCity.name}</div>
                        {selectedCity.area && (
                          <div className={styles.pinTooltipArea}>
                            {renderAreaText(selectedCity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.carouselWrapper}>
        <LogoCarousel logos={data?.mapLogos} />
      </div>
    </section>
  );
}
