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

export default function Parceria() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const images = [
    { id: 'img-1', src: imgRectangle1, label: 'Monitoramento Aéreo' },
    { id: 'img-2', src: imgRectangle2, label: 'Análise de Solo' },
    { id: 'img-3', src: imgRectangle3, label: 'Controle de Pragas' },
    { id: 'img-4', src: imgRectangle4, label: 'Preparo da Terra' },
    { id: 'img-5', src: imgRectangle5, label: 'Colheita Tecnológica' },
    { id: 'img-6', src: imgRectangle6, label: 'Planejamento de Safra' }
  ];

  // Duplicate images for infinite seamless scroll
  const loopedImages = [...images, ...images];

  return (
    <section id="parceria" className={styles.parceria} data-node-id="36:1318">
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div className={styles.header} data-node-id="36:1319">
            <div className="tag-badge dark" style={{ marginBottom: '20px' }} data-node-id="36:1320">
              parceria
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '40px',
                fontWeight: 500,
                lineHeight: '1.2',
                letterSpacing: '-0.8px',
                color: '#303030',
                maxWidth: '650px'
              }}
              data-node-id="36:1322"
            >
              <AnimatedText text="Nós estamos em movimento constante para levar o melhor da ciência e da inovação até você." delay={0} stagger={0.03} />
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
