import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { imgLogoPa1 } from '../assets';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const staticNavRef = useRef<HTMLElement>(null);
  const floatingNavRef = useRef<HTMLElement>(null);
  const [staticPillStyle, setStaticPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [floatingPillStyle, setFloatingPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const location = useLocation();


  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#')) {
      const hash = to.substring(1);
      if (location.pathname === '/') {
        e.preventDefault();
        const lenis = (window as any).lenisInstance;
        if (lenis) {
          lenis.scrollTo(hash, { offset: -50 });
        } else {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', to);
      }
    }
    closeMobile();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (location.pathname !== '/') {
        setActiveSection('');
        return;
      }

      // Scroll Spy - detecta a sessão atual na tela (apenas na Home)
      const sections = ['hero', 'servicos', 'carreiras', 'contato'];
      const scrollPos = window.scrollY + 200;

      let currentSection = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // chamada inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Atualiza a posição da pílula quando a seção ativa ou a rota muda
  useEffect(() => {
    const updatePill = (navRef: React.RefObject<HTMLElement | null>, setPillStyle: React.Dispatch<React.SetStateAction<any>>) => {
      if (!navRef.current) return;
      let activeEl = navRef.current.querySelector('.active') as HTMLElement;
      if (!activeEl) {
        // Fallback: se não achar ativo (raro), procura o Home
        activeEl = navRef.current.querySelector('[href="/#hero"]') as HTMLElement;
      }

      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      }
    };

    // Pequeno delay para garantir que o DOM e fontes foram renderizados
    const timeout = setTimeout(() => {
      updatePill(staticNavRef, setStaticPillStyle);
      updatePill(floatingNavRef, setFloatingPillStyle);
    }, 50);

    return () => clearTimeout(timeout);
  }, [activeSection, location.pathname]);

  const closeMobile = () => setIsMobileMenuOpen(false);
  const toggleMobile = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} data-node-id="1:1179">
      <div className={styles.inner}>
        <div className={styles.logoArea} data-node-id="12:505">
          <Link to="/" className={styles.logoLink}>
            <img src={imgLogoPa1} alt="Grupo PA Logo" className={styles.logo} data-node-id="12:490" />
          </Link>
        </div>

        {/* Desktop Nav Estático — no topo absoluto */}
        <nav ref={staticNavRef} className={`${styles.nav} ${styles.navStatic}`} data-node-id="80:1511">
          {/* Pílula mágica estática */}
          <div className={styles.magicPill} style={{ left: `${staticPillStyle.left}px`, width: `${staticPillStyle.width}px`, opacity: staticPillStyle.opacity }} />
          
          <Link to="/#hero" onClick={(e) => handleHashClick(e, '/#hero')} className={`${styles.navLink} ${activeSection === 'hero' && location.pathname === '/' ? 'active ' + styles.active : ''}`}>Home</Link>
          <Link to="/quem-somos" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/quem-somos' ? 'active ' + styles.active : ''}`}>Quem somos</Link>
          <Link to="/servicos" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/servicos' ? 'active ' + styles.active : ''}`}>Serviços</Link>
          <Link to="/carreiras" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/carreiras' ? 'active ' + styles.active : ''}`}>Carreiras</Link>
          <Link to="/contato" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/contato' ? 'active ' + styles.active : ''}`}>Contato</Link>
        </nav>

        {/* Desktop Nav Flutuante — fixo e animado suavemente */}
        <nav ref={floatingNavRef} className={`${styles.nav} ${styles.navFloating} ${isScrolled ? styles.navFloatingShow : ''}`}>
          {/* Pílula mágica flutuante */}
          <div className={styles.magicPill} style={{ left: `${floatingPillStyle.left}px`, width: `${floatingPillStyle.width}px`, opacity: floatingPillStyle.opacity }} />
          
          <Link to="/#hero" onClick={(e) => handleHashClick(e, '/#hero')} className={`${styles.navLink} ${activeSection === 'hero' && location.pathname === '/' ? 'active ' + styles.active : ''}`}>Home</Link>
          <Link to="/quem-somos" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/quem-somos' ? 'active ' + styles.active : ''}`}>Quem somos</Link>
          <Link to="/servicos" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/servicos' ? 'active ' + styles.active : ''}`}>Serviços</Link>
          <Link to="/carreiras" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/carreiras' ? 'active ' + styles.active : ''}`}>Carreiras</Link>
          <Link to="/contato" onClick={closeMobile} className={`${styles.navLink} ${location.pathname === '/contato' ? 'active ' + styles.active : ''}`}>Contato</Link>
        </nav>

        {/* Right side placeholder (mirrors 220px logo width) */}
        <div className={styles.rightPlaceholder}>
        </div>

        {/* Hamburger Mobile Flutuante */}
        <div className={`${styles.hamburger} ${styles.hamburgerFloating} ${isScrolled ? styles.hamburgerFloatingShow : ''} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`} onClick={toggleMobile}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.navMobile}>
          <Link to="/#hero" onClick={(e) => handleHashClick(e, '/#hero')} className={styles.mobileNavLink}>Home</Link>
          <Link to="/quem-somos" className={styles.mobileNavLink} onClick={closeMobile}>Quem somos</Link>
          <Link to="/servicos" className={styles.mobileNavLink} onClick={closeMobile}>Serviços</Link>
          <Link to="/carreiras" className={styles.mobileNavLink} onClick={closeMobile}>Carreiras</Link>
          <Link to="/contato" className={styles.mobileNavLink} onClick={closeMobile}>Contato</Link>
        </nav>
      </div>
    </header>
  );
}
