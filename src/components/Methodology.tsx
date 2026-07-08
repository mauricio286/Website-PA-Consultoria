import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import styles from './Methodology.module.css';
import { 
  imgChessKnight, 
  imgAvgTime, 
  imgAutomation, 
  imgImagem,
  imgSimbol 
} from '../assets';
import AnimatedText from './AnimatedText';
import { api } from '../services/api';
import type { HomePageData } from '../services/api';

interface MethodologyProps {
  data?: HomePageData | null;
}

export default function Methodology({ data }: MethodologyProps) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });
  
  // Transform scroll progress to opacity. 0 at the very start of entry, fading up to 0.7 when centered.
  const symbolOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.7]);

  const fallbackCards = [
    {
      title: 'Estratégia',
      description: 'Decisões orientadas por pesquisa, objetivos e visão de longo prazo, transformando informações agronômicas em ações práticas que maximizam a produtividade, a rentabilidade e a sustentabilidade dos sistemas produtivos.',
      icon: imgChessKnight,
      image: imgImagem,
    },
    {
      title: 'Execução',
      description: 'Decisões embasadas em dados, clima e mercado para mitigar riscos antes mesmo do plantio.',
      icon: imgAvgTime,
      image: imgImagem,
    },
    {
      title: 'Tecnologia',
      description: 'Uso das melhores ferramentas de agricultura digital para otimizar recursos e monitorar a saúde da sua safra em tempo real.',
      icon: imgAutomation,
      image: imgImagem,
    }
  ];

  const cards = data?.methodologyCards && data.methodologyCards.length > 0
    ? data.methodologyCards.map((card) => ({
        title: card.title,
        description: card.description,
        icon: api.getMediaUrl(card.icon),
        image: api.getMediaUrl(card.image),
      }))
    : fallbackCards;

  const safeActiveIndex = activeTabIndex < cards.length ? activeTabIndex : 0;
  const activeCard = cards[safeActiveIndex];

  const badgeText = data?.methodologyBadge || 'Estrutura';
  const titleText = data?.methodologyTitle || 'Pilares Metodológicos';
  const titleAlign = data?.methodologyTitleAlign || 'left';

  // Split title by newline \n
  const titleLines = titleText.split('\n').map(l => l.trim()).filter(Boolean);

  return (
    <section ref={containerRef} id="methodology" className={styles.methodology} data-node-id="35:1024">
      {/* Decorative leaf background symbol on the right side */}
      <motion.div 
        className={styles.bgDecoration} 
        aria-hidden="true" 
        data-node-id="35:1025"
        style={{ opacity: symbolOpacity }}
      >
        <img src={imgSimbol} alt="" className={styles.bgEmblem} />
      </motion.div>
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        <div 
          className={styles.header} 
          data-node-id="21:712"
          style={{ 
            textAlign: titleAlign as any,
            alignItems: titleAlign === 'center' 
              ? 'center' 
              : titleAlign === 'right' 
                ? 'flex-end' 
                : 'flex-start'
          }}
        >
          <div className="tag-badge light" style={{ marginBottom: '20px' }} data-node-id="35:1082">
            {badgeText}
          </div>
          <h2 
            className={styles.title} 
            data-node-id="21:713"
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              textAlign: titleAlign as any 
            }}
          >
            {titleLines.map((line, i) => (
              <span 
                key={i} 
                style={{ 
                  display: 'block',
                  textAlign: titleAlign as any,
                  width: '100%'
                }}
              >
                <AnimatedText 
                  text={line} 
                  type="char" 
                  delay={i * 0.2} 
                  stagger={0.02} 
                  sessionOnce={true} 
                  sessionKey={`methodologyLine-${i}`} 
                />
              </span>
            ))}
          </h2>
        </div>

        <div className={styles.content} data-node-id="21:714">
          {/* Tabs Container */}
          <div className={styles.tabsCol} data-node-id="21:715">
            {cards.map((tab, idx) => {
              const isActive = safeActiveIndex === idx;
              return (
                <button 
                  key={idx}
                  onClick={() => setActiveTabIndex(idx)}
                  className={`${styles.tabCard} ${isActive ? styles.activeTab : styles.inactiveTab}`}
                >
                  <div className={styles.iconWrapper}>
                    <img 
                      src={tab.icon} 
                      alt="" 
                      className={`${styles.tabIcon} ${isActive ? styles.activeIcon : styles.inactiveIcon}`}
                    />
                  </div>
                  <div className={styles.textWrapper}>
                    <h3 className={styles.tabTitle}>{tab.title}</h3>
                    <p className={styles.tabDescription}>{tab.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Graphic/Image Column */}
          <div className={styles.imageCol} data-node-id="21:815">
            <div className={styles.imageWrapper}>
              <img 
                src={activeCard?.image} 
                alt="Methodology illustration" 
                className={styles.mainImage} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
