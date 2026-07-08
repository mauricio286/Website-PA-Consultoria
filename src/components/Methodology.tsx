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
import { useLanguage } from '../i18n';

interface MethodologyProps {
  data?: HomePageData | null;
}

export default function Methodology({ data }: MethodologyProps) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);
  const { locale, t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });
  
  const symbolOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.7]);

  const fallbackCards = [
    {
      title: t.methodology.estrategia,
      description: t.methodology.estrategiaDesc,
      icon: imgChessKnight,
      image: imgImagem,
    },
    {
      title: t.methodology.execucao,
      description: t.methodology.execucaoDesc,
      icon: imgAvgTime,
      image: imgImagem,
    },
    {
      title: t.methodology.tecnologia,
      description: t.methodology.tecnologiaDesc,
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

  const badgeText = data?.methodologyBadge || t.methodology.tag;
  const titleText = data?.methodologyTitle || t.methodology.title;
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
                  key={`methodologyLine-${i}-${locale}-${line}`}
                  text={line} 
                  type="char" 
                  delay={i * 0.2} 
                  stagger={0.02} 
                  sessionOnce={true} 
                  sessionKey={`methodologyLine-${i}-${locale}-${line}`} 
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
