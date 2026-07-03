import { useRef, useEffect } from 'react';
import styles from './Introduction.module.css';
import { imgIntroducao } from '../assets';

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let isHovering = false;
    let activationTimer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      // Direct DOM update — no React re-render, no framer-motion compositing layer
      wrapper.style.transform =
        `perspective(1200px) rotateX(${yPct * -5}deg) rotateY(${xPct * 5}deg)`;
    };

    const handleMouseEnter = () => {
      // 200ms delay before effect activates
      activationTimer = setTimeout(() => { isHovering = true; }, 200);
    };

    const handleMouseLeave = () => {
      clearTimeout(activationTimer);
      isHovering = false;
      // CSS transition handles the smooth return to flat
      wrapper.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(activationTimer);
    };
  }, []);

  return (
    <section id="intro" className={styles.intro} data-node-id="16:522">
      <div className={styles.container}>
        {/* Left — text and button */}
        <div className={styles.leftCol} data-node-id="16:526">
          <span className="tag-badge dark" data-node-id="16:523">
            Introdução
          </span>

          <p className={styles.mainText} data-node-id="16:525">
            No campo, resultado não acontece por acaso. Ele nasce de experiência, estratégia e decisões bem tomadas. Há mais de 20 anos, o Grupo PA caminha ao lado do produtor rural, unindo consultoria técnica, agricultura de precisão e gestão para transformar conhecimento em produtividade.
          </p>

          <div className={styles.btnWrapper} data-node-id="27:878">
            <a href="/quem-somos" className="btn-pa dark-green" data-node-id="54:105">
              <span className="btn-label">Ver mais</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
              </span>
            </a>
          </div>
        </div>

        {/* Right — Image with CSS-native 3D effect */}
        <div
          className={styles.rightCol}
          ref={containerRef}
          data-node-id="122:1934"
        >
          <div ref={wrapperRef} className={styles.imageWrapper3D}>
            <div className={styles.imageScaler}>
              <img
                src={imgIntroducao}
                alt="Introdução"
                className={styles.image}
                data-node-id="677:894"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

