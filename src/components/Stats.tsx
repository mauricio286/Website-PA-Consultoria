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

// Figma node 29:897 — Sessão 4 (Resultados)
// Cards: Peach (#ffd087), DarkGreen (#002d22), Lime (#e1fe00), PaleGreen (#f2ffd9)
const cards = [
  {
    id: 'stat-hectares',
    cardCls: styles.cardPeach,
    icon: imgForYou,
    counterValue: 1.5,
    counterPrefix: '',
    counterSuffix: 'B',
    label: 'Hectares atendidos',
    nodeId: '29:913',
  },
  {
    id: 'stat-pull',
    cardCls: styles.cardDark,
    icon: imgPaid,
    counterValue: 3500,
    counterPrefix: '+',
    counterSuffix: '',
    label: 'Tratamentos no campo de pesquisa',
    nodeId: '29:926',
  },
  {
    id: 'stat-fazendas',
    cardCls: styles.cardLime,
    icon: imgAgriculture,
    counterValue: 160,
    counterPrefix: '+',
    counterSuffix: '',
    label: 'Fazendas/Grupos atendidos',
    nodeId: '29:929',
  },
  {
    id: 'stat-safras',
    cardCls: styles.cardPaleGreen,
    icon: imgVerified,
    counterValue: 70,
    counterPrefix: '+',
    counterSuffix: '',
    label: 'Safras de experiência somada',
    nodeId: '29:932',
  }
];

export default function Stats() {
  return (
    <section id="results" className={styles.stats} data-node-id="29:897">
      <div className={styles.inner}>
        <div className={styles.textCol}>
          {/* TAG — "resultados" */}
          <span className="tag-badge dark" data-node-id="29:899">
            resultados
          </span>

          {/* Heading row: title + description */}
          <div className={styles.headingRow} data-node-id="35:1006">
            {/* Title — Figma node 29:901 */}
            <h2 className={styles.title} data-node-id="29:901">
              <AnimatedText text="Números que" type="char" delay={0} stagger={0.02} />{' '}
              <span className={styles.titleAccent}>
                <AnimatedText text="traduzem excelência" type="char" delay={0.2} stagger={0.02} />
              </span>
            </h2>

            {/* Subtext — Figma node 35:1007 */}
            <p className={styles.subtext} data-node-id="35:1007">
              Os números são consequência de um trabalho feito com proximidade, análise e presença no campo. Cada resultado carrega planejamento técnico, acompanhamento constante e a confiança de produtores que crescem junto com a gente.
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
