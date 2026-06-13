import { motion } from "motion/react";
import styles from './AnimatedCounter.module.css';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function DigitColumn({ digit, index, duration }: { digit: string, index: number, duration: number }) {
  const num = parseInt(digit, 10);
  if (isNaN(num)) {
    return (
      <span className={styles.digitWrapper}>
        <span className={styles.digitSpan}>
          {digit}
        </span>
      </span>
    );
  }
  
  // Limit effective index to max 2 so that digits after the 3rd don't infinitely increase in delay and loops
  const effectiveIndex = Math.min(index, 2);
  
  // O primeiro dígito tem 1 volta. O resto é limitado para não enrolar muito.
  const loops = index === 0 ? 1 : (effectiveIndex + 1); 
  const sequence: number[] = [];
  
  for (let i = 0; i < loops; i++) {
    for (let j = 0; j < 10; j++) {
      sequence.push(j);
    }
  }
  // Adiciona a sequência final até acertar o dígito alvo
  for (let j = 0; j <= num; j++) {
    sequence.push(j);
  }
  
  const targetIndex = sequence.length - 1;

  // Ajuste fino de timing: baseia o delay principal nos primeiros 3 dígitos.
  // Os dígitos finais ganham apenas um micro-stagger orgânico para terminarem quase juntos.
  const extraMicroDelay = index > 2 ? (index - 2) * 0.1 : 0;
  const actualDuration = Math.max(1.0, duration - effectiveIndex * 0.4);
  const actualDelay = (effectiveIndex * 0.45) + extraMicroDelay;

  return (
    <span 
      className={`${styles.digitWrapper} ${index > 0 ? styles.shifted : ''}`}
    >
      {/* Elemento invisível estático que garante o espaçamento correto no layout */}
      <span className={styles.invisiblePlaceholder}>
        {digit}
      </span>
      
      <motion.span
        initial={{ y: "0%" }}
        whileInView={{ 
          y: `-${(targetIndex / sequence.length) * 100}%`
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: actualDuration, 
          ease: [0.16, 1, 0.3, 1], // Curva de aceleração rápida com frenagem suave e fluida
          delay: actualDelay
        }}
        className={styles.motionContainer}
      >
        {sequence.map((n, i) => (
          <span 
            key={i} 
            className={styles.digitSpan} 
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function AnimatedCounter({ value, prefix = "", suffix = "", duration = 2.5 }: AnimatedCounterProps) {
  // Formata o número de acordo com o padrão local (Ex: 1.000 em vez de 1000)
  const valStr = Intl.NumberFormat("pt-BR").format(value);
  const digits = valStr.split('');
  
  return (
    <span className={styles.container} aria-label={`${prefix}${value}${suffix}`}>
      {prefix && (
        <span className={styles.prefixSuffix}>
          {prefix}
        </span>
      )}
      {digits.map((digit, i) => (
        <DigitColumn 
          key={`${i}-${digit}`} 
          digit={digit} 
          index={i}
          duration={duration} 
        />
      ))}
      {suffix && (
        <span className={`${styles.prefixSuffix} ${styles.suffix}`}>
          {suffix}
        </span>
      )}
    </span>
  );
}
