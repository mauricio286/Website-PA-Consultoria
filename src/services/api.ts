const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function getLocaleUrl(path: string, locale?: string): string {
  const url = `${API_URL}${path}`;
  if (locale) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}locale=${locale}`;
  }
  return url;
}

export interface MediaSize {
  url: string;
  width?: number;
  height?: number;
  mimeType?: string;
  filesize?: number;
  filename?: string;
}

// Tipo genérico para imagens/mídias retornadas pelo Payload
export interface Media {
  id: string;
  url: string;
  alt?: string;
  mimeType?: string;
  filename?: string;
  size?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: MediaSize;
    card?: MediaSize;
    hero?: MediaSize;
    [key: string]: MediaSize | undefined;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBALS TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface HomePageData {
  heroTitle?: string;
  heroSubtitle?: string;
  heroMediaType?: 'upload' | 'vimeo';
  heroVimeoUrl?: string;
  heroImage?: Media | string;
  heroImageTablet?: Media | string;
  heroImageMobile?: Media | string;
  heroCtaLabel?: string;
  heroCtaUrl?: string;
  heroLogos?: Array<{
    id?: string;
    logo: Media | string;
    alt: string;
  }>;
  introTitle?: string;
  introText?: any; // Lexical JSON
  introMediaType?: 'upload' | 'vimeo';
  introVimeoUrl?: string;
  introImage?: Media | string;
  introVideoWidth?: number;           // % do container (padrão 80)
  introVideoMaxWidth?: number;        // largura máxima em px (padrão 460)
  introVideoAlign?: 'left' | 'center' | 'right'; // alinhamento na coluna
  introVideoRadius?: number;          // border-radius do container externo
  introVideoInnerRadius?: number;     // border-radius do clip do vídeo (interno)
  introVideoAspectRatio?: string;     // ex: '16/9', '1/1', '4/3'
  introContainerBg?: string;          // cor de fundo hex
  introContainerPadding?: number;     // padding interno em px
  introContainerBorder?: boolean;     // exibir borda
  introContainerBorderColor?: string; // cor da borda hex
  introCtaLabel?: string;
  introCtaUrl?: string;
  bannerText?: string;
  bannerTextAlign?: 'left' | 'center' | 'right' | 'justify';
  bannerTextAccent?: string;
  bannerTextAccentColor?: string;
  bannerImage?: Media | string;
  statsTag?: string;
  statsTitle?: string;
  statsTitleAccent?: string;
  statsTitleAccentColor?: string;
  statsTitleAlign?: 'left' | 'center' | 'right' | 'justify';
  statsSubtext?: string;
  statsSubtextAlign?: 'left' | 'center' | 'right' | 'justify';
  stats?: Array<{
    id?: string;
    prefix?: string;
    value: number;
    suffix?: string;
    label: string;
    icon?: Media | string;
    color?: 'peach' | 'dark' | 'lime' | 'paleGreen' | 'bronze' | 'forest' | 'white' | 'gray' | 'softYellow' | 'softBlue' | 'custom';
    customBgColor?: string;
    customTextColor?: string;
  }>;
  methodologyBadge?: string;
  methodologyTitle?: string;
  methodologyTitleAlign?: 'left' | 'center' | 'right' | 'justify';
  methodologyCards?: Array<{
    id?: string;
    title: string;
    description: string;
    icon: Media | string;
    image: Media | string;
  }>;
  mapTag?: string;
  mapTitle?: string;
  mapDescription?: string;
  mapLogos?: Array<{
    id?: string;
    logo: Media | string;
    alt: string;
  }>;
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryImages?: Array<{
    id?: string;
    image: Media | string;
  }>;
  testimonialsTag?: string;
  testimonialsTitle?: string;
  testimonialsTitleAccent?: string;
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonUrl?: string;
}

export interface AboutPageData {
  heroImage?: Media | string;
  heroImageTablet?: Media | string;
  heroImageMobile?: Media | string;
  introTag?: string;
  title?: string;
  subtitle?: string;
  subtitleColor?: string;
  introText?: any;
  commitment?: {
    title?: string;
    text?: any;
  };
  vision?: {
    title?: string;
    text?: any;
  };
  values?: {
    title?: string;
    text?: any;
  };
  videoSectionTag?: string;
  videoSectionTitle?: string;
  videoSectionTitleAccent?: string;
  videoSectionTitleAccentColor?: string;
  institutionalVideoUrl?: string;
  timelineTag?: string;
  timelineTitle?: string;
  timeline?: Array<{
    id?: string;
    tag: string;
    year: string;
    text: any;
    image?: Media | string;
  }>;
}

export interface CareersPageData {
  heroImage?: Media | string;
  heroImageTablet?: Media | string;
  heroImageMobile?: Media | string;
  title?: string;
  titleHighlight?: string;
  titleHighlightColor?: string;
  introText?: string;
}

export interface ServicesPageData {
  heroImage?: Media | string;
  heroImageTablet?: Media | string;
  heroImageMobile?: Media | string;
  servicesBadge?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  servicesSubtitleColor?: string;
  servicesDescription?: string;
  servicesCards?: Array<{
    id?: string;
    title: string;
    shortDescription: string;
    slug: string;
  }>;
  ecosystemBadge?: string;
  ecosystemTitle?: string;
  ecosystemSubtitle?: string;
  ecosystemSubtitleColor?: string;
  ecosystemCards?: Array<{
    id?: string;
    title: string;
    image: Media | string;
    link: string;
  }>;
}

export interface ContactSettingsData {
  heroImage?: Media | string;
  heroImageTablet?: Media | string;
  heroImageMobile?: Media | string;
  mainEmail?: string;
  hrEmail?: string;
  formRecipientEmail?: string;
  careerRecipientEmail?: string;
  phone?: string;
  whatsapp?: string;
  formTitle?: string;
  formDescription?: string;
  addresses?: Array<{
    id?: string;
    title: string;
    address?: string;
    phone?: string;
    email?: string;
  }>;
}

export interface SiteSettingsData {
  siteName?: string;
  logo?: Media | string;
  footerText?: string;
}

export interface AldBioenergiaPageData {
  heroImage?: Media | string;
  title?: string;
  leftContent?: any; // Lexical JSON
  logoImage?: Media | string;
  indicators?: Array<{
    id?: string;
    value: string;
    description: string;
    icon: Media | string;
    theme: 'dark' | 'lime' | 'light';
  }>;
  section3Content?: any; // Lexical JSON
  section3Image?: Media | string;
  bottomContent?: any; // Lexical JSON;
}

export interface LavouraPageData {
  heroImage?: Media | string;
  title?: string;
  leftContent?: any; // Lexical JSON
  image?: Media | string;
  bottomContent?: any; // Lexical JSON;
}

export interface CentroPesquisaPageData {
  heroImage?: Media | string;
  title?: string;
  leftContent?: any; // Lexical JSON
  image?: Media | string;
}

export interface PalestrasPageData {
  heroImage?: Media | string;
  title?: string;
  leftContent?: any; // Lexical JSON
  image?: Media | string;
}


export interface FooterSettingsData {
  addresses?: Array<{
    id?: string;
    label: string;
    text: string;
    mapsUrl: string;
  }>;
  linkedinUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  slug?: string;
  shortDescription: string;
  description?: any; // Lexical JSON
  leftContent?: any; // Lexical JSON
  bottomContent?: any; // Lexical JSON
  longDescription?: any; // Keep for safety
  coverImage?: Media | string;
  coverImageTablet?: Media | string;
  coverImageMobile?: Media | string;
  illustrationImage?: Media | string;
  showIllustration?: boolean;
  cycleActive?: boolean;
  cycleColor?: string;
  cycleAccentColor?: string;
  cycleSteps?: Array<{
    id?: string;
    stepNumber: string;
    titleDark: string;
    titleLight: string;
    desc: string;
    icon: string;
  }>;
}

export interface Job {
  id: string;
  title: string;
  slug?: string;
  summary: string;
  description?: any; // Lexical JSON
  requirements?: Array<{
    id?: string;
    item: string;
  }>;
  responsibilities?: Array<{
    id?: string;
    item: string;
  }>;
  status: 'open' | 'paused' | 'closed';
  visible?: boolean;
  openingDate?: string;
  closingDate?: string;
  order?: number;
}

export interface MapLocation {
  id: string;
  title: string;
  city?: string;
  state?: string;
  area?: string;
  description?: string;
  positionX: number;
  positionY: number;
  order?: number;
  published?: boolean;
}

export interface TestimonialDoc {
  id: string;
  authorName: string;
  authorDescription: string;
  photo?: Media | string;
  quote: string;
  order?: number;
  published?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA IMPORTS & HELPER
// ─────────────────────────────────────────────────────────────────────────────

import cmsPt from '../data/cms/cms-pt.json';
import cmsEn from '../data/cms/cms-en.json';

const cmsDataMap: Record<string, any> = {
  pt: cmsPt,
  en: cmsEn,
};

function getStaticData(locale?: string) {
  const lang = locale || 'pt';
  return cmsDataMap[lang] || cmsPt;
}

// Mapa de mídias estáticas pré-compiladas no build (para Comparação Inteligente de Mídia)
const staticMediaMap = new Map<string, string>();

function registerStaticMedia(obj: any) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach(registerStaticMedia);
    return;
  }
  if (typeof obj.url === 'string' && obj.url.startsWith('/cms-media/')) {
    const filename = obj.filename || obj.url.replace('/cms-media/', '');
    if (filename) {
      staticMediaMap.set(filename, obj.url);
      const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      staticMediaMap.set(cleanName, obj.url);
    }
  }
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      registerStaticMedia(obj[key]);
    }
  }
}

registerStaticMedia(cmsPt);
registerStaticMedia(cmsEn);

// ─────────────────────────────────────────────────────────────────────────────
// SWR (STALE-WHILE-REVALIDATE) ENGINE
// ─────────────────────────────────────────────────────────────────────────────

const swrCache = new Map<string, any>();
const swrListeners = new Map<string, Set<(data: any) => void>>();

function subscribeSwr(key: string, callback?: (data: any) => void) {
  if (!callback) return;
  if (!swrListeners.has(key)) {
    swrListeners.set(key, new Set());
  }
  const set = swrListeners.get(key)!;
  set.add(callback);
}

function notifySwr(key: string, data: any) {
  const set = swrListeners.get(key);
  if (set) {
    set.forEach((cb) => {
      try {
        cb(data);
      } catch (e) {
        console.error('Erro ao notificar listener SWR:', e);
      }
    });
  }
}

function getSessionCache(key: string): any {
  try {
    const raw = sessionStorage.getItem(`cms_swr_${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSessionCache(key: string, value: any) {
  try {
    sessionStorage.setItem(`cms_swr_${key}`, JSON.stringify(value));
  } catch {}
}

async function fetchSwr<T>(
  key: string,
  fetcher: () => Promise<T>,
  initialFallback: T | null,
  onUpdate?: (data: T) => void
): Promise<T> {
  if (onUpdate) {
    subscribeSwr(key, onUpdate as any);
  }

  // 1. Revalidação em segundo plano (Live API Fetch)
  fetcher()
    .then((freshData) => {
      if (freshData) {
        swrCache.set(key, freshData);
        setSessionCache(key, freshData);
        notifySwr(key, freshData);
      }
    })
    .catch(() => {
      // Silencioso em ambiente estático/offline
    });

  // 2. Retorno instantâneo (0ms delay): Cache Memória -> SessionStorage -> Dados Estáticos
  if (swrCache.has(key)) {
    return swrCache.get(key);
  }
  const sessionData = getSessionCache(key);
  if (sessionData) {
    swrCache.set(key, sessionData);
    return sessionData;
  }

  return initialFallback as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// API METHODS (SWR HYBRID)
// ─────────────────────────────────────────────────────────────────────────────

export const api = {
  // Helper para formatar a URL da imagem (com suporte a variantes otimizadas e Comparação Inteligente de Mídia)
  getMediaUrl(media: Media | string | undefined | null, size?: 'hero' | 'card' | 'thumbnail'): string {
    if (!media) return '';

    // 1. Se for string simples (ex: caminho relativo ou absoluto)
    if (typeof media === 'string') {
      if (media.startsWith('http') || media.startsWith('data:') || media.startsWith('/cms-media/')) return media;
      const rawName = media.split('?')[0].split('/').pop() || '';
      const cleanName = decodeURIComponent(rawName).replace(/[^a-zA-Z0-9._-]/g, '_');
      if (cleanName && staticMediaMap.has(cleanName)) {
        return staticMediaMap.get(cleanName)!;
      }
      return `${API_URL}${media.startsWith('/') ? '' : '/'}${media}`;
    }

    // 2. Se for objeto Media do Payload
    let targetUrl = media.url;
    let targetFilename = media.filename;

    if (size && media.sizes && media.sizes[size]?.url) {
      targetUrl = media.sizes[size]!.url;
      if (media.sizes[size]!.filename) {
        targetFilename = media.sizes[size]!.filename;
      }
    }

    if (targetUrl) {
      if (targetUrl.startsWith('/cms-media/') || targetUrl.startsWith('data:')) return targetUrl;

      // Extrai o nome do arquivo para comparar com o mapa do build estático
      const rawName = targetFilename || targetUrl.split('?')[0].split('/').pop() || '';
      const cleanName = decodeURIComponent(rawName).replace(/[^a-zA-Z0-9._-]/g, '_');

      // COMPARAÇÃO INTELIGENTE: Se o arquivo já existe no build estático do Firebase, usa a versão estática rápida! (0ms delay)
      if (cleanName && staticMediaMap.has(cleanName)) {
        return staticMediaMap.get(cleanName)!;
      }

      // Se o cliente publicou uma imagem nova no Payload CMS pós-build, carrega da API do Payload
      if (targetUrl.startsWith('http')) return targetUrl;
      return `${API_URL}${targetUrl.startsWith('/') ? '' : '/'}${targetUrl}`;
    }

    return '';
  },

  // Helper para formatar a URL de embed do Vimeo (background loop automático sem áudio)
  getVimeoEmbedUrl(vimeoUrl?: string): string {
    if (!vimeoUrl) return '';
    const trimmed = vimeoUrl.trim();
    // Extrai os dígitos do ID do Vimeo
    const match = trimmed.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)?(\d+)/);
    const videoId = match ? match[1] : trimmed;
    if (!videoId || !/^\d+$/.test(videoId)) return '';
    return `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&autopause=0&dnt=1`;
  },

  // Globals
  async getHomePage(locale?: string, onUpdate?: (data: HomePageData) => void): Promise<HomePageData> {
    const lang = locale || 'pt';
    const key = `home-${lang}`;
    const fallback = getStaticData(lang).globals?.['home-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/home-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados da HomePage');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getAboutPage(locale?: string, onUpdate?: (data: AboutPageData) => void): Promise<AboutPageData> {
    const lang = locale || 'pt';
    const key = `about-${lang}`;
    const fallback = getStaticData(lang).globals?.['about-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/about-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados da AboutPage');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getServicesPage(locale?: string, onUpdate?: (data: ServicesPageData) => void): Promise<ServicesPageData> {
    const lang = locale || 'pt';
    const key = `services-${lang}`;
    const fallback = getStaticData(lang).globals?.['services-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/services-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados da ServicesPage');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getCareersPage(locale?: string, onUpdate?: (data: CareersPageData) => void): Promise<CareersPageData> {
    const lang = locale || 'pt';
    const key = `careers-${lang}`;
    const fallback = getStaticData(lang).globals?.['careers-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/careers-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados da página Carreiras');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getContactSettings(locale?: string, onUpdate?: (data: ContactSettingsData) => void): Promise<ContactSettingsData> {
    const lang = locale || 'pt';
    const key = `contact-${lang}`;
    const fallback = getStaticData(lang).globals?.['contact-settings'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/contact-settings', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados de ContactSettings');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getSiteSettings(locale?: string, onUpdate?: (data: SiteSettingsData) => void): Promise<SiteSettingsData> {
    const lang = locale || 'pt';
    const key = `site-${lang}`;
    const fallback = getStaticData(lang).globals?.['site-settings'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/site-settings', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados de SiteSettings');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getFooterSettings(locale?: string, onUpdate?: (data: FooterSettingsData) => void): Promise<FooterSettingsData> {
    const lang = locale || 'pt';
    const key = `footer-${lang}`;
    const fallback = getStaticData(lang).globals?.['footer-settings'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/footer-settings', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados de FooterSettings');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getAldBioenergiaPage(locale?: string, onUpdate?: (data: AldBioenergiaPageData) => void): Promise<AldBioenergiaPageData> {
    const lang = locale || 'pt';
    const key = `ald-${lang}`;
    const fallback = getStaticData(lang).globals?.['ald-bioenergia-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/ald-bioenergia-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados de AldBioenergiaPage');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getLavouraPage(locale?: string, onUpdate?: (data: LavouraPageData) => void): Promise<LavouraPageData> {
    const lang = locale || 'pt';
    const key = `lavoura-${lang}`;
    const fallback = getStaticData(lang).globals?.['lavoura-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/lavoura-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados de LavouraPage');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getCentroPesquisaPage(locale?: string, onUpdate?: (data: CentroPesquisaPageData) => void): Promise<CentroPesquisaPageData> {
    const lang = locale || 'pt';
    const key = `centro-pesquisa-${lang}`;
    const fallback = getStaticData(lang).globals?.['centro-pesquisa-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/centro-pesquisa-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados de CentroPesquisaPage');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  async getPalestrasPage(locale?: string, onUpdate?: (data: PalestrasPageData) => void): Promise<PalestrasPageData> {
    const lang = locale || 'pt';
    const key = `palestras-${lang}`;
    const fallback = getStaticData(lang).globals?.['palestras-page'] || {};
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/globals/palestras-page', lang));
        if (!res.ok) throw new Error('Erro ao buscar dados de PalestrasPage');
        return res.json();
      },
      fallback,
      onUpdate
    );
  },

  // Collections
  async getServices(locale?: string, onUpdate?: (data: Service[]) => void): Promise<Service[]> {
    const lang = locale || 'pt';
    const key = `collection-services-${lang}`;
    const fallback = getStaticData(lang).collections?.['services'] || [];
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/services?limit=100', lang));
        if (!res.ok) throw new Error('Erro ao buscar serviços');
        const resData = await res.json();
        return resData.docs;
      },
      fallback,
      onUpdate
    );
  },

  async getServiceBySlug(slug: string, locale?: string, onUpdate?: (data: Service | null) => void): Promise<Service | null> {
    const lang = locale || 'pt';
    const key = `service-slug-${slug}-${lang}`;
    const docs = getStaticData(lang).collections?.['services'] || [];
    const fallback = docs.find((s: Service) => s.slug === slug) || null;
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl(`/api/services?where[slug][equals]=${slug}`, lang));
        if (!res.ok) throw new Error('Erro ao buscar serviço por slug');
        const resData = await res.json();
        return resData.docs[0] || null;
      },
      fallback,
      onUpdate
    );
  },

  async getJobs(locale?: string, onUpdate?: (data: Job[]) => void): Promise<Job[]> {
    const lang = locale || 'pt';
    const key = `jobs-${lang}`;
    const fallback = getStaticData(lang).collections?.['jobs'] || [];
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/jobs?sort=order&where[visible][equals]=true', lang));
        if (!res.ok) throw new Error('Erro ao buscar vagas');
        const resData = await res.json();
        return resData.docs;
      },
      fallback,
      onUpdate
    );
  },

  async getMapLocations(locale?: string, onUpdate?: (data: MapLocation[]) => void): Promise<MapLocation[]> {
    const lang = locale || 'pt';
    const key = `map-locations-${lang}`;
    const fallback = getStaticData(lang).collections?.['map-locations'] || [];
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/map-locations?limit=100&sort=order&where[published][equals]=true', lang));
        if (!res.ok) throw new Error('Erro ao buscar localizações do mapa');
        const resData = await res.json();
        return resData.docs;
      },
      fallback,
      onUpdate
    );
  },

  async getTestimonials(locale?: string, onUpdate?: (data: TestimonialDoc[]) => void): Promise<TestimonialDoc[]> {
    const lang = locale || 'pt';
    const key = `testimonials-${lang}`;
    const fallback = getStaticData(lang).collections?.['testimonials'] || [];
    return fetchSwr(
      key,
      async () => {
        const res = await fetch(getLocaleUrl('/api/testimonials?limit=100&sort=order&where[published][equals]=true', lang));
        if (!res.ok) throw new Error('Erro ao buscar depoimentos');
        const resData = await res.json();
        return resData.docs;
      },
      fallback,
      onUpdate
    );
  },

  // Form Submissions (Permanece dinâmico via HTTP POST)
  async submitContact(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitJobApplication(formData: FormData): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_URL}/api/job-applications`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },
};


