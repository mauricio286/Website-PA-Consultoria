import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, ConfigProvider } from 'antd';
import styles from './CookieConsent.module.css';

const { Text, Link } = Typography;

export interface CookieConsentProps {
  /**
   * Texto dinâmico da mensagem do banner
   */
  message: string;
  /**
   * Link para a Política de Privacidade
   */
  privacyPolicyUrl: string;
  /**
   * Define se o banner está ativado/desativado. Se falso, não renderiza.
   */
  enabled?: boolean;
}

const COOKIE_STORAGE_KEY = 'lgpd_cookie_consent';

export const CookieConsent: React.FC<CookieConsentProps> = ({
  message,
  privacyPolicyUrl,
  enabled = true,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Apenas checa o localStorage no lado do cliente (Client-side / Mount)
    const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!savedConsent && enabled) {
      setIsVisible(true);
    }
  }, [enabled]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted');
    setIsVisible(false);
    
    // Dispara evento nativo no Window
    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdate', {
        detail: { status: 'accepted' },
      })
    );

    // Push padrão para DataLayer do GTM (se existir)
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'cookie_consent_accepted' });
    }
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, 'rejected');
    setIsVisible(false);

    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdate', {
        detail: { status: 'rejected' },
      })
    );

    if (typeof window !== 'undefined') {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'cookie_consent_rejected' });
    }
  };

  if (!isVisible) return null;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#e1fe00', /* Lime Green */
          colorTextBase: '#303030',
          colorLink: '#002d22',
          colorLinkHover: '#88a668',
          fontFamily: 'var(--font-body)',
          borderRadius: 14, /* Arredondamento padrão de botões do site */
          controlHeight: 45, /* Altura padrão de botões do site */
        },
        components: {
          Button: {
            primaryColor: '#002d22', /* Cor do texto no botão primário */
            fontWeight: 500,
            colorPrimaryHover: '#d1ec00',
          },
        },
      }}
    >
      <div className={styles.cookieConsentWrapper}>
        <div className={styles.cookieConsentContent}>
          <div className={styles.messageArea}>
            <Text className={styles.textMessage}>
              {message}{' '}
              <Link href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" underline>
                Política de Privacidade
              </Link>.
            </Text>
          </div>
          <div className={styles.actionArea}>
            <Space size="middle" className={styles.buttonsSpace}>
              <Button type="default" onClick={handleReject} className={styles.rejectBtn}>
                Recusar
              </Button>
              <Button type="primary" onClick={handleAccept} className={styles.acceptBtn}>
                Aceitar
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
