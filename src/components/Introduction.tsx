import styles from './Introduction.module.css';
import { imgSimbol1 } from '../assets';

export default function Introduction() {
  return (
    <section id="intro" className={styles.intro} data-node-id="16:522">
      <div className={styles.container}>
        {/* Left — text and button */}
        <div className={styles.leftCol} data-node-id="16:526">
          {/* TAG — Figma node 16:529 */}
          <span className="tag-badge dark" data-node-id="16:523">
            Introdução
          </span>

          {/* Main paragraph — Figma node 16:525 */}
          <p className={styles.mainText} data-node-id="16:525">
            No campo, resultado não acontece por acaso. Ele nasce de experiência, estratégia e decisões bem tomadas. Há mais de 20 anos, o Grupo PA caminha ao lado do produtor rural, unindo consultoria técnica, agricultura de precisão e gestão para transformar conhecimento em produtividade.
          </p>

          {/* Button — Figma BotaoVerMais: dark-green, 153px */}
          <div className={styles.btnWrapper} data-node-id="27:878">
            <a href="/quem-somos" className="btn-pa dark-green" data-node-id="54:105">
              <span className="btn-label">Ver mais</span>
              <span className="btn-icon">
                <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
              </span>
            </a>
          </div>
        </div>

        {/* Right — Symbol Logo */}
        <div className={styles.rightCol} data-node-id="122:1934">
          <img
            src={imgSimbol1}
            alt="PA Símbolo"
            className={styles.symbol}
            data-node-id="193:1192"
          />
        </div>
      </div>
    </section>
  );
}
