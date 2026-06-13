import { useEffect } from 'react';
import Hero from './components/Hero/Hero';
import ServicesList from './components/ServicesList/ServicesList';
import Ecosystem from './components/Ecosystem/Ecosystem';

export default function Servicos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-transition-enter" style={{ width: '100%', backgroundColor: 'var(--color-bg-white)' }}>
      <Hero />
      <ServicesList />
      <Ecosystem />
    </main>
  );
}
