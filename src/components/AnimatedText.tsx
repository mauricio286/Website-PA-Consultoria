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
  const [isAppReady, setIsAppReady] = useState(() => document.body.classList.contains('app-ready'));
  const [isVisible, setIsVisible] = useState(() => {
    if (sessionOnce && sessionKey) {
      return globalPlayedAnimations.has(sessionKey);
    }
    return false;
  });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isAppReady) return;
    
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('app-ready')) {
        setIsAppReady(true);
        observer.disconnect();
      }
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, [isAppReady]);

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

  const words = text.split(' ');

  const shouldAnimate = isVisible && isAppReady;

  let globalCharIndex = 0;

  return (
    <span ref={ref} className={`${styles.animatedTextWrapper} ${className}`}>
      {words.map((word, wordIndex) => {
        const chars = word.split('');
        
        return (
          <span key={wordIndex} className={styles.wordWrapper}>
            {type === 'char' ? (
              chars.map((char, charIndex) => {
                const currentIndex = globalCharIndex++;
                return (
                  <span 
                    key={charIndex}
                    className={`${styles.word} ${shouldAnimate ? styles.visible : ''}`}
                    style={{ 
                      transitionDelay: shouldAnimate ? `${delay + (currentIndex * stagger)}s` : '0s',
                      transitionDuration: shouldAnimate ? '' : '0s',
                      animationDelay: shouldAnimate ? `${delay + (currentIndex * stagger)}s` : '0s'
                    }}
                  >
                    {char}
                  </span>
                );
              })
            ) : (
              <span 
                className={`${styles.word} ${shouldAnimate ? styles.visible : ''}`}
                style={{ 
                  transitionDelay: shouldAnimate ? `${delay + (wordIndex * stagger)}s` : '0s',
                  transitionDuration: shouldAnimate ? '' : '0s',
                  animationDelay: shouldAnimate ? `${delay + (wordIndex * stagger)}s` : '0s'
                }}
              >
                {word}
              </span>
            )}
            {/* Add space after the word unless it's the last word */}
            {wordIndex < words.length - 1 && (
              <span className={styles.spaceWrapper}> </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
