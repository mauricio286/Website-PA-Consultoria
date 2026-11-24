import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import { api, type EventsPageData } from '../../services/api';
import LexicalRenderer from '../../components/LexicalRenderer';
import styles from './Eventos.module.css';

export default function Eventos() {
  const { locale } = useLanguage();

  // Frame 0: inicializa de forma síncrona com os dados estáticos salvos no build
  const [data, setData] = useState<EventsPageData>(() => {
    const staticData = api.getStaticData(locale);
    return staticData?.globals?.['events-page'] || {};
  });

  // SWR: revalida em segundo plano contra o Payload CMS
  useEffect(() => {
    let isMounted = true;
    api.getEventsPage(locale, (freshData) => {
      if (isMounted && freshData) {
        setData(freshData);
      }
    }).then((freshData) => {
      if (isMounted && freshData) {
        setData(freshData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  // Se o evento estiver desativado no CMS
  if (data.enabled !== true) {
    return (
      <main className={styles.container}>
        <div className={styles.disabledContainer}>
          <div className={styles.disabledCard}>
            <svg className={styles.disabledIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h1 className={styles.disabledTitle}>
              {locale === 'en' ? 'No Active Events' : 'Nenhum Evento no Momento'}
            </h1>
            <p className={styles.disabledText}>
              {locale === 'en'
                ? 'Stay tuned to our social networks for news on upcoming dates and editions.'
                : 'Fique atento às nossas redes sociais para novidades sobre próximas datas e edições.'}
            </p>
            <Link to="/" className={styles.disabledBtn}>
              {locale === 'en' ? 'Back to Home' : 'Voltar ao Início'}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Dados padrão com fallbacks
  const heroBadge = data.heroBadge || (locale === 'en' ? 'Next event' : 'Próximo evento');
  const heroTitle = data.heroTitle || 'PA SUMMIT 2027';
  const heroSubtitle = data.heroSubtitle || (locale === 'en' ? 'Productivity in another dimension' : 'Produtividade em outra dimensão');
  const heroImgUrl = api.getMediaUrl(data.heroImage, 'hero') || '/cms-media/eventos-7-1920x1080.webp';

  const statsTag = data.statsTag || (locale === 'en' ? 'The event' : 'O evento');
  const statsTitle = data.statsTitle || (locale === 'en'
    ? 'A full immersion in research results, agronomic innovation, and market trends.'
    : 'A maior imersão técnica e estratégica do agronegócio regional.');
  const statsList = data.stats && data.stats.length > 0 ? data.stats : [
    { number: '14ª', label: locale === 'en' ? 'Field Day edition' : 'edição do Dia de Campo' },
    { number: '06.02', label: locale === 'en' ? 'February 06, 2027' : 'de fevereiro de 2027' },
    { number: '800+', label: locale === 'en' ? 'expected attendees' : 'participantes esperados' },
    { number: '40+', label: locale === 'en' ? 'technical stations & exhibitors' : 'estações e expositores' }
  ];

  const aboutTitle = data.aboutTitle || (locale === 'en' ? 'About PA Summit' : 'Sobre o PA Summit');
  const infoItems = data.infoItems && data.infoItems.length > 0 ? data.infoItems : [
    { key: locale === 'en' ? 'Date' : 'Data', value: locale === 'en' ? 'February 06, 2027' : '06 de fevereiro de 2027' },
    { key: locale === 'en' ? 'Location' : 'Local', value: 'Estação Experimental Grupo PA · Deciolândia-MT' },
    { key: locale === 'en' ? 'Schedule' : 'Horário', value: '07h30 às 17h00' },
    { key: locale === 'en' ? 'Audience' : 'Público', value: locale === 'en' ? 'Farmers, agronomists, and business partners' : 'Produtores rurais, consultores e parceiros' }
  ];

  const partnersTag = data.partnersTag || (locale === 'en' ? 'Who will be there' : 'Quem estará lá');
  const partnersTitle = data.partnersTitle || (locale === 'en' ? 'Confirmed companies' : 'Empresas confirmadas');
  const partnersList = data.partnersLogos && data.partnersLogos.length > 0 ? data.partnersLogos : [
    { name: 'BASF', logo: '/cms-media/BASF.png' },
    { name: 'BAYER', logo: '/cms-media/BAYER.png' },
    { name: 'Syngenta', logo: '' },
    { name: 'Corteva', logo: '' },
    { name: 'FMC', logo: '' },
    { name: 'UPL', logo: '' }
  ];

  const scheduleTag = data.scheduleTag || (locale === 'en' ? 'Schedule' : 'Programação');
  const scheduleTitle = data.scheduleTitle || (locale === 'en' ? 'How the event works' : 'Como funciona o evento');
  const scheduleImgUrl = api.getMediaUrl(data.scheduleImage, 'card') || '/cms-media/eventos-7-768x512.webp';
  const scheduleSteps = data.scheduleSteps && data.scheduleSteps.length > 0 ? data.scheduleSteps : [
    {
      time: '07h30',
      title: locale === 'en' ? 'Registration & Welcome Breakfast' : 'Credenciamento e Café da Manhã',
      description: locale === 'en' ? 'Attendee check-in and delivery of official credentials.' : 'Recepção dos participantes e entrega dos kits oficiais do evento.'
    },
    {
      time: '08h30',
      title: locale === 'en' ? 'Official Opening & Keynote' : 'Abertura Oficial e Palestra Magna',
      description: locale === 'en' ? 'Agronomic panorama, climate perspectives, and crop strategy.' : 'Panorama agronômico da safra, perspectivas climáticas e diretrizes técnicas.'
    },
    {
      time: '10h00',
      title: locale === 'en' ? 'Technical Stations Circuit' : 'Circuito de Estações Técnicas a Campo',
      description: locale === 'en' ? 'Guided visits to live trial plots with researchers and consultants.' : 'Visitação guiada às parcelas de Soja, Milho e Algodão com ensaios ao vivo.'
    },
    {
      time: '15h30',
      title: locale === 'en' ? 'Debate Panel & Networking' : 'Painel de Debates e Confraternização',
      description: locale === 'en' ? 'Consolidated trial results discussion, networking, and cocktail.' : 'Apresentação dos dados consolidados, espaço para networking e confraternização.'
    }
  ];

  const ctaTitle = data.ctaTitle || (locale === 'en' ? 'Secure your spot' : 'Garanta seu lugar');
  const ctaSubtitle = data.ctaSubtitle || (locale === 'en' ? 'Current batch with limited spots · Registrations open' : 'Lote atual com vagas limitadas · Inscrições abertas');
  const ctaButtonLabel = data.ctaButtonLabel || (locale === 'en' ? 'Buy tickets now' : 'Compre aqui agora');
  const ctaButtonUrl = data.ctaButtonUrl || 'https://www.sympla.com.br/';
  const ctaNotice = data.ctaNotice || (locale === 'en' ? 'Safely redirects to the event page on Sympla' : 'Redireciona com segurança para a página do evento na Sympla');

  const pastEventsTag = data.pastEventsTag || (locale === 'en' ? 'Our history' : 'Nossa história');
  const pastEventsTitle = data.pastEventsTitle || (locale === 'en' ? 'See our past events' : 'Veja nossos eventos anteriores');
  const pastEvents = data.pastEvents && data.pastEvents.length > 0 ? data.pastEvents : [
    {
      name: 'PA Summit 2026',
      date: locale === 'en' ? 'February 2026' : 'Fevereiro 2026',
      people: locale === 'en' ? '750 attendees' : '750 pessoas',
      desc: locale === 'en' ? 'Field research results and new pest & disease management solutions.' : 'Apresentação de resultados de mais de 2.000 tratamentos de pesquisa a campo e novas soluções para o cerrado.',
      photo: '/cms-media/eventos-7-400x300.webp',
      galleryUrl: '#'
    },
    {
      name: 'PA Summit 2025',
      date: locale === 'en' ? 'February 2025' : 'Fevereiro 2025',
      people: locale === 'en' ? '620 attendees' : '620 pessoas',
      desc: locale === 'en' ? 'Precision agriculture innovations and nutritional efficiency across major crops.' : 'Inovações em agricultura de precisão, fertilidade de solo e eficiência nutricional.',
      photo: '/cms-media/eventos-7-400x300.webp',
      galleryUrl: '#'
    }
  ];

  return (
    <main className={styles.container}>
      {/* ─── 01. BANNER PRINCIPAL (HERO) ─── */}
      <section className={styles.hero} aria-label={heroTitle}>
        {heroImgUrl && (
          <img src={heroImgUrl} alt={heroTitle} className={styles.heroBg} />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          {heroBadge && <div className={styles.heroBadge}>{heroBadge}</div>}
          <h1 className={styles.heroTitle}>{heroTitle}</h1>
          {heroSubtitle && <p className={styles.heroSubtitle}>{heroSubtitle}</p>}
        </div>
      </section>

      {/* ─── 02. NÚMEROS EM DESTAQUE ─── */}
      <section className={styles.statsSection} aria-label={statsTag}>
        {statsTag && <p className={styles.sectionTag}>{statsTag}</p>}
        {statsTitle && <h2 className={styles.statsTitle}>{statsTitle}</h2>}
        <div className={styles.statsGrid}>
          {statsList.map((stat, i) => (
            <div key={stat.number + i} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 03. INFORMAÇÕES GERAIS ─── */}
      <section className={styles.infoSection} aria-label={aboutTitle}>
        <div className={styles.infoFlex}>
          <div className={styles.infoLeft}>
            <h2 className={styles.infoHeading}>{aboutTitle}</h2>
            <div className={styles.infoText}>
              {data.aboutText?.root ? (
                <LexicalRenderer content={data.aboutText} />
              ) : (
                <>
                  <p>
                    {locale === 'en'
                      ? 'The PA Summit is the annual gathering where knowledge generated in the PA Group research stations connects directly with the day-to-day realities of farming.'
                      : 'O PA Summit é o ponto de encontro anual onde o conhecimento gerado nos campos de pesquisa do Grupo PA se conecta diretamente com a realidade do produtor rural.'}
                  </p>
                  <p>
                    {locale === 'en'
                      ? 'During the event, we present first-hand results from thousands of field-tested treatments in soybean, corn, and cotton, enabling safer and more confident decisions for the coming season.'
                      : 'Durante o evento, apresentamos em primeira mão os resultados de milhares de tratamentos avaliados a campo nas culturas de soja, milho e algodão, permitindo decisões mais assertivas e seguras para a próxima safra.'}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className={styles.infoRight}>
            {infoItems.map((item, i) => (
              <div key={item.key + i}>
                <span className={styles.infoItemKey}>{item.key}</span>
                <span className={styles.infoItemVal}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04. EMPRESAS CONFIRMADAS (MARQUEE) ─── */}
      <section className={styles.partnersSection} aria-label={partnersTitle}>
        <div className={styles.partnersHeader}>
          {partnersTag && <p className={styles.partnersTag}>{partnersTag}</p>}
          {partnersTitle && <h2 className={styles.partnersTitle}>{partnersTitle}</h2>}
        </div>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((copy) => (
              <div key={copy} className={styles.marqueeGroup} aria-hidden={copy === 1 ? true : undefined}>
                {partnersList.map((partner, index) => {
                  const logoUrl = typeof partner.logo === 'string'
                    ? partner.logo
                    : api.getMediaUrl(partner.logo);

                  return (
                    <div
                      key={index}
                      className={`${styles.partnerLogoWrap} ${logoUrl ? '' : styles.partnerLogoPlaceholder}`}
                      title={partner.name}
                    >
                      {logoUrl ? (
                        <img src={logoUrl} alt={copy === 1 ? '' : partner.name} className={styles.partnerLogo} />
                      ) : (
                        <span className={styles.partnerFallbackText}>{partner.name}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05. PROGRAMAÇÃO / COMO FUNCIONA ─── */}
      <section className={styles.scheduleSection} aria-label={scheduleTitle}>
        <div className={styles.scheduleFlex}>
          <div className={`${styles.scheduleMediaCol} ${scheduleImgUrl ? '' : styles.scheduleMediaPlaceholder}`}>
            {scheduleImgUrl && <img src={scheduleImgUrl} alt={scheduleTitle} className={styles.scheduleImage} />}
          </div>

          <div className={styles.scheduleStepsCol}>
            {scheduleTag && <p className={styles.sectionTag}>{scheduleTag}</p>}
            {scheduleTitle && <h2 className={styles.scheduleTitle}>{scheduleTitle}</h2>}
            {scheduleSteps.map((step, i) => (
              <div key={i} className={styles.stepItem}>
                <span className={styles.stepTime}>{step.time}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  {step.description && <p className={styles.stepDesc}>{step.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 06. CTA INGRESSOS (SYMPLA) ─── */}
      <section className={styles.ctaSection} aria-label={ctaTitle}>
        <div className={styles.ctaCard}>
          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            <h2 className={styles.ctaTitle}>{ctaTitle}</h2>
            {ctaSubtitle && <p className={styles.ctaSubtitle}>{ctaSubtitle}</p>}
          </div>

          <a
            href={ctaButtonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            {ctaButtonLabel}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>
        {ctaNotice && <p className={styles.ctaNotice}>{ctaNotice}</p>}
      </section>

      {/* ─── 07. EVENTOS ANTERIORES ─── */}
      <section className={styles.pastSection} aria-label={pastEventsTitle}>
        <div className={styles.pastHeader}>
          {pastEventsTag && <p className={styles.sectionTag}>{pastEventsTag}</p>}
          {pastEventsTitle && <h2 className={styles.pastTitle}>{pastEventsTitle}</h2>}
        </div>

        <div className={styles.pastGrid}>
          {pastEvents.map((event, i) => {
            const photoUrl = typeof event.photo === 'string'
              ? event.photo
              : api.getMediaUrl(event.photo, 'card');

            return (
              <a
                key={i}
                className={styles.pastCard}
                href={event.galleryUrl || '#'}
                {...(event.galleryUrl && event.galleryUrl !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className={styles.pastMediaWrap}>
                  {photoUrl ? (
                    <img src={photoUrl} alt={event.name} className={styles.pastPhoto} />
                  ) : (
                    <div className={styles.pastPlaceholder}>{event.name}</div>
                  )}
                </div>
                <div className={styles.pastBody}>
                  <div className={styles.pastName}>{event.name}</div>
                  <div className={styles.pastPills}>
                    {event.date && <span className={styles.pastPill}>{event.date}</span>}
                    {event.people && <span className={styles.pastPill}>{event.people}</span>}
                  </div>
                  {event.desc && <p className={styles.pastDesc}>{event.desc}</p>}
                  {event.galleryUrl && (
                    <span className={styles.pastLink}>
                      {locale === 'en' ? 'View gallery →' : 'Ver galeria →'}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
