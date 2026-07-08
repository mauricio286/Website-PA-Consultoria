import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import ServicesList from './components/ServicesList/ServicesList';
import Ecosystem from './components/Ecosystem/Ecosystem';
import { api, type ServicesPageData, type Service } from '../../services/api';
import { useLanguage } from '../../i18n';

export default function Servicos() {
  const [pageData, setPageData] = useState<ServicesPageData | null>(null);
  const [services, setServices] = useState<Service[] | null>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch CMS data with locale
    api.getServicesPage(locale)
      .then(data => setPageData(data))
      .catch(err => console.error('Erro ao carregar dados da página de serviços:', err));

    api.getServices(locale)
      .then(list => setServices(list))
      .catch(err => console.error('Erro ao carregar lista de serviços:', err));
  }, [locale]);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      <Hero data={pageData} />
      <ServicesList data={pageData} list={services} />
      <Ecosystem data={pageData} />
    </main>
  );
}
