import styles from './LogoCarousel.module.css';
import { imgSyngenta, imgBasf, imgBayer, imgCorteva } from '../assets';

// Figma node 64:87: Syngenta, Corteva, BASF, BAYER — repeated for scroll
const logos = [
  { src: imgSyngenta, alt: 'Syngenta', cls: styles.logoSyngenta },
  { src: imgCorteva,  alt: 'Corteva',  cls: styles.logoCorteva  },
  { src: imgBasf,     alt: 'BASF',     cls: styles.logoBasf     },
  { src: imgBayer,    alt: 'Bayer',    cls: styles.logoBayer    },
  { src: imgSyngenta, alt: 'Syngenta', cls: styles.logoSyngenta },
  { src: imgCorteva,  alt: 'Corteva',  cls: styles.logoCorteva  },
  { src: imgBasf,     alt: 'BASF',     cls: styles.logoBasf     },
  { src: imgBayer,    alt: 'Bayer',    cls: styles.logoBayer    },
];

export default function LogoCarousel() {
  return (
    <div className={styles.carousel} data-node-id="3:19">
      {/* Double the list so the loop is seamless */}
      <div className={styles.track}>
        {[...logos, ...logos].map((l, i) => (
          <img
            key={i}
            src={l.src}
            alt={l.alt}
            className={`${styles.logo} ${l.cls}`}
          />
        ))}
      </div>
    </div>
  );
}
