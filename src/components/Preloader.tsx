import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';
import { imgLogoPa } from '../assets';

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;

    // Slower fill — feels more deliberate and premium
    const interval = setInterval(() => {
      const jump = currentProgress < 60
        ? Math.random() * 8 + 4   // moderate at start
        : Math.random() * 3 + 1;  // very slow near 90%

      currentProgress = Math.min(currentProgress + jump, 90);
      setProgress(currentProgress);
    }, 100);

    const finishLoading = () => {
      clearInterval(interval);
      setProgress(100);
      // Pause at 100% so the user can register it
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    // Max wait: 5 seconds total
    const maxTimeout = setTimeout(finishLoading, 5000);

    if (document.readyState === 'complete') {
      // Already loaded — show for at least 3.5 seconds regardless
      setTimeout(finishLoading, 3500);
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      clearInterval(interval);
      clearTimeout(maxTimeout);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {loading && (
        <motion.div
          className={styles.preloaderContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.logoWrapper}>
            <img src={imgLogoPa} alt="PA Consultoria" className={styles.logo} />
          </div>
          <div className={styles.progressContainer}>
            <motion.div
              className={styles.progressBar}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.08 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

