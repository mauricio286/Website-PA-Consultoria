import { Link } from 'react-router-dom';
import styles from './ServicesList.module.css';
import { type Service, type ServicesPageData } from '../../../../services/api';
import { useLanguage } from '../../../../i18n';

interface ServicesListProps {
  data?: ServicesPageData | null;
  list?: Service[] | null;
}

function getServicePath(slug?: string): string {
  if (!slug) return '#';
  const clean = slug.trim().toLowerCase();
  if (clean.startsWith('/')) return clean;
  if (clean === "consultoria-agronomica" || clean === "consultoriaagronomica") return "/consultoriaagronomica";
  if (clean === "agricultura-de-precisao" || clean === "agriculturaprecisao") return "/agriculturaprecisao";
  if (clean === "gestao-de-compras" || clean === "gestaocompras") return "/gestaocompras";
  if (clean === "pesquisa-agronomica" || clean === "pesquisaagronomica") return "/pesquisaagronomica";
  if (clean === "unita") return "/unita";
  return `/${clean.replace(/-/g, '')}`;
}

export default function ServicesList({ data, list }: ServicesListProps) {
  const { t } = useLanguage();

  // Safe fallbacks for headers
  const badge = data?.servicesBadge || t.servicos.tag;
  const titleNormal = data?.servicesTitle || t.servicos.title1;
  const titleAccent = data?.servicesSubtitle || t.servicos.titleHighlight;
  const description = data?.servicesDescription || t.servicos.description;

  // Static fallback list if CMS has no published services
  const staticServices = [
    {
      title: t.servicos.consultoriaTitle || "Consultoria\nAgronômica",
      shortDescription: t.servicos.consultoriaDesc || "A PA Consultoria nasceu do campo...",
      slug: "consultoriaagronomica"
    },
    {
      title: t.servicos.unitaTitle || "Unitá",
      shortDescription: "",
      slug: "unita"
    },
    {
      title: t.servicos.agriculturaTitle || "Agricultura\nde Precisão",
      shortDescription: t.servicos.agriculturaDesc || "A pesquisa agronômica é um dos pilares...",
      slug: "agriculturaprecisao"
    },
    {
      title: t.servicos.gestaoTitle || "Gestão\nde Compras",
      shortDescription: t.servicos.gestaoDesc || "A gestão de compras vai muito além...",
      slug: "gestaocompras"
    },
    {
      title: t.servicos.pesquisaTitle || "Pesquisa\nAgronômica",
      shortDescription: t.servicos.pesquisaDesc || "A pesquisa agronômica é um dos pilares...",
      slug: "pesquisaagronomica"
    }
  ];

  const servicesToRender = (data?.servicesCards && data.servicesCards.length > 0)
    ? data.servicesCards
    : (list && list.length > 0 ? list : staticServices);

  return (
    <section id="servicos" className={styles.servicesSection}>
      <div className={styles.servicesHeader}>
        <div className={styles.tagWrapper}>
          <span className="tag-badge dark" style={{ borderColor: '#88a668', color: '#455336', backgroundColor: 'transparent' }}>
            {badge}
          </span>
        </div>
        
        <div className={styles.titleWrapper}>
          <h2 className={styles.sectionTitle} style={{ whiteSpace: 'pre-line' }}>
            {titleNormal}
            {titleAccent && (
              <>
                <br />
                <span className={styles.highlight}>{titleAccent}</span>
              </>
            )}
          </h2>
          <p className={styles.sectionDescription} style={{ whiteSpace: 'pre-line' }}>
            {description}
          </p>
        </div>
      </div>
      <div className={styles.servicesList}>
        {servicesToRender.map((svc, idx) => {
          // Even indexes: cardDarkGreen, odd indexes: cardLightGreen
          const isEven = idx % 2 === 0;
          const cardClass = isEven ? styles.cardDarkGreen : styles.cardLightGreen;
          const titleClass = isEven ? styles.cardTitleLightGreen : styles.cardTitleDarkGreen;
          const textClass = isEven ? styles.cardTextLightGreen : styles.cardTextDarkGreen;
          const btnClass = isEven ? "btn-pa white" : "btn-pa dark-green";
          
          const path = getServicePath(svc.slug);

          return (
            <div key={('id' in svc ? svc.id : undefined) || idx} className={`${styles.serviceCard} ${cardClass}`}>
              <div className={styles.cardContent}>
                <h3 className={titleClass} style={{ whiteSpace: 'pre-line' }}>
                  {svc.title}
                </h3>
                <p className={textClass} style={{ whiteSpace: 'pre-line' }}>
                  {svc.shortDescription}
                </p>
              </div>
              <div className={styles.cardButton}>
                <Link to={path} className={btnClass}>
                  <span className="btn-label">{t.servicos.verMais || 'Ver mais'}</span>
                  <span className="btn-icon"><span className="material-symbols-rounded">arrow_back</span></span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
