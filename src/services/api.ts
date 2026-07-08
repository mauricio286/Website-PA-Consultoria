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
  bannerImage?: Media | string;
  statsTitle?: string;
  statsTitleAccent?: string;
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
  testimonialsTitle?: string;
  testimonialsTitleAccent?: string;
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonUrl?: string;
}

export interface AboutPageData {
  heroImage?: Media | string;
  title?: string;
  subtitle?: string;
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
  videoSectionTitle?: string;
  videoSectionTitleAccent?: string;
  institutionalVideoUrl?: string;
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
  title?: string;
  titleHighlight?: string;
  introText?: string;
}

export interface ServicesPageData {
  heroImage?: Media | string;
  servicesBadge?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
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
  ecosystemCards?: Array<{
    id?: string;
    title: string;
    image: Media | string;
    link: string;
  }>;
}

export interface ContactSettingsData {
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

export interface FooterSettingsData {
  addresses?: Array<{
    id?: string;
    label: string;
    text: string;
    mapsUrl: string;
  }>;
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
  longDescription?: any; // Keep for safety
  coverImage?: Media | string;
  illustrationImage?: Media | string;
  showIllustration?: boolean;
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
// API METHODS
// ─────────────────────────────────────────────────────────────────────────────

export const api = {
  // Helper para formatar a URL da imagem (Payload retorna caminhos relativos na mídia local)
  getMediaUrl(media: Media | string | undefined | null): string {
    if (!media) return '';
    if (typeof media === 'string') {
      if (media.startsWith('http') || media.startsWith('data:')) return media;
      return `${API_URL}${media}`;
    }
    if (media.url) {
      if (media.url.startsWith('http')) return media.url;
      return `${API_URL}${media.url}`;
    }
    return '';
  },

  // Globals
  async getHomePage(locale?: string): Promise<HomePageData> {
    const res = await fetch(getLocaleUrl('/api/globals/home-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da HomePage');
    return res.json();
  },

  async getAboutPage(locale?: string): Promise<AboutPageData> {
    const res = await fetch(getLocaleUrl('/api/globals/about-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da AboutPage');
    return res.json();
  },

  async getServicesPage(locale?: string): Promise<ServicesPageData> {
    const res = await fetch(getLocaleUrl('/api/globals/services-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da ServicesPage');
    return res.json();
  },

  async getCareersPage(locale?: string): Promise<CareersPageData> {
    const res = await fetch(getLocaleUrl('/api/globals/careers-page', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados da página Carreiras');
    return res.json();
  },

  async getContactSettings(locale?: string): Promise<ContactSettingsData> {
    const res = await fetch(getLocaleUrl('/api/globals/contact-settings', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de ContactSettings');
    return res.json();
  },

  async getSiteSettings(locale?: string): Promise<SiteSettingsData> {
    const res = await fetch(getLocaleUrl('/api/globals/site-settings', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de SiteSettings');
    return res.json();
  },

  async getFooterSettings(locale?: string): Promise<FooterSettingsData> {
    const res = await fetch(getLocaleUrl('/api/globals/footer-settings', locale));
    if (!res.ok) throw new Error('Erro ao buscar dados de FooterSettings');
    return res.json();
  },

  // Collections
  async getServices(locale?: string): Promise<Service[]> {
    const res = await fetch(getLocaleUrl('/api/services?sort=order&where[published][equals]=true', locale));
    if (!res.ok) throw new Error('Erro ao buscar serviços');
    const data = await res.json();
    return data.docs;
  },

  async getServiceBySlug(slug: string, locale?: string): Promise<Service | null> {
    const res = await fetch(getLocaleUrl(`/api/services?where[slug][equals]=${slug}`, locale));
    if (!res.ok) throw new Error('Erro ao buscar serviço por slug');
    const data = await res.json();
    return data.docs[0] || null;
  },

  async getJobs(locale?: string): Promise<Job[]> {
    const res = await fetch(getLocaleUrl('/api/jobs?sort=order&where[visible][equals]=true', locale));
    if (!res.ok) throw new Error('Erro ao buscar vagas');
    const data = await res.json();
    return data.docs;
  },

  async getMapLocations(locale?: string): Promise<MapLocation[]> {
    const res = await fetch(getLocaleUrl('/api/map-locations?limit=100&sort=order&where[published][equals]=true', locale));
    if (!res.ok) throw new Error('Erro ao buscar localizações do mapa');
    const data = await res.json();
    return data.docs;
  },

  async getTestimonials(locale?: string): Promise<TestimonialDoc[]> {
    const res = await fetch(getLocaleUrl('/api/testimonials?limit=100&sort=order&where[published][equals]=true', locale));
    if (!res.ok) throw new Error('Erro ao buscar depoimentos');
    const data = await res.json();
    return data.docs;
  },

  // Form Submissions
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
    // Note: FormData define automaticamente o cabeçalho 'multipart/form-data' e o boundary correspondente
    const res = await fetch(`${API_URL}/api/job-applications`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },
};
