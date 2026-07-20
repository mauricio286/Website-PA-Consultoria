const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function getLocaleUrl(path: string, locale?: string): string {
  const url = `${API_URL}${path}`;
  if (locale) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}locale=${locale}`;
  }
  return url;
}

// Tipo genérico para imagens/mídias retornadas pelo Payload
export interface Media {
  id: string;
  url: string;
  alt?: string;
  mimeType?: string;
  size?: number;
  width?: number;
  height?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBALS TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface HomePageData {
  heroTitle?: string;
  heroSubtitle?: string;
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
  introImage?: Media | string;
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

// ─────────────────────────────────────────────────────────────────────────────
// API METHODS
// ─────────────────────────────────────────────────────────────────────────────

export const api = {
  // Helper para formatar a URL da imagem
  getMediaUrl(media: Media | string | undefined | null): string {
    if (!media) return '';
    if (typeof media === 'string') {
      if (media.startsWith('http') || media.startsWith('data:') || media.startsWith('/cms-media/')) return media;
      return `${API_URL}${media}`;
    }
    if (media.url) {
      if (media.url.startsWith('http') || media.url.startsWith('/cms-media/')) return media.url;
      return `${API_URL}${media.url}`;
    }
    return '';
  },

  // Globals
  async getHomePage(locale?: string): Promise<HomePageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['home-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/home-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da HomePage');
    return res.json();
  },

  async getAboutPage(locale?: string): Promise<AboutPageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['about-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/about-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da AboutPage');
    return res.json();
  },

  async getServicesPage(locale?: string): Promise<ServicesPageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['services-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/services-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da ServicesPage');
    return res.json();
  },

  async getCareersPage(locale?: string): Promise<CareersPageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['careers-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/careers-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da página Carreiras');
    return res.json();
  },

  async getContactSettings(locale?: string): Promise<ContactSettingsData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['contact-settings'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/contact-settings', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de ContactSettings');
    return res.json();
  },

  async getSiteSettings(locale?: string): Promise<SiteSettingsData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['site-settings'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/site-settings', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de SiteSettings');
    return res.json();
  },

  async getFooterSettings(locale?: string): Promise<FooterSettingsData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['footer-settings'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/footer-settings', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de FooterSettings');
    return res.json();
  },

  async getAldBioenergiaPage(locale?: string): Promise<AldBioenergiaPageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['ald-bioenergia-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/ald-bioenergia-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de AldBioenergiaPage');
    return res.json();
  },

  async getLavouraPage(locale?: string): Promise<LavouraPageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['lavoura-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/lavoura-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de LavouraPage');
    return res.json();
  },

  async getCentroPesquisaPage(locale?: string): Promise<CentroPesquisaPageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['centro-pesquisa-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/centro-pesquisa-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de CentroPesquisaPage');
    return res.json();
  },

  async getPalestrasPage(locale?: string): Promise<PalestrasPageData> {
    const data = getStaticData(locale);
    const globalData = data.globals?.['palestras-page'];
    if (globalData && Object.keys(globalData).length > 0) {
      return globalData;
    }
    const res = await fetch(getLocaleUrl('/api/globals/palestras-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de PalestrasPage');
    return res.json();
  },

  // Collections
  async getServices(locale?: string): Promise<Service[]> {
    const data = getStaticData(locale);
    const docs = data.collections?.['services'];
    if (Array.isArray(docs) && docs.length > 0) {
      return docs;
    }
    const res = await fetch(getLocaleUrl('/api/services?limit=100', locale));
    if (!res.ok) throw new Error('Erro ao buscar serviços');
    const resData = await res.json();
    return resData.docs;
  },

  async getServiceBySlug(slug: string, locale?: string): Promise<Service | null> {
    const data = getStaticData(locale);
    const docs = data.collections?.['services'];
    if (Array.isArray(docs) && docs.length > 0) {
      const found = docs.find((s: Service) => s.slug === slug);
      if (found) return found;
    }
    const res = await fetch(getLocaleUrl(`/api/services?where[slug][equals]=${slug}`, locale));
    if (!res.ok) throw new Error('Erro ao buscar serviço por slug');
    const resData = await res.json();
    return resData.docs[0] || null;
  },

  async getJobs(locale?: string): Promise<Job[]> {
    const data = getStaticData(locale);
    const docs = data.collections?.['jobs'];
    if (Array.isArray(docs) && docs.length > 0) {
      return docs;
    }
    const res = await fetch(getLocaleUrl('/api/jobs?sort=order&where[visible][equals]=true', locale));
    if (!res.ok) throw new Error('Erro ao buscar vagas');
    const resData = await res.json();
    return resData.docs;
  },

  async getMapLocations(locale?: string): Promise<MapLocation[]> {
    const data = getStaticData(locale);
    const docs = data.collections?.['map-locations'];
    if (Array.isArray(docs) && docs.length > 0) {
      return docs;
    }
    const res = await fetch(getLocaleUrl('/api/map-locations?limit=100&sort=order&where[published][equals]=true', locale));
    if (!res.ok) throw new Error('Erro ao buscar localizações do mapa');
    const resData = await res.json();
    return resData.docs;
  },

  async getTestimonials(locale?: string): Promise<TestimonialDoc[]> {
    const data = getStaticData(locale);
    const docs = data.collections?.['testimonials'];
    if (Array.isArray(docs) && docs.length > 0) {
      return docs;
    }
    const res = await fetch(getLocaleUrl('/api/testimonials?limit=100&sort=order&where[published][equals]=true', locale));
    if (!res.ok) throw new Error('Erro ao buscar depoimentos');
    const resData = await res.json();
    return resData.docs;
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

