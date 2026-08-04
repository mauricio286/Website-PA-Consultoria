import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';
import { imgLogoPa } from '../assets';
import { useLanguage } from '../i18n';
import { api } from '../services/api';

interface PreloaderProps {
  onDone: () => void;
}

// Define the loaders for each route to match page-specific API fetches on initial load.
const loaders: Record<string, {
  fetchData: (locale: string) => Promise<any>;
  getHeroImage: (data: any) => any;
}> = {
  '/': {
    fetchData: (locale) => api.getHomePage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/quem-somos': {
    fetchData: (locale) => api.getAboutPage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/servicos': {
    fetchData: (locale) => api.getServicesPage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/consultoriaagronomica': {
    fetchData: (locale) => api.getServiceBySlug('consultoria-agronomica', locale),
    getHeroImage: (data) => data?.coverImage,
  },
  '/unita': {
    fetchData: (locale) => api.getServiceBySlug('unita', locale),
    getHeroImage: (data) => data?.coverImage,
  },
  '/agriculturaprecisao': {
    fetchData: (locale) => api.getServiceBySlug('agricultura-de-precisao', locale),
    getHeroImage: (data) => data?.coverImage,
  },
  '/gestaocompras': {
    fetchData: (locale) => api.getServiceBySlug('gestao-de-compras', locale),
    getHeroImage: (data) => data?.coverImage,
  },
  '/aldbioenergia': {
    fetchData: (locale) => api.getAldBioenergiaPage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/lavoura': {
    fetchData: (locale) => api.getLavouraPage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/palestras': {
    fetchData: (locale) => api.getPalestrasPage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/centropesquisa': {
    fetchData: (locale) => api.getCentroPesquisaPage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/carreiras': {
    fetchData: (locale) => api.getCareersPage(locale),
    getHeroImage: (data) => data?.heroImage,
  },
  '/contato': {
    fetchData: (locale) => api.getContactSettings(locale),
    getHeroImage: (data) => data?.heroImage,
  },
};

export default function Preloader({ onDone }: PreloaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { locale } = useLanguage();

  useEffect(() => {
    let currentProgress = 0;
    let isApiAndImageDone = false;
    let isMinTimeDone = true;
    let isWindowLoaded = false;
    let isFinished = false;

    // Fast progress fill
    const interval = setInterval(() => {
      if (isFinished) return;
      const jump = currentProgress < 70
        ? Math.random() * 15 + 10  // rápida evolução inicial
        : Math.random() * 5 + 2;

      currentProgress = Math.min(currentProgress + jump, 90);
      setProgress(currentProgress);
    }, 50);

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };

    // Safety timeout de 4 segundos para evitar telas travadas
    const safetyTimeout = setTimeout(() => {
      console.warn("Preloader safety timeout reached. Forcing loading finished.");
      finishLoading();
    }, 4000);

    // Check window load state
    const handleWindowLoad = () => {
      isWindowLoaded = true;
      checkAllConditions();
    };
    if (document.readyState === 'complete') {
      isWindowLoaded = true;
    } else {
      window.addEventListener('load', handleWindowLoad, { once: true });
    }

    const checkAllConditions = () => {
      if (isFinished) return;
      if (isMinTimeDone && isWindowLoaded && isApiAndImageDone) {
        clearTimeout(safetyTimeout);
        finishLoading();
      }
    };

    const markApiAndImageDone = () => {
      isApiAndImageDone = true;
      checkAllConditions();
    };

    // Route detection to only load page-specific Hero image
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const loader = loaders[path];

    if (!loader) {
      // If no CMS loader exists for this path (static pages / not found), mark done
      isApiAndImageDone = true;
      checkAllConditions();
    } else {
      loader.fetchData(locale)
        .then((data) => {
          if (isFinished) return;

          // Determine the correct media URL based on screen size (matching the picture tag queries)
          const width = window.innerWidth;
          let selectedMedia = undefined;

          // Check if page data has responsive images (heroImageTablet/heroImageMobile)
          if (width <= 580) {
            selectedMedia = data?.heroImageMobile || data?.coverImageMobile;
          } else if (width <= 1024) {
            selectedMedia = data?.heroImageTablet || data?.coverImageTablet;
          }

          if (!selectedMedia) {
            selectedMedia = loader.getHeroImage(data);
          }

          const targetSize = width <= 580 ? 'thumbnail' : width <= 1024 ? 'card' : 'hero';
          const mediaUrl = api.getMediaUrl(selectedMedia, targetSize);

          if (mediaUrl) {
            const img = new Image();
            img.src = mediaUrl;
            img.onload = markApiAndImageDone;
            img.onerror = markApiAndImageDone; // Don't block if image loading fails
          } else {
            markApiAndImageDone();
          }
        })
        .catch((err) => {
          console.error("Error fetching page data in preloader:", err);
          markApiAndImageDone(); // Don't block if API call fails
        });
    }

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      window.removeEventListener('load', handleWindowLoad);
      isFinished = true;
    };
  }, [locale]);

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

