import React from 'react';
import styles from './MediaContainer.module.css';
import { api, type Media } from '../services/api';

export interface MediaContainerProps {
  mediaType?: 'upload' | 'vimeo';
  vimeoUrl?: string;
  media?: Media | string | null;
  mediaTablet?: Media | string | null;
  mediaMobile?: Media | string | null;
  defaultFallbackSrc?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  fitMode?: 'cover' | 'contain' | 'fit';
}

export default function MediaContainer({
  mediaType = 'upload',
  vimeoUrl,
  media,
  mediaTablet,
  mediaMobile,
  defaultFallbackSrc,
  alt = '',
  className = '',
  style,
  fitMode = 'cover',
}: MediaContainerProps) {
  // 1. Caso seja selecionado o campo de Link/Vimeo
  if (mediaType === 'vimeo' && vimeoUrl) {
    const trimmedUrl = vimeoUrl.trim();
    const isDirectVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(trimmedUrl);

    if (isDirectVideo) {
      return (
        <div className={`${styles.videoWrapper} ${className}`} style={style}>
          <video
            src={trimmedUrl}
            className={styles.video}
            style={{ objectFit: fitMode === 'contain' ? 'contain' : 'cover' }}
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
      return (
        <div className={`${styles.vimeoWrapper} ${className}`} style={style}>
          <iframe
            src={embedUrl}
            className={fitMode === 'fit' || fitMode === 'contain' ? styles.vimeoIframeFit : styles.vimeoIframe}
            allow="autoplay; fullscreen; picture-in-picture"
            title={alt || 'Vídeo de fundo'}
          />
        </div>
      );
    }
  }

  // 2. Mídia enviada via Upload
  const mediaUrl = api.getMediaUrl(media) || defaultFallbackSrc || '';
  const mediaTabletUrl = api.getMediaUrl(mediaTablet);
  const mediaMobileUrl = api.getMediaUrl(mediaMobile);

  const mimeType = (typeof media === 'object' && media?.mimeType) ? media.mimeType : '';
  const isVideo = mimeType.startsWith('video/') || /\.(mp4|webm|mov)(\?.*)?$/i.test(mediaUrl);

  if (isVideo) {
    return (
      <div className={`${styles.videoWrapper} ${className}`} style={style}>
        <video
          src={mediaUrl}
          className={styles.video}
          style={{ objectFit: fitMode === 'contain' ? 'contain' : 'cover' }}
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
    />
  );
}
