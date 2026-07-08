import { Link } from 'react-router-dom';
import styles from './ServicesList.module.css';
import { type Service, type ServicesPageData } from '../../../../services/api';

interface ServicesListProps {
  data?: ServicesPageData | null;
  list?: Service[] | null;
}

function getServicePath(slug?: string): string {
  if (!slug) return '#';
  const clean = slug.replace(/-/g, '');
  return `/${clean}`;
}

export default function ServicesList({ data, list }: ServicesListProps) {
  // Safe fallbacks for headers
  const badge = data?.servicesBadge || "eixos de atuação";
  const titleNormal = data?.servicesTitle ?? (data ? "" : "Nossos");
  const titleAccent = data?.servicesSubtitle ?? (data ? "" : "serviços");
  const description = data?.servicesDescription || "Do planejamento ao pós-colheita, atuamos de forma estratégica para que cada decisão no campo seja mais eficiente e rentável. Nossos serviços unem acompanhamento técnico, agricultura de precisão, pesquisa e análise de dados para otimizar produtividade, reduzir perdas e gerar resultados consistentes em cada safra.";

  // Static fallback list if CMS has no published services
  const staticServices = [
    {
      title: "Consultoria\nAgronômica",
      shortDescription: "A PA Consultoria nasceu do campo e construiu sua reputação entregando aquilo que realmente...",
      slug: "consultoria-agronomica"
    },
    {
      title: "Unitá",
      shortDescription: "",
      slug: "unita"
    },
    {
      title: "Agricultura\nde Precisão",
      shortDescription: "A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente...",
      slug: "agricultura-de-precisao"
    },
    {
      title: "Gestão\nde Compras",
      shortDescription: "A gestão de compras vai muito além da negociação de valores. Nosso...",
      slug: "gestao-de-compras"
    },
    {
      title: "Pesquisa\nAgronômica",
      shortDescription: "A pesquisa agronômica é um dos pilares do Grupo PA. Investimos constantemente...",
      slug: "pesquisa-agronomica"
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
                  <span className="btn-label">Ver mais</span>
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
