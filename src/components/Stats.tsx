import styles from './Stats.module.css';
import AnimatedText from './AnimatedText';
import AnimatedCounter from './AnimatedCounter';
import { api } from '../services/api';
import type { HomePageData } from '../services/api';
import {
  imgForYou,
  imgPaid,
  imgAgriculture,
  imgVerified
} from '../assets';
import { useLanguage } from '../i18n';

// Card color scheme cycles through the 4 Design colors
const cardClasses = [
  styles.cardPeach,
  styles.cardDark,
  styles.cardLime,
  styles.cardPaleGreen,
];

const cardColorMap: Record<string, string | { bg: string; text: string }> = {
  peach: styles.cardPeach,
  dark: styles.cardDark,
  lime: styles.cardLime,
  paleGreen: styles.cardPaleGreen,
  bronze: { bg: '#e7c8a0', text: '#5c3d1f' },
  forest: { bg: '#2d4a22', text: '#d0f4de' },
  white: { bg: '#ffffff', text: '#1c1917' },
  gray: { bg: '#f3f4f6', text: '#1f2937' },
  softYellow: { bg: '#fef9c3', text: '#713f12' },
  softBlue: { bg: '#dbeafe', text: '#1e3a8a' },
};

// Default icons when no icon is set in CMS
const defaultIcons = [imgForYou, imgPaid, imgAgriculture, imgVerified];

interface StatsProps {
  data?: HomePageData | null;
}

