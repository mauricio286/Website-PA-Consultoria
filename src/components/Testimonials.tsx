import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Testimonials.module.css';
import {
  imgPerfil,
  imgPerfil1,
  imgPerfil2,
  imgPerfil3,

  imgImagem as _imgImagem
} from '../assets';
import AnimatedText from './AnimatedText';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

// Figma Depoimentos — 4 cards in 2x2 grid
// Top-left and bottom-right are dark (#002d22), others light (#eee)
const testimonials: Testimonial[] = [
  {
    id: 'dep-3',
    name: 'Ricardo Mantovani',
    location: 'Grupo Mantovani • Sorriso - MT',
    text: 'O que eu mais gosto na equipe é que eles não são consultores de escritório. Estão sempre aqui na fazenda, entram no talhão, olham a praga de perto e discutem o manejo comigo no pátio. É um suporte técnico que dá muita segurança para decidir.',
    avatar: imgPerfil3,
  },
  {
    id: 'dep-1',
    name: 'Aline Albuquerque',
    location: 'Agropecuária Albuquerque • Rio Verde - GO',
    text: 'A gente comprou maquinário novo e várias ferramentas digitais, mas faltava braço e treinamento para fazer tudo rodar. O pessoal da PA destravou isso aqui dentro, gerando os mapas de aplicação que a gente precisava para economizar insumo.',
    avatar: imgPerfil,
  },
  {
    id: 'dep-2',
    name: 'Geraldo Augusto',
    location: 'Fazenda Santa Maria • Cristalina - GO',
    text: 'A gente já colhia bem, mas a parte de custos era meio bagunçada, tudo na cabeça ou em caderneta. Eles ajudaram a organizar os números da safra e a enxergar para onde estava indo o dinheiro. Hoje a fazenda roda muito mais profissional.',
    avatar: imgPerfil2,
  },
  {
    id: 'dep-4',
    name: 'José Carlos Junqueira',
    location: 'Fazenda Primavera • Uberaba - MG',
    text: 'Trabalhar com a PA me tirou uma preocupação grande da cabeça. Sei que a parte de recomendação, perfil de solo e o monitoramento técnico estão bem assistidos por quem entende do assunto, aí consigo focar em outras frentes do negócio.',
    avatar: imgPerfil1,
  },
];

export default function Testimonials() {
  const [selectedId, setSelectedId] = useState<string>('dep-3'); // default selected

  return (
    <section id="testimonials" className={styles.testimonials} data-node-id="36:1348">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className="tag-badge dark" data-node-id="36:1350">
            depoimentos
          </span>
          <h2 className={styles.title} data-node-id="36:1352">
            <AnimatedText text="A escolha dos líderes" type="char" delay={0} stagger={0.02} />
            <br />
            <span className={styles.titleAccent}>
              <AnimatedText text="que inovam no campo" type="char" delay={0.3} stagger={0.02} />
            </span>
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className={styles.grid}>
          {testimonials.map((dep) => (
            <div
              key={dep.id}
              className={`${styles.card} ${selectedId === dep.id ? styles.cardDark : styles.cardLight} ${selectedId === dep.id ? styles.cardSelected : ''}`}
              onClick={() => setSelectedId(dep.id)}
              data-node-id={dep.id}
            >
              {/* Quote mark — Figma: Chivo 128px */}
              <div className={styles.quoteMark}>''</div>

              <p className={styles.quoteText}>{dep.text}</p>

              <div className={styles.profile}>
                <img src={dep.avatar} alt={dep.name} className={styles.avatar} />
                <div className={styles.profileInfo}>
                  <span className={styles.profileName}>{dep.name}</span>
                  <span className={styles.profileLocation}>{dep.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — Figma BotaoFaleComUmConsultor: w=266px */}
        <div className={styles.ctaWrapper}>
          <Link to="/contato" className="btn-pa dark-green-lg" data-node-id="64:437">
            <span className="btn-label">Fale com um consultor</span>
            <span className="btn-icon">
              <span className="material-symbols-rounded" style={{ fontSize: '24px', lineHeight: 1 }}>arrow_back</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
