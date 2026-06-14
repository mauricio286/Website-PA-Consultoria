import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'; // Recommended base styles for lenis
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import styles from './App.module.css';

import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos/QuemSomos';
import Servicos from './pages/Servicos/Servicos';
import Contato from './pages/Contato/Contato';

import Carreiras from './pages/Carreiras/Carreiras';
import ConsultoriaAgronomica from './pages/ConsultoriaAgronomica/ConsultoriaAgronomica';
import AgriculturaPrecisao from './pages/AgriculturaPrecisao/AgriculturaPrecisao';
import GestaoCompras from './pages/GestaoCompras/GestaoCompras';
import AldBioenergia from './pages/AldBioenergia/AldBioenergia';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Dispara apenas quando o pathname muda.
    if (!hash) {
      window.scrollTo(0, 0);
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    } else {
      // Se navegamos de OUTRA página com um hash (ex: /quem-somos para /#servicos)
      setTimeout(() => {
        const lenis = (window as any).lenisInstance;
        if (lenis) {
          lenis.scrollTo(hash, { offset: -50, immediate: true });
        } else {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView();
        }
      }, 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Apenas dispara quando muda a página (pathname), evita engasgo no mesmo path

  return null;
}

function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Usa tempo real (duration) no lugar de lerp para sincronizar a animação entre 60hz, 100hz e 144hz.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva suave idêntica em qualquer refresh rate
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: true
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose to window so BackToTop can trigger native smooth scrolls
    (window as any).lenisInstance = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      delete (window as any).lenisInstance;
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className={styles.appContainer}>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/consultoriaagronomica" element={<ConsultoriaAgronomica />} />
          <Route path="/agriculturaprecisao" element={<AgriculturaPrecisao />} />
          <Route path="/gestaocompras" element={<GestaoCompras />} />
          <Route path="/aldbioenergia" element={<AldBioenergia />} />
          <Route path="/carreiras" element={<Carreiras />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>

        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
