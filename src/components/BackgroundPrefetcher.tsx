import { useEffect } from 'react';
import { useLanguage } from '../i18n';
import { api } from '../services/api';

// Define the loaders for each route to match page-specific API fetches.
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

export default function BackgroundPrefetcher() {
  const { locale } = useLanguage();

  useEffect(() => {
    let active = true;

    const runPrefetch = () => {
      if (!active) return;

      const paths = Object.keys(loaders);
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

      // Filter out the page the user is currently on (since it's already loaded)
      const pathsToPrefetch = paths.filter((p) => p !== currentPath);

      // Fetch each route's payload and preload its Hero image in the background
      pathsToPrefetch.forEach((path) => {
        const loader = loaders[path];
        if (!loader) return;

        loader.fetchData(locale)
          .then((data) => {
            if (!active) return;

            // Determine the correct media URL based on screen size (matching picture tag media queries)
            const width = window.innerWidth;
            let selectedMedia = undefined;

            if (width <= 580) {
              selectedMedia = data?.heroImageMobile || data?.coverImageMobile;
            } else if (width <= 1024) {
              selectedMedia = data?.heroImageTablet || data?.coverImageTablet;
            }

            if (!selectedMedia) {
              selectedMedia = loader.getHeroImage(data);
            }

            const mediaUrl = api.getMediaUrl(selectedMedia);

            if (mediaUrl) {
              // Preload in browser cache by instantiating an Image
              const img = new Image();
              img.src = mediaUrl;
            }
          })
          .catch((err) => {
            // Silently catch so it doesn't interrupt anything in production
            console.warn(`[Prefetcher] Failed to prefetch data/image for ${path}:`, err);
          });
      });
    };

    // Use requestIdleCallback if available, with a safety timeout, to run when CPU is idle.
    // Otherwise, fallback to a 4-second delay.
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(
        () => {
          setTimeout(runPrefetch, 2500); // 2.5 seconds delay after idle
        },
        { timeout: 10000 } // execute within 10s maximum
      );

      return () => {
        active = false;
        (window as any).cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(runPrefetch, 4500); // 4.5s delay fallback
      return () => {
        active = false;
        clearTimeout(timer);
      };
    }
  }, [locale]);

  return null; // Silent component
}
