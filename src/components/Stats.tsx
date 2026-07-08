import styles from './Stats.module.css';
// Icons are from Material Symbols

import AnimatedText from './AnimatedText';
import AnimatedCounter from './AnimatedCounter';
import {
  imgForYou,
  imgPaid,
  imgAgriculture,
  imgVerified
} from '../assets';
import { useLanguage } from '../i18n';

// Figma node 29:897 — Sessão 4 (Resultados)
// Cards: Peach (#ffd087), DarkGreen (#002d22), Lime (#e1fe00), PaleGreen (#f2ffd9)

export default function Stats() {
  const { locale, t } = useLanguage();

  const cards = [
    {
      id: 'stat-hectares',
      cardCls: styles.cardPeach,
      icon: imgForYou,
      counterValue: 1.5,
      counterPrefix: '',
      counterSuffix: 'B',
      label: t.stats.hectares,
      nodeId: '29:913',
    },
    {
      id: 'stat-pull',
      cardCls: styles.cardDark,
      icon: imgPaid,
      counterValue: 3500,
      counterPrefix: '+',
      counterSuffix: '',
      label: t.stats.tratamentos,
      nodeId: '29:926',
    },
    {
      id: 'stat-fazendas',
      cardCls: styles.cardLime,
      icon: imgAgriculture,
      counterValue: 160,
      counterPrefix: '+',
      counterSuffix: '',
      label: t.stats.fazendas,
      nodeId: '29:929',
    },
    {
      id: 'stat-safras',
      cardCls: styles.cardPaleGreen,
      icon: imgVerified,
      counterValue: 70,
      counterPrefix: '+',
      counterSuffix: '',
      label: t.stats.safras,
      nodeId: '29:932',
    }
  ];

  return (
    <section id="results" className={styles.stats} data-node-id="29:897">
      <div className={styles.inner}>
        <div className={styles.textCol}>
          {/* TAG — "resultados" */}
          <span className="tag-badge dark" data-node-id="29:899">
            {t.stats.tag}
          </span>

          {/* Heading row: title + description */}
          <div className={styles.headingRow} data-node-id="35:1006">
            {/* Title — Figma node 29:901 */}
            <h2 className={styles.title} data-node-id="29:901">
              <AnimatedText key={`stats1-${locale}`} text={t.stats.title1} type="char" delay={0} stagger={0.02} />{' '}
              <span className={styles.titleAccent}>
                <AnimatedText key={`stats2-${locale}`} text={t.stats.title2} type="char" delay={0.2} stagger={0.02} />
              </span>
            </h2>

            {/* Subtext — Figma node 35:1007 */}
            <p className={styles.subtext} data-node-id="35:1007">
              {t.stats.subtext}
            </p>
          </div>

          {/* Cards grid — Figma node 29:902 */}
          <div className={styles.grid} data-node-id="29:902">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`${styles.card} ${card.cardCls}`}
                data-node-id={card.nodeId}
              >
                <img src={card.icon} alt="" className={styles.cardIcon} />
                <div className={styles.value}>
                  <AnimatedCounter 
                    value={card.counterValue} 
                    prefix={card.counterPrefix} 
                    suffix={card.counterSuffix} 
                  />
                </div>
                <div className={styles.label}>{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
