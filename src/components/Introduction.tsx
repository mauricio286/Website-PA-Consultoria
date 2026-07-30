import { useRef, useEffect } from 'react';
import styles from './Introduction.module.css';
import { imgIntroducao } from '../assets';
import { api } from '../services/api';
import type { HomePageData } from '../services/api';
import LexicalRenderer from './LexicalRenderer';
import { Link, useNavigate } from 'react-router-dom';
import { useT } from '../i18n';
import MediaContainer from './MediaContainer';

interface IntroductionProps {
  data?: HomePageData | null;
}

export default function Introduction({ data }: IntroductionProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const t = useT();

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
      wrapper.style.transform =
        `perspective(1200px) rotateX(${yPct * -5}deg) rotateY(${xPct * 5}deg)`;
    };

    const handleMouseEnter = () => {
      activationTimer = setTimeout(() => { isHovering = true; }, 200);
    };

    const handleMouseLeave = () => {
      clearTimeout(activationTimer);
      isHovering = false;
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

  // Dados do CMS ou fallbacks
  const badgeTitle = data?.introTitle || t.intro.tag;
  const hasRichText = data?.introText && data.introText.root && data.introText.root.children && data.introText.root.children.length > 0;
  const introMediaType = data?.introMediaType || 'upload';
  const introVimeoUrl = data?.introVimeoUrl;
  const rightImageSrc = api.getMediaUrl(data?.introImage) || imgIntroducao;
  const rightImageAlt = (data?.introImage && typeof data.introImage === 'object') ? data.introImage.alt : badgeTitle;

  // Verifica se a mídia é um vídeo (seja via link do Vimeo ou upload de arquivo MP4)
  const mimeType = (typeof data?.introImage === 'object' && data?.introImage?.mimeType) ? data.introImage.mimeType : '';
  const isVideoMedia = (introMediaType === 'vimeo' && !!introVimeoUrl) ||
    mimeType.startsWith('video/') ||
    (/\.(mp4|webm|mov)(\?.*)?$/i.test(rightImageSrc) && rightImageSrc !== imgIntroducao) ||
    (introVimeoUrl && /\.(mp4|webm|mov)(\?.*)?$/i.test(introVimeoUrl));

  // Estilos dinâmicos do container de vídeo (definidos pelo cliente no CMS)
  const videoWidth = data?.introVideoWidth ?? 80;
  const videoMaxWidth = data?.introVideoMaxWidth ?? 460;
  const videoAlign = data?.introVideoAlign || 'right';
  const containerRadius = data?.introVideoRadius ?? 0;       // arredonda o container externo (borda/bg)
  const videoInnerRadius = data?.introVideoInnerRadius ?? 0; // arredonda o clip do próprio vídeo
  const aspectRatio = data?.introVideoAspectRatio || '16/9';
  const containerBg = data?.introContainerBg || '';
  const containerPadding = data?.introContainerPadding ?? 0;
  const showBorder = data?.introContainerBorder === true;
  const borderColor = data?.introContainerBorderColor || '#cccccc';

  // Container só é visível (ocupa espaço visual) quando tem fundo, borda ou padding
  const hasVisibleContainer = !!containerBg || showBorder || containerPadding > 0;

  // rightCol como flex container para controlar alinhamento do vídeo
  const rightColVideoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    // Buffer obrigatório para afastar o vídeo do texto — independente do alinhamento
    paddingLeft: '40px',
    // Alinhamento dentro do rightCol: direita, centro ou esquerda
    justifyContent: videoAlign === 'right' ? 'flex-end' : videoAlign === 'left' ? 'flex-start' : 'center',
    // Garantia de que o vídeo não excede a largura disponível
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const videoColStyle: React.CSSProperties = {
    width: `${videoWidth}%`,
    // maxWidth só aplicado quando > 0 (0 = sem limite — só o width% controla)
    ...(videoMaxWidth > 0 ? { maxWidth: `${videoMaxWidth}px` } : {}),
    aspectRatio,
    ...(containerRadius > 0 && { borderRadius: `${containerRadius}px` }),
    ...(containerBg ? { backgroundColor: containerBg } : {}),
    ...(containerPadding > 0 ? { padding: `${containerPadding}px` } : {}),
    ...(showBorder ? { border: `1.5px solid ${borderColor}` } : {}),
    ...(hasVisibleContainer ? { overflow: 'hidden' } : {}),
  };

  const videoClipStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    ...(videoInnerRadius > 0 && {
      borderRadius: `${videoInnerRadius}px`,
    }),
  };

  const ctaLabel = data?.introCtaLabel || t.intro.cta;
  const ctaUrl = data?.introCtaUrl || '/quem-somos';
  const isHash = ctaUrl.startsWith('#');

  // Smart CTA handler: scroll if anchor exists on page, otherwise navigate to route
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(ctaUrl);
    if (target) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(ctaUrl, { offset: -50 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(ctaUrl.replace(/^#/, '/'));
    }
  };

  return (
    <section id="intro" className={styles.intro} data-node-id="16:522">
      <div className={styles.container}>
        {/* Left — text and button */}
        <div className={styles.leftCol} data-node-id="16:526">
          <span className="tag-badge dark" data-node-id="16:523">
            {badgeTitle}
          </span>

          {/* Main paragraph — Layout */}
          <div className={styles.mainText} data-node-id="16:525">
            {hasRichText ? (
              <LexicalRenderer content={data.introText} />
            ) : (
              <p>
                {t.intro.text}
              </p>
            )}
          </div>

          <div className={styles.btnWrapper} data-node-id="27:878">
            {isHash ? (
              <a
                href={ctaUrl}
                onClick={handleCtaClick}
                className="btn-pa dark-green"
              >
                <span className="btn-label">{ctaLabel}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded notranslate" translate="no" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
                </span>
              </a>
            ) : (
              <Link to={ctaUrl} className="btn-pa dark-green" data-node-id="54:105">
                <span className="btn-label">{ctaLabel}</span>
                <span className="btn-icon">
                  <span className="material-symbols-rounded notranslate" translate="no" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Right — Image or Video */}
        <div
          className={styles.rightCol}
          ref={containerRef}
          data-node-id="122:1934"
          style={isVideoMedia ? rightColVideoStyle : undefined}
        >
          {isVideoMedia ? (
            /* Para vídeo (Vimeo ou MP4): sem zoom, sem 3D, com recortes de borda precisos */
            <div className={styles.videoCol} style={videoColStyle}>
              <div
                className={styles.videoClip}
                style={videoClipStyle}
              >
                <MediaContainer
                  mediaType={introMediaType}
                  vimeoUrl={introVimeoUrl}
                  media={data?.introImage || rightImageSrc}
                  defaultFallbackSrc={imgIntroducao}
                  alt={rightImageAlt}
                  fitMode="contain"
                />
              </div>
            </div>
          ) : (
            /* Para imagem estática: mantém o efeito 3D + zoom original */
            <div ref={wrapperRef} className={styles.imageWrapper3D}>
              <div className={styles.imageScaler}>
                <MediaContainer
                  mediaType={introMediaType}
                  media={data?.introImage || rightImageSrc}
                  defaultFallbackSrc={imgIntroducao}
                  alt={rightImageAlt}
                  className={styles.image}
                  fitMode="contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