export default function Stats({ data }: StatsProps) {
  const { locale, t } = useLanguage();

  const staticCards = [
    {
      id: 'stat-hectares',
      cardCls: styles.cardPeach,
      icon: imgForYou,
      counterValue: 1.5,
      counterPrefix: '',
      counterSuffix: 'B',
      label: t.stats.hectares || 'Hectares atendidos',
      nodeId: '29:913',
    },
    {
      id: 'stat-pull',
      cardCls: styles.cardDark,
      icon: imgPaid,
      counterValue: 3500,
      counterPrefix: '+',
      counterSuffix: '',
      label: t.stats.tratamentos || 'Tratamentos no campo de pesquisa',
      nodeId: '29:926',
    },
    {
      id: 'stat-fazendas',
      cardCls: styles.cardLime,
      icon: imgAgriculture,
      counterValue: 160,
      counterPrefix: '+',
      counterSuffix: '',
      label: t.stats.fazendas || 'Fazendas/Grupos atendidos',
      nodeId: '29:929',
    },
    {
      id: 'stat-safras',
      cardCls: styles.cardPaleGreen,
      icon: imgVerified,
      counterValue: 70,
      counterPrefix: '+',
      counterSuffix: '',
      label: t.stats.safras || 'Safras de experiência somada',
      nodeId: '29:932',
    }
  ];

  const subtext = data?.statsSubtext || t.stats.subtext;
  const titleNormal = data?.statsTitle || t.stats.title1;
  const titleAccent = data?.statsTitleAccent || t.stats.title2;

  // Use CMS stats if available (at least one item), otherwise fall back to static
  const hasCmsStats = data?.stats && data.stats.length > 0;

  const cards = hasCmsStats
    ? data!.stats!.map((stat, i) => {
        let styleObj: React.CSSProperties = {};
        let cardCls = cardClasses[i % cardClasses.length];

        if (stat.color) {
          if (stat.color === 'custom') {
            styleObj = {
              backgroundColor: stat.customBgColor || '#ffd087',
              color: stat.customTextColor || '#965a30',
            };
            cardCls = '';
          } else {
            const mapped = cardColorMap[stat.color];
            if (typeof mapped === 'string') {
              cardCls = mapped;
            } else if (mapped) {
              styleObj = {
                backgroundColor: mapped.bg,
                color: mapped.text,
              };
              cardCls = '';
            }
          }
        }

        return {
          id: stat.id ?? `stat-cms-${i}`,
          cardCls,
          styleObj,
          icon: stat.icon ? api.getMediaUrl(stat.icon) : defaultIcons[i % defaultIcons.length],
          counterValue: stat.value,
          counterPrefix: stat.prefix ?? '',
          counterSuffix: stat.suffix ?? '',
          label: stat.label,
          nodeId: `stat-card-${i}`,
        };
      })
    : staticCards.map(card => ({ ...card, styleObj: undefined as React.CSSProperties | undefined }));

  const isCarousel = cards.length > 4;

  return (
    <section id="results" className={styles.stats} data-node-id="29:897">
      <div className={styles.inner}>
        <div className={styles.textCol}>
          {/* TAG — "resultados" */}
          <span className="tag-badge dark" data-node-id="29:899">
            {data?.statsTag || t.stats.tag}
          </span>

          {/* Heading row: title + description */}
          <div className={styles.headingRow} data-node-id="35:1006">
            {/* Title — Layout */}
            <h2 
              className={styles.title} 
              data-node-id="29:901"
              style={{ textAlign: data?.statsTitleAlign || 'left' }}
            >
              <AnimatedText key={`stats1-${locale}-${titleNormal}`} text={titleNormal} type="char" delay={0} stagger={0.02} />{' '}
              <span className={styles.titleAccent} style={data?.statsTitleAccentColor ? { color: data.statsTitleAccentColor } : undefined}>
                <AnimatedText key={`stats2-${locale}-${titleAccent}`} text={titleAccent} type="char" delay={0.2} stagger={0.02} />
              </span>
            </h2>

            {/* Subtext — Layout */}
            <p 
              className={styles.subtext} 
              data-node-id="35:1007"
              style={{ textAlign: data?.statsSubtextAlign || 'left', whiteSpace: 'pre-line' }}
            >
              {subtext}
            </p>
          </div>

          {/* Cards container */}
          {isCarousel ? (
            /* Automatic Infinite Scroll Carousel for > 4 items */
            <div className={styles.carouselContainer}>
              <div className={styles.track}>
                {[...cards, ...cards].map((card, i) => {
                  const valStr = card.counterPrefix + Intl.NumberFormat(locale === 'en' ? 'en-US' : 'pt-BR').format(card.counterValue) + card.counterSuffix;
                  const isLong = valStr.length > 8;
                  const isExtraLong = valStr.length > 12;

                  return (
                    <div
                      key={`${card.id}-carousel-${i}`}
                      className={`${styles.card} ${card.cardCls}`}
                      style={card.styleObj}
                      data-node-id={card.nodeId}
                    >
                      <img src={card.icon} alt="" className={styles.cardIcon} />
                      <div className={`${styles.value} ${isExtraLong ? styles.extraLong : isLong ? styles.long : ''}`}>
                        <AnimatedCounter 
                          value={card.counterValue} 
                          prefix={card.counterPrefix} 
                          suffix={card.counterSuffix} 
                        />
                      </div>
                      <div className={styles.label}>{card.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Static equal-size grid for <= 4 items */
            <div className={styles.grid} data-node-id="29:902">
              {cards.map((card) => {
                const valStr = card.counterPrefix + Intl.NumberFormat(locale === 'en' ? 'en-US' : 'pt-BR').format(card.counterValue) + card.counterSuffix;
                const isLong = valStr.length > 8;
                const isExtraLong = valStr.length > 12;

                return (
                  <div
                    key={card.id}
                    className={`${styles.card} ${card.cardCls}`}
                    style={card.styleObj}
                    data-node-id={card.nodeId}
                  >
                    <img src={card.icon} alt="" className={styles.cardIcon} />
                    <div className={`${styles.value} ${isExtraLong ? styles.extraLong : isLong ? styles.long : ''}`}>
                      <AnimatedCounter 
                        value={card.counterValue} 
                        prefix={card.counterPrefix} 
                        suffix={card.counterSuffix} 
                      />
                    </div>
                    <div className={styles.label}>{card.label}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
