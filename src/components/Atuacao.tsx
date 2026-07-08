import { useState } from 'react';
import styles from './Atuacao.module.css';
import { imgMapaCompleto, imgMatoGrosso, imgPin } from '../assets';
import AnimatedText from './AnimatedText';
import LogoCarousel from './LogoCarousel';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n';

interface CityData {
  name: string;
  area: number;
  top: number;
  left: number;
}

export default function Atuacao() {
  const { locale, t } = useLanguage();
  
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

  const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name));

  const [selectedCityName, setSelectedCityName] = useState<string>(sortedCities[0].name);
  const selectedCity = sortedCities.find(c => c.name === selectedCityName) || sortedCities[0];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            <AnimatedText key={`atuacao-${locale}`} text={t.atuacao.title} type="char" delay={0} stagger={0.02} />
          </h2>
          <p className={styles.description} data-node-id="36:1295">
            {t.atuacao.description}
          </p>
          <div className={styles.infoPanel}>
            <div className={styles.selectWrapper}>
              <button 
                className={`${styles.selectButton} ${isDropdownOpen ? styles.isOpen : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedCity.name}</span>
                <div className={styles.selectIcon}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
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
            <svg viewBox="0 0 1195 1031" className={styles.mapSvg} preserveAspectRatio="xMidYMid meet">
              <image href={imgMapaCompleto} x="0" y="0" width="1195" height="1031" />
              
              <image href={imgMatoGrosso} x="373.5" y="329" width="368" height="348" />

              {sortedCities.map((city) => {
                const isSelected = city.name === selectedCity.name;
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
                    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={styles.pinGroup} 
                    onClick={() => {
                      setSelectedCityName(city.name);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <g className={styles.pinIconSvg}>
                      <g opacity={isSelected ? "1" : "0"}>
                        <image href={imgPin} width="30" height="30" x="-15" y="-15" />
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

            {/* HTML Overlay for Tooltips (avoids SVG foreignObject bugs) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', transform: 'translate(3.5%, 1.5%)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCity.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute',
                    left: `${(selectedCity.left / 1195) * 100}%`,
                    top: `${(selectedCity.top / 1031) * 100}%`,
                    transform: 'translate(-50%, calc(-100% - 20px))',
                    zIndex: 20,
                  }}
                >
                  <div className={styles.starBorderContainer}>
                    <div className={styles.starBorderMask}>
                      <div className={styles.borderGradientBottom}></div>
                      <div className={styles.borderGradientTop}></div>
                    </div>
                    <div className={styles.pinTooltipInner}>
                      <div className={styles.pinTooltipCity}>{selectedCity.name}</div>
                      <div className={styles.pinTooltipArea}>{t.atuacao.areaLabel} {selectedCity.area.toLocaleString(locale === 'en' ? 'en-US' : 'pt-BR')} {t.atuacao.areaUnit}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

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
