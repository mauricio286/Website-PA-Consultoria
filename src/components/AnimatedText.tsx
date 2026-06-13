import { useEffect, useRef, useState } from 'react';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  type?: 'word' | 'char';
  once?: boolean;
  className?: string;
  sessionOnce?: boolean;
  sessionKey?: string;
}

const globalPlayedAnimations = new Set<string>();

export default function AnimatedText({ 
  text, 
  delay = 0, 
  stagger = 0.05,
  className = '',
  type = 'word',
  once = true,
  sessionOnce = false,
  sessionKey = 'animatedText'
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (sessionOnce && sessionKey) {
      return globalPlayedAnimations.has(sessionKey);
    }
    return false;
  });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sessionOnce && sessionKey) {
            globalPlayedAnimations.add(sessionKey);
          }
          if (once || sessionOnce) {
            observer.disconnect(); // Animate only once se pedido
          }
        } else if (!once && !sessionOnce) {
          setIsVisible(false); // Reset animation
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (currentRef && !isVisible) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  const items = type === 'char' ? text.split('') : text.split(' ');

  return (
    <span ref={ref} className={`${styles.animatedTextWrapper} ${className}`}>
      {items.map((item, index) => {
        const isSpace = item === ' ';
        return (
          <span key={index} className={styles.wordWrapper}>
            <span 
              className={`${styles.word} ${isVisible ? styles.visible : ''}`}
              style={{ 
                transitionDelay: isVisible ? `${delay + (index * stagger)}s` : '0s',
                transitionDuration: isVisible ? '' : '0s',
                animationDelay: isVisible ? `${delay + (index * stagger)}s` : '0s'
              }}
            >
              {isSpace ? '\u00A0' : item}
            </span>
            {type === 'word' && index < items.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </span>
  );
}
