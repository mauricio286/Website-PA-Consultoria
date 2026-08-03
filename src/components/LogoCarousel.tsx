import styles from './LogoCarousel.module.css';
import { imgSyngenta, imgBasf, imgBayer, imgCorteva } from '../assets';
import { api } from '../services/api';
import type { HomePageData } from '../services/api';

interface LogoCarouselProps {
  logos?: HomePageData['heroLogos'];
}

// Layout: Syngenta, Corteva, BASF, BAYER — repeated for scroll
const defaultLogos = [
  { src: imgSyngenta, alt: 'Syngenta', cls: styles.logoSyngenta },
  { src: imgCorteva,  alt: 'Corteva',  cls: styles.logoCorteva  },
  { src: imgBasf,     alt: 'BASF',     cls: styles.logoBasf     },
  { src: imgBayer,    alt: 'Bayer',    cls: styles.logoBayer    },
  { src: imgSyngenta, alt: 'Syngenta', cls: styles.logoSyngenta },
  { src: imgCorteva,  alt: 'Corteva',  cls: styles.logoCorteva  },
  { src: imgBasf,     alt: 'BASF',     cls: styles.logoBasf     },
  { src: imgBayer,    alt: 'Bayer',    cls: styles.logoBayer    },
];

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  const getLogoClass = (alt: string, url?: string) => {
    const searchString = `${alt} ${url || ''}`.toLowerCase();
    if (searchString.includes('syngenta')) return styles.logoSyngenta;
    if (searchString.includes('corteva')) return styles.logoCorteva;
    if (searchString.includes('basf')) return styles.logoBasf;
    if (searchString.includes('bayer')) return styles.logoBayer;
    return '';
  };

  // Se houver logos cadastrados no CMS, usa eles. Caso contrário, usa os padrões.
  const hasCustomLogos = logos && logos.length > 0;
  
  const displayLogos = hasCustomLogos
    ? logos!.map(item => {
        const url = api.getMediaUrl(item.logo);
        return {
          src: url,
          alt: item.alt,
          cls: getLogoClass(item.alt, url),
        };
      })
    : defaultLogos;

  // Garante que o track tenha pelo menos 8 itens para o loop infinito não saltar
  let repeatedLogos = [...displayLogos];
  if (hasCustomLogos && displayLogos.length > 0) {
    while (repeatedLogos.length < 8) {
      repeatedLogos = [...repeatedLogos, ...displayLogos];
    }
  }

  return (
    <div className={styles.carousel} data-node-id="3:19">
      {/* Dois tracks idênticos lado a lado — cada um anima -100% da sua própria largura */}
      <div className={styles.track}>
        {repeatedLogos.map((l, i) => (
          <img
            key={`a-${i}`}
            src={l.src}
            alt={l.alt}
            className={`${styles.logo} ${l.cls || ''}`}
            style={!l.cls ? { maxHeight: '72px', maxWidth: '160px' } : undefined}
          />
        ))}
      </div>
      <div className={styles.track} aria-hidden="true">
        {repeatedLogos.map((l, i) => (
          <img
            key={`b-${i}`}
            src={l.src}
            alt={l.alt}
            className={`${styles.logo} ${l.cls || ''}`}
            style={!l.cls ? { maxHeight: '72px', maxWidth: '160px' } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
