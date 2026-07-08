import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './CicloPrecisao.module.css';
import AnimatedText from '../../../../components/AnimatedText';
import { useLanguage } from '../../../../i18n';

export default function CicloPrecisao() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [rotationStep, setRotationStep] = useState(0);

  const steps = [
    {
      id: 1,
      titleDark: t.cicloPrecisao.step1TitleDark,
      titleLight: t.cicloPrecisao.step1TitleLight,
      desc: t.cicloPrecisao.step1Desc,
      icon: "agriculture"
    },
    {
      id: 2,
      titleDark: t.cicloPrecisao.step2TitleDark,
      titleLight: t.cicloPrecisao.step2TitleLight,
      desc: t.cicloPrecisao.step2Desc,
      icon: "eco"
    },
    {
      id: 3,
      titleDark: t.cicloPrecisao.step3TitleDark,
      titleLight: t.cicloPrecisao.step3TitleLight,
      desc: t.cicloPrecisao.step3Desc,
      icon: "biotech"
    },
    {
      id: 4,
      titleDark: t.cicloPrecisao.step4TitleDark,
      titleLight: t.cicloPrecisao.step4TitleLight,
      desc: t.cicloPrecisao.step4Desc,
      icon: "warehouse"
    }
  ];



  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
    setRotationStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
    setRotationStep((prev) => prev + 1);
  };

  const currentStep = steps[activeStep];

  return (
    <section className={styles.container}>
      <div className={styles.contentRow}>
        
        {/* Ciclo Visual */}
        <div className={styles.cycleColumn}>
          <div className={styles.cycleRingWrapper}>
            {/* Ícone fixo no centro que muda com a etapa */}
            <AnimatePresence mode="wait">
              <motion.span 
                key={`icon-${activeStep}`}
                className={`material-symbols-rounded ${styles.cycleCenterIcon}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep.icon}
              </motion.span>
            </AnimatePresence>
            
            {/* Anel SVG animado */}
            <motion.div 
              className={styles.cycleSvg}
              animate={{ rotate: rotationStep * 90 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="cycleGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#88a668" stopOpacity="1" />
                    <stop offset="100%" stopColor="#88a668" stopOpacity="0" />
                  </linearGradient>
                </defs>
              <circle 
                cx="200" 
                cy="200" 
                r="190" 
                stroke="url(#cycleGrad)" 
                strokeWidth="5" 
                strokeLinecap="round" 
                pathLength="100"
                strokeDasharray="90 10" 
                transform="rotate(20 200 200)"
              />
              <path d="M 388 139 L 384 153 L 374 142" stroke="#88a668" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          </div>
        </div>

        {/* Textos da etapa e Controles */}
        <div className={styles.textColumn}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`text-${activeStep}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={styles.stepTextContainer}
            >
              <div className={styles.stepBadge}>{currentStep.id}</div>
              <h3 className={styles.stepTitle}>
                <span className={styles.titleDark}>
                  <AnimatedText text={currentStep.titleDark} type="word" delay={0.1} once={false} />
                </span>
                <span className={styles.titleLight}>
                  <AnimatedText text={currentStep.titleLight} type="word" delay={0.2} once={false} />
                </span>
              </h3>
              <p className={styles.stepDesc}>{currentStep.desc}</p>
              
              <div className={styles.controls}>
                <button 
                  className={styles.controlBtn} 
                  onClick={handlePrev}
                  aria-label="Etapa anterior"
                >
                  <span className="material-symbols-rounded">chevron_left</span>
                </button>
                <button 
                  className={styles.controlBtn} 
                  onClick={handleNext}
                  aria-label="Próxima etapa"
                >
                  <span className="material-symbols-rounded">chevron_right</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
