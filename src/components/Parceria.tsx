import { useRef } from 'react';
import styles from './Parceria.module.css';
import { 
  imgRectangle1, 
  imgRectangle2, 
  imgRectangle3, 
  imgRectangle4, 
  imgRectangle5, 
  imgRectangle6 
} from '../assets';
import AnimatedText from './AnimatedText';
import type { HomePageData } from '../services/api';
import { api } from '../services/api';
import { useLanguage } from '../i18n';

interface ParceriaProps {
  data?: HomePageData | null;
}

export default function Parceria({ data }: ParceriaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { locale, t } = useLanguage();

  const badgeText = data?.galleryTitle || t.parceria.tag;
  const titleText = data?.gallerySubtitle || t.parceria.title;

  const defaultImages = [
    { id: 'img-1', src: imgRectangle1, label: 'Monitoramento Aéreo' },
    { id: 'img-2', src: imgRectangle2, label: 'Análise de Solo' },
    { id: 'img-3', src: imgRectangle3, label: 'Controle de Pragas' },
    { id: 'img-4', src: imgRectangle4, label: 'Preparo da Terra' },
    { id: 'img-5', src: imgRectangle5, label: 'Colheita Tecnológica' },
    { id: 'img-6', src: imgRectangle6, label: 'Planejamento de Safra' }
  ];

  const hasCustomImages = data?.galleryImages && data.galleryImages.length > 0;
  
  const displayImages = hasCustomImages
    ? data.galleryImages!.map((item, index) => {
        const altText = (typeof item.image === 'object' && item.image.alt)
          ? item.image.alt
          : `Imagem ${index + 1}`;
        return {
          id: item.id || `custom-${index}`,
          src: api.getMediaUrl(item.image),
          label: altText
        };
      })
    : defaultImages;

  // Duplicate images for infinite seamless scroll
  const loopedImages = [...displayImages, ...displayImages];

  return (
    <section id="parceria" className={styles.parceria} data-node-id="36:1318">
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div className={styles.header} data-node-id="36:1319">
            <div className="tag-badge dark" data-node-id="36:1320">
              {badgeText}
            </div>
            <h2 className={styles.title} data-node-id="36:1322">
              <AnimatedText key={`parceria-${locale}-${titleText}`} text={titleText} delay={0} stagger={0.03} type="word" />
            </h2>
          </div>
        </div>

        {/* Slider Track Wrapper to hide overflow */}
        <div className={styles.sliderWrapper}>
          {/* Horizontal Slider Track */}
          <div ref={scrollRef} className={styles.sliderTrack} data-node-id="64:488">
            {loopedImages.map((item, index) => (
              <div key={`${item.id}-${index}`} className={styles.slideCard}>
                <div className={styles.imageContainer}>
                  <img src={item.src} alt={item.label} className={styles.slideImage} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
