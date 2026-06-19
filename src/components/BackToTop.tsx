import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';


export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (
        typeof window !== 'undefined' && 
        (window as any).lenisInstance && 
        typeof (window as any).lenisInstance.scrollTo === 'function'
      ) {
        // Tell Lenis to scroll to absolute top
        (window as any).lenisInstance.scrollTo(0, { force: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.warn("Lenis scroll failed, falling back to native:", err);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}
      data-node-id="36:1822"
    >
      <button 
        onClick={scrollToTop} 
        className={styles.scrollBtn} 
        aria-label="Scroll to Top"
        data-node-id="36:1817"
      >
        <div className={styles.iconWrapper}>
          <span className={`material-symbols-rounded ${styles.arrowIcon}`} style={{ fontSize: '24px' }}>
            arrow_upward
          </span>
        </div>
      </button>
    </div>
  );
}
