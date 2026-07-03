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

type TabId = 'estrategia' | 'execucao' | 'tecnologia';

export default function Methodology() {
  const [activeTab, setActiveTab] = useState<TabId>('execucao'); // default active to match Figma 'Execução/Operação' default
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });
  
  // Transform scroll progress to opacity. 0 at the very start of entry, fading up to 0.7 when centered.
  const symbolOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.7]);

  const tabs = [
    {
      id: 'estrategia' as TabId,
      title: 'Estratégia',
      description: 'Decisões orientadas por pesquisa, objetivos e visão de longo prazo, transformando informações agronômicas em ações práticas que maximizam a produtividade, a rentabilidade e a sustentabilidade dos sistemas produtivos.',
      icon: imgChessKnight,
      nodeId: '21:716'
    },
    {
      id: 'execucao' as TabId,
      title: 'Execução',
      description: 'Decisões embasadas em dados, clima e mercado para mitigar riscos antes mesmo do plantio.',
      icon: imgAvgTime,
      nodeId: '21:837'
    },
    {
      id: 'tecnologia' as TabId,
      title: 'Tecnologia',
      description: 'Uso das melhores ferramentas de agricultura digital para otimizar recursos e monitorar a saúde da sua safra em tempo real.',
      icon: imgAutomation,
      nodeId: '21:851'
    }
  ];

  // Helper to change image based on active tab for visual interactivity
  const getTabImage = (id: TabId) => {
    if (id) return imgImagem;
    return imgImagem;
  };

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
        <div className={styles.header} data-node-id="21:712">
          <div className="tag-badge light" style={{ marginBottom: '20px' }} data-node-id="35:1082">
            Estrutura
          </div>
          <h2 className={styles.title} data-node-id="21:713">
            <AnimatedText text="Pilares Metodológicos" type="char" delay={0} stagger={0.02} />
          </h2>
        </div>

        <div className={styles.content} data-node-id="21:714">
          {/* Tabs Container */}
          <div className={styles.tabsCol} data-node-id="21:715">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles.tabCard} ${isActive ? styles.activeTab : styles.inactiveTab}`}
                  data-node-id={tab.id === 'estrategia' ? '21:716' : tab.id === 'execucao' ? '21:837' : '21:851'}
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
                src={getTabImage(activeTab)} 
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
