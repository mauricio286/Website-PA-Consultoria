import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../i18n';

/**
 * Indica se a página de Eventos está ativa no CMS (campo `enabled` do global events-page).
 * - Valor inicial síncrono: dados estáticos do build. Se nada existir, assume "desativado"
 *   para nunca exibir um link que pode levar a uma página desligada.
 * - Revalida contra o CMS ao montar, a cada troca de rota e ao voltar para a aba.
 */
export function useEventsEnabled(): boolean {
  const { locale } = useLanguage();
  const { pathname } = useLocation();

  const [enabled, setEnabled] = useState<boolean>(() => {
    const staticData = api.getStaticData(locale);
    return staticData?.globals?.['events-page']?.enabled === true;
  });

  // Assina as atualizações (uma única vez por idioma)
  useEffect(() => {
    let alive = true;
    const apply = (d?: { enabled?: boolean } | null) => {
      if (alive && typeof d?.enabled === 'boolean') setEnabled(d.enabled);
    };
    api.getEventsPage(locale, apply).then(apply);

    const onVisible = () => {
      if (document.visibilityState === 'visible') api.getEventsPage(locale);
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      alive = false;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [locale]);

  // Revalida a cada navegação interna (notifica o assinante acima)
  useEffect(() => {
    api.getEventsPage(locale);
  }, [pathname, locale]);

  return enabled;
}
