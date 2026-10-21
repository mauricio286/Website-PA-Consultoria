import React, { useState, useEffect } from 'react';
import styles from './MediaContainer.module.css';
import { api, type Media } from '../services/api';

export interface MediaContainerProps {
  mediaType?: 'upload' | 'vimeo';
  vimeoUrl?: string;
  vimeoUrlTablet?: string;
  vimeoUrlMobile?: string;
  media?: Media | string | null;
  mediaTablet?: Media | string | null;
  mediaMobile?: Media | string | null;
  objectPositionMobile?: 'center' | 'left' | 'right' | 'top' | 'bottom' | string;
  defaultFallbackSrc?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  fitMode?: 'cover' | 'contain' | 'fit';
  size?: 'hero' | 'card' | 'thumbnail';
}

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w <= 580) return 'mobile';
    if (w <= 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 580) {
        setBreakpoint('mobile');
      } else if (w <= 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export default function MediaContainer({
  mediaType = 'upload',
  vimeoUrl,
  vimeoUrlTablet,
  vimeoUrlMobile,
  media,
  mediaTablet,
  mediaMobile,
  objectPositionMobile,
  defaultFallbackSrc,
  alt = '',
  className = '',
  style,
  fitMode = 'cover',
  size,
}: MediaContainerProps) {
  const breakpoint = useBreakpoint();

  // 1. Caso seja selecionado o campo de Link/Vimeo
  if (mediaType === 'vimeo') {
    let activeVimeoUrl = vimeoUrl;
    if (breakpoint === 'mobile' && vimeoUrlMobile) {
      activeVimeoUrl = vimeoUrlMobile;
    } else if (breakpoint === 'tablet' && vimeoUrlTablet) {
      activeVimeoUrl = vimeoUrlTablet;
    }

    if (activeVimeoUrl) {
      const trimmedUrl = activeVimeoUrl.trim();
      const isDirectVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(trimmedUrl);

      if (isDirectVideo) {
        const objectPosition = breakpoint === 'mobile' && objectPositionMobile ? objectPositionMobile : undefined;
        return (
          <div className={`${styles.videoWrapper} ${className}`} style={style}>
            <video
              key={trimmedUrl}
              src={trimmedUrl}
              className={styles.video}
              style={{
                objectFit: fitMode === 'contain' ? 'contain' : 'cover',
                objectPosition,
              }}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        );
      }

      const embedUrl = api.getVimeoEmbedUrl(trimmedUrl);
      if (embedUrl) {
        let iframeStyle: React.CSSProperties = {};
        if (breakpoint === 'mobile' && objectPositionMobile && fitMode !== 'fit' && fitMode !== 'contain') {
          if (objectPositionMobile === 'left') {
            iframeStyle = { left: '0%', transform: 'translate(0%, -50%)' };
          } else if (objectPositionMobile === 'right') {
            iframeStyle = { left: '100%', transform: 'translate(-100%, -50%)' };
          } else if (objectPositionMobile === 'top') {
            iframeStyle = { top: '0%', transform: 'translate(-50%, 0%)' };
          } else if (objectPositionMobile === 'bottom') {
            iframeStyle = { top: '100%', transform: 'translate(-50%, -100%)' };
          }
        }

        return (
          <div className={`${styles.vimeoWrapper} ${className}`} style={style}>
            <iframe
              key={embedUrl}
              src={embedUrl}
              className={fitMode === 'fit' || fitMode === 'contain' ? styles.vimeoIframeFit : styles.vimeoIframe}
              style={iframeStyle}
              allow="autoplay; fullscreen; picture-in-picture"
              title={alt || 'Vídeo de fundo'}
            />
          </div>
        );
      }
    }
  }

  // 2. Mídia enviada via Upload
  const mediaUrl = api.getMediaUrl(media, size) || defaultFallbackSrc || '';
  const mediaTabletUrl = api.getMediaUrl(mediaTablet, 'card');
  const mediaMobileUrl = api.getMediaUrl(mediaMobile, 'thumbnail');

  const mimeType = (typeof media === 'object' && media?.mimeType) ? media.mimeType : '';
  const isVideo = mimeType.startsWith('video/') || /\.(mp4|webm|mov)(\?.*)?$/i.test(mediaUrl);

  const mobileMimeType = (typeof mediaMobile === 'object' && mediaMobile?.mimeType) ? mediaMobile.mimeType : '';
  const isMobileVideo = mobileMimeType.startsWith('video/') || /\.(mp4|webm|mov)(\?.*)?$/i.test(mediaMobileUrl || '');

  const tabletMimeType = (typeof mediaTablet === 'object' && mediaTablet?.mimeType) ? mediaTablet.mimeType : '';
  const isTabletVideo = tabletMimeType.startsWith('video/') || /\.(mp4|webm|mov)(\?.*)?$/i.test(mediaTabletUrl || '');

  if (isVideo || isMobileVideo || isTabletVideo) {
    let activeVideoUrl = mediaUrl;
    if (breakpoint === 'mobile' && mediaMobileUrl && isMobileVideo) {
      activeVideoUrl = mediaMobileUrl;
    } else if (breakpoint === 'tablet' && mediaTabletUrl && isTabletVideo) {
      activeVideoUrl = mediaTabletUrl;
    }

    const objectPosition = breakpoint === 'mobile' && objectPositionMobile ? objectPositionMobile : undefined;

    return (
      <div className={`${styles.videoWrapper} ${className}`} style={style}>
        <video
          key={activeVideoUrl}
          src={activeVideoUrl}
          className={styles.video}
          style={{
            objectFit: fitMode === 'contain' ? 'contain' : 'cover',
            objectPosition,
          }}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    );
  }

  // 3. Imagem estática ou GIF com suporte a diferentes resoluções (Tablet / Mobile)
  if (mediaMobileUrl || mediaTabletUrl) {
    return (
      <picture className={`${styles.picture} ${className}`} style={style}>
        {mediaMobileUrl && <source media="(max-width: 580px)" srcSet={mediaMobileUrl} />}
        {mediaTabletUrl && <source media="(max-width: 1024px)" srcSet={mediaTabletUrl} />}
        <img
          src={mediaUrl}
          alt={alt}
          className={`${styles.image} ${className}`}
          style={{ objectFit: fitMode === 'contain' ? 'contain' : 'cover' }}
          loading={size === 'hero' ? 'eager' : undefined}
          fetchPriority={size === 'hero' ? 'high' : undefined}
        />
      </picture>
    );
  }

  return (
    <img
      src={mediaUrl}
      alt={alt}
      className={`${styles.image} ${className}`}
      style={{ objectFit: fitMode === 'contain' ? 'contain' : 'cover', ...style }}
      loading={size === 'hero' ? 'eager' : undefined}
      fetchPriority={size === 'hero' ? 'high' : undefined}
    />
  );
}
