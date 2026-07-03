import { useEffect, useRef, useState } from 'react';
import AnimatedText from '../../components/AnimatedText';
import styles from './QuemSomos.module.css';

// Import images from assets
import { 
  imgBg, 
  imgImagem
} from '../../assets';

export default function QuemSomos() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    if (timelineRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
      const progress = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      setScrollProgress(progress);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByAmount = (direction: 'next' | 'prev') => {
    if (timelineRef.current) {
      const gapValue = window.getComputedStyle(timelineRef.current).getPropertyValue('gap');
      const gap = parseInt(gapValue) || 85;
      const amount = timelineRef.current.clientWidth + gap;
      timelineRef.current.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
    }
  };

  return (
    <main className={`${styles.quemSomosPage} page-transition-enter`}>
      {/* Sessão 1 — Hero Banner */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <img src={imgBg} alt="Background da PA" className={styles.heroBg} />
        </div>
        
        {/* Scroll down button instead of back button */}
        <div className={styles.scrollDownWrapper}>
          <a href="#intro" className={styles.scrollDownButton} aria-label="Rolar para baixo">
            <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>arrow_downward</span>
          </a>
        </div>
      </section>

      {/* Sessão 2 — Nossa gente faz a diferença */}
      <section id="intro" className={styles.introSection}>
        <div className={styles.introContainer}>
          <div className={styles.introLeft}>
            <span className="tag-badge dark">
              quem somos
            </span>
            <h2 className={styles.introTitle}>
              Nossa gente <br /><span className={styles.highlight}>faz a diferença</span>
            </h2>
          </div>
          <div className={styles.introDescription}>
            <p>
              Sediado em Tangará da Serra (MT), o <strong>Grupo PA</strong> une consultoria agronômica especializada e atendimento próximo para <strong>impulsionar a produtividade do produtor</strong>. Com um campo experimental próprio, transformamos pesquisas e estudos práticos em dados reais para eliminar o achismo e otimizar os resultados da sua safra.
            </p>
            <br />
            <p>
              Simplificamos sua rotina cuidando de toda a gestão de compras de insumos, negociando os melhores preços, prazos e fornecedores do mercado. Pioneiros em agricultura de precisão, usamos GPS e sensoriamento remoto para coletar dados exatos e maximizar o desempenho de cada hectare. <strong>Somos a parceria sólida e lucrativa que você busca para o campo</strong>. Conte com o Grupo PA para elevar o patamar da sua produção.
            </p>
          </div>
        </div>
      </section>

      {/* Sessão 3 — Valores / Cards */}
      <section className={styles.cardsSection}>
        {/* Card 1 */}
        <div className={`${styles.card} ${styles.cardDark}`}>
          <h3 className={styles.cardTitle}>
            <AnimatedText text="Nosso compromisso" type="char" delay={0} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <p className={styles.cardText}>
            Contribuímos com o desenvolvimento do agronegócio, entregando aos nossos clientes as melhores soluções em produtividade, com excelência na prestação de serviços, tecnologia, pesquisa e respeito às pessoas e ao meio ambiente.
          </p>
        </div>

        {/* Card 2 */}
        <div className={`${styles.card} ${styles.cardLime}`}>
          <h3 className={styles.cardTitleDark}>
            <AnimatedText text="Onde queremos chegar" type="char" delay={0.2} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <p className={styles.cardTextDark}>
            Buscamos ser referência em consultoria agronômica, pesquisa e agricultura de precisão, levando inovação, resultado e confiança para o produtor rural em cada safra.
          </p>
        </div>

        {/* Card 3 */}
        <div className={`${styles.card} ${styles.cardLight}`}>
          <h3 className={styles.cardTitleGreen}>
            <AnimatedText text="Os valores que nos movem" type="char" delay={0.4} stagger={0.02} className={styles.centeredAnimatedText} />
          </h3>
          <p className={styles.cardTextGreen}>
            Acreditamos que grandes resultados começam com relações sólidas. Por isso, conduzimos nosso trabalho com honestidade, ética e transparência, valorizando as pessoas, respeitando cada parceria e mantendo a paixão pelo que fazemos em cada desafio do campo.
          </p>
        </div>
      </section>

      {/* Sessão 4 — Vídeo Institucional */}
      <section className={styles.videoSection}>
        <div className={styles.videoContainer}>
          <div className={styles.videoHeader}>
            <span className="tag-badge dark">
              institucional
            </span>
            <h2 className={styles.videoTitle}>
              <AnimatedText text="Vídeo " type="word" />
              <span className={styles.highlight}>
                <AnimatedText text="Institucional" type="word" delay={0.1} />
              </span>
            </h2>
          </div>

          <div className={styles.videoPlayerWrapper}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/2Val9IbUWHk" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Sessão 5 — Nossa História (Timeline) */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineHeader}>
            <div>
              <span className="tag-badge dark">
                timeline
              </span>
              <h2 className={styles.timelineTitle}>
                <AnimatedText text="Nossa história" type="word" />
              </h2>
            </div>
            <div className={`${styles.timelineControls} ${styles.desktopControls}`}>
              <button onClick={() => scrollByAmount('prev')} className={styles.controlBtn} aria-label="Voltar no tempo">
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <button onClick={() => scrollByAmount('next')} className={styles.controlBtn} aria-label="Avançar no tempo">
                <span className="material-symbols-rounded">chevron_right</span>
              </button>
            </div>
          </div>

          <div className={styles.timelineScroller}>
            {/* Mobile Controls absolute positioned next to the Year */}
            <div className={`${styles.timelineControls} ${styles.mobileControls}`}>
              <button onClick={() => scrollByAmount('prev')} className={styles.controlBtn} aria-label="Voltar no tempo">
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <button onClick={() => scrollByAmount('next')} className={styles.controlBtn} aria-label="Avançar no tempo">
                <span className="material-symbols-rounded">chevron_right</span>
              </button>
            </div>
            <div className={styles.timelineTrack}>
              <div 
                className={`${styles.timelineItems} ${isDragging ? styles.dragging : ''}`} 
                ref={timelineRef} 
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {[
                  { tag: "o início", year: "1993", text: "O Grupo PA teve o início de sua história no Mato Grosso em 1993, através da aquisição da Faz. São Paulo, em Diamantino - MT, para o cultivo de soja e milho. Ainda hoje é a principal Fazenda do grupo e onde está localizado nosso campo de pesquisa." },
                  { tag: "consultoria", year: "2002", text: "No ano de 2002, nosso fundador Paulo Asunção, a convite de um vizinho de terra, começou a prestar serviços de consultoria agronômica. Este foi o primeiro cliente da empresa e segue conosco até hoje." },
                  { tag: "tecnologia", year: "2009", text: "Em 2009, a PA Consultoria passou a disponibilizar os serviços de agricultura de precisão, sendo uma das primeiras empresas do estado a oferecer este serviço." },
                  { tag: "pesquisa", year: "2011", text: "Iniciamos os trabalhos de Pesquisa Agronômica que hoje conta com uma área de 60 ha e mais de 2.000 tratamentos dedicados ao desenvolvimento, gerando resultados importantes para a construção da melhor estratégia produtiva." },
                  { tag: "evento", year: "2013", text: "A PA Pesquisa realizou seu primeiro dia de campo em seu campo de pesquisa na Faz. São Paulo, reunindo cerca de 30 produtores." },
                  { tag: "novas culturas", year: "2023", text: "A PA Consultoria passou a atender a cultura do algodão." },
                  { tag: "expansão", year: "2024", text: "Comprometidos com nossa missão em contribuir com o desenvolvimento do agronegócio, expandimos e passamos a atender a região do Nortão Mato-Grossense." },
                  { tag: "investimento", year: "2026", text: "O Grupo PA segue investindo no agro e no Mato Grosso. Como acionistas da ALD Bioenergia, realizamos novos investimentos para a triplicação da planta." }
                ].map((item, idx) => (
                  <div key={idx} className={styles.timelineItemWrapper}>
                    <div className={styles.timelineLine}>
                      <span className="tag-badge light" style={{ background: '#e1fe00', border: 'none', color: '#002d22' }}>{item.tag}</span>
                    </div>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineYearWrapper}>
                        <span className={styles.timelineYear}>
                          <AnimatedText text={item.year} type="char" delay={0} stagger={0.05} once={false} />
                        </span>
                      </div>
                      <div className={styles.timelineContent}>
                        <p className={styles.timelineText}>{item.text}</p>
                        <div className={styles.timelineImageWrapper}>
                          <img src={imgImagem} alt={`História em ${item.year}`} className={styles.timelineImage} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator bar */}
            <div className={styles.scrollIndicatorWrapper}>
              <div className={styles.scrollIndicator}>
                <div 
                  className={styles.scrollIndicatorThumb} 
                  style={{ left: `calc(${scrollProgress * 100}% - ${scrollProgress * 67}px)` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
