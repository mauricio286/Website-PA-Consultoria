import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { api } from '../services/api';
import type { HomePageData, HomeCulturasData } from '../services/api';
import { useLanguage } from '../i18n';
import styles from './Culturas.module.css';

/* ───────────────────────── Geometria das bolhas ─────────────────────────
   Desktop/tablet: valores exatos de especificacoes-home-culturas.md (palco 1000×660,
   centros já com o deslocamento de +70px em X).
   Compact (<640px): arranjo próprio (palco 360×520) — NÃO definido na especificação,
   precisa de validação do designer. */

type BubbleId = 'teal1' | 'lime2' | 'soja' | 'teal2' | 'cobre2' | 'milho' | 'algodao' | 'teal3';
type CulturaId = 'soja' | 'milho' | 'algodao';
type NumeroKey = 'n1' | 'n2' | 'n3' | 'n4' | 'n5';

interface BubbleDef {
  id: BubbleId;
  kind: 'cultura' | 'stat';
  d: number;
  cx: number;
  cy: number;
}

interface Layout {
  w: number;
  h: number;
  bubbles: BubbleDef[];
  numDivisor: number; // tamanho do número = round(d / numDivisor)
  legendPx: number;
}

const DESKTOP: Layout = {
  w: 1000,
  h: 660,
  numDivisor: 4.2,
  legendPx: 11,
  bubbles: [
    { id: 'teal1', kind: 'stat', d: 182, cx: 255, cy: 330 },
    { id: 'lime2', kind: 'stat', d: 86, cx: 335, cy: 190 },
    { id: 'soja', kind: 'cultura', d: 230, cx: 470, cy: 290 },
    { id: 'teal2', kind: 'stat', d: 86, cx: 520, cy: 125 },
    { id: 'cobre2', kind: 'stat', d: 114, cx: 575, cy: 455 },
    { id: 'milho', kind: 'cultura', d: 234, cx: 710, cy: 330 },
    { id: 'algodao', kind: 'cultura', d: 174, cx: 655, cy: 120 },
    { id: 'teal3', kind: 'stat', d: 74, cx: 785, cy: 185 },
  ],
};

const COMPACT: Layout = {
  w: 360,
  h: 520,
  numDivisor: 3.4,
  legendPx: 10,
  bubbles: [
    { id: 'teal1', kind: 'stat', d: 104, cx: 70, cy: 295 },
    { id: 'lime2', kind: 'stat', d: 64, cx: 318, cy: 200 },
    { id: 'soja', kind: 'cultura', d: 150, cx: 100, cy: 120 },
    { id: 'teal2', kind: 'stat', d: 64, cx: 178, cy: 195 },
    { id: 'cobre2', kind: 'stat', d: 76, cx: 100, cy: 430 },
    { id: 'milho', kind: 'cultura', d: 150, cx: 235, cy: 290 },
    { id: 'algodao', kind: 'cultura', d: 116, cx: 265, cy: 105 },
    { id: 'teal3', kind: 'stat', d: 60, cx: 250, cy: 440 },
  ],
};

const COLORS: Record<BubbleId, { bg: string; ink: string }> = {
  teal1: { bg: '#0F5C4B', ink: '#FFFFFF' },
  lime2: { bg: '#E2FF00', ink: '#06221A' },
  soja: { bg: '#E2FF00', ink: '#06221A' },
  teal2: { bg: '#0F5C4B', ink: '#FFFFFF' },
  cobre2: { bg: '#B57F4C', ink: '#1A1208' },
  milho: { bg: '#B57F4C', ink: '#1A1208' },
  algodao: { bg: '#E6E6E6', ink: '#06221A' },
  teal3: { bg: '#0F5C4B', ink: '#FFFFFF' },
};

const STAT_KEY: Record<string, NumeroKey> = {
  teal1: 'n1',
  lime2: 'n2',
  teal2: 'n3',
  cobre2: 'n4',
  teal3: 'n5',
};

const LEAVES = [
  [140, 90, 110, 70, 25],
  [360, 120, 110, 70, 30],
  [560, 170, 100, 65, 35],
  [220, 300, 110, 70, 25],
  [470, 380, 110, 70, 30],
  [360, 560, 110, 70, 28],
  [580, 620, 100, 65, 35],
  [260, 780, 110, 70, 25],
];

type Mode = 'wide' | 'stack' | 'compact';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/* Textos de reserva (quando o CMS ainda não tem o campo preenchido) */
const FALLBACK = {
  pt: {
    tag: 'ESTRUTURA', title: 'Culturas', subtitle: 'Passe o mouse ou toque em uma bolha para explorar.',
    emptyKicker: 'GRUPO PA', emptyTitle: 'Onde a PA atua',
    emptyText: 'Cada bolha é uma cultura ou um número da PA. Passe o mouse para ver a imagem e os dados; clique para fixar.',
    kickerCultura: 'CULTURA', kickerNumeros: 'A PA EM NÚMEROS', view: 'Ver',
    names: { soja: 'Soja', milho: 'Milho', algodao: 'Algodão' },
  },
  en: {
    tag: 'STRUCTURE', title: 'Crops', subtitle: 'Hover or tap a bubble to explore.',
    emptyKicker: 'PA GROUP', emptyTitle: 'Where PA operates',
    emptyText: 'Each bubble is a crop or a PA number. Hover to see the image and data; click to pin.',
    kickerCultura: 'CROP', kickerNumeros: 'PA IN NUMBERS', view: 'View',
    names: { soja: 'Soybean', milho: 'Corn', algodao: 'Cotton' },
  },
} as const;

interface PanelStat { numero: string; legenda: string }
interface BubbleContent {
  label: string;       // rótulo (cultura) ou legenda (stat)
  number: string;      // só stat
  title: string;       // título no painel
  text: string;
  photo: string;       // só cultura
  stats: PanelStat[];  // só cultura
  kicker: string;
}

interface CulturasProps {
  data?: HomePageData | null;
}

export default function Culturas({ data }: CulturasProps) {
  const { locale } = useLanguage();
  const fb = FALLBACK[locale === 'en' ? 'en' : 'pt'];
  const c: HomeCulturasData | undefined = data?.culturas;

  const sectionRef = useRef<HTMLElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>('wide');
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState<BubbleId | null>(null);
  const [pinned, setPinned] = useState<BubbleId | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const layout = mode === 'compact' ? COMPACT : DESKTOP;
  const enabled = c?.enabled === true;

  // Modo de layout conforme a largura da seção + escala do palco conforme a largura disponível
  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const wrap = stageWrapRef.current;
    if (!section || !wrap) return;

    const measure = () => {
      const sw = section.clientWidth;
      const next: Mode = sw >= 1200 ? 'wide' : sw >= 640 ? 'stack' : 'compact';
      setMode((prev) => (prev === next ? prev : next));
      const lay = next === 'compact' ? COMPACT : DESKTOP;
      const w = wrap.clientWidth;
      if (w > 0) setScale(Math.min(1, w / lay.w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [enabled, mode]);

  // Ao trocar de layout, limpa estados dependentes de coordenadas
  useEffect(() => {
    setMouse(null);
  }, [mode]);

  /* ───────── Conteúdo de cada bolha (CMS + reservas) ───────── */
  const contents = useMemo(() => {
    const out = {} as Record<BubbleId, BubbleContent>;
    (['soja', 'milho', 'algodao'] as CulturaId[]).forEach((id) => {
      const src = c?.[id];
      const nome = src?.nome || fb.names[id];
      const stats: PanelStat[] = [
        { numero: src?.stat1Numero || '', legenda: src?.stat1Legenda || '' },
        { numero: src?.stat2Numero || '', legenda: src?.stat2Legenda || '' },
        { numero: src?.stat3Numero || '', legenda: src?.stat3Legenda || '' },
      ].filter((s) => s.numero.trim() !== '');
      out[id] = {
        label: nome,
        number: '',
        title: nome,
        text: src?.texto || '',
        photo: src?.foto ? api.getMediaUrl(src.foto, 'card') : '',
        stats,
        kicker: c?.kickerCultura || fb.kickerCultura,
      };
    });
    Object.entries(STAT_KEY).forEach(([id, key]) => {
      const src = c?.[key];
      const valor = (src?.valor || '').trim();
      out[id as BubbleId] = {
        label: src?.legenda || '',
        number: valor,
        title: [valor, src?.tituloPainel || ''].filter(Boolean).join(' '),
        text: src?.texto || '',
        photo: '',
        stats: [],
        kicker: c?.kickerNumeros || fb.kickerNumeros,
      };
    });
    return out;
  }, [c, fb]);

  const active: BubbleId | null = hover ?? pinned;
  const k = layout.w / 1000; // fator para raios de influência do mouse no palco compacto

  /* ───────── Deslocamentos (parallax, ímã, bolha ativa, vizinhas) ───────── */
  const offsets = useMemo(() => {
    const res: Record<string, { ox: number; oy: number }> = {};
    const A = active ? layout.bubbles.find((b) => b.id === active) : undefined;
    const Agrow = A ? (A.kind === 'cultura' ? 1.32 : 1.25) : 1;
    const midX = layout.w / 2;
    const midY = layout.h / 2;

    layout.bubbles.forEach((b) => {
      const r = b.d / 2;
      let ox = 0;
      let oy = 0;

      if (mouse) {
        const dx = mouse.x - b.cx;
        const dy = mouse.y - b.cy;
        const dist = Math.hypot(dx, dy) || 1;
        const depth = 60 / r;
        ox += (mouse.x - midX) * 0.025 * depth;
        oy += (mouse.y - midY) * 0.025 * depth;
        const f = Math.max(0, 1 - dist / (340 * k));
        ox += dx * 0.16 * f;
        oy += dy * 0.16 * f;
        if (A && b.id === A.id) {
          ox = clamp(dx * 0.3, -50 * k, 50 * k);
          oy = clamp(dy * 0.3, -50 * k, 50 * k);
        }
      }

      if (A && b.id !== A.id) {
        const vx = b.cx - A.cx;
        const vy = b.cy - A.cy;
        const d = Math.hypot(vx, vy) || 1;
        const push = Math.max(0, (A.d / 2) * Agrow + r + 14 * k - d);
        ox += (vx / d) * push;
        oy += (vy / d) * push;
      }

      res[b.id] = { ox, oy };
    });
    return res;
  }, [active, mouse, layout, k]);

  /* ───────── Mouse no palco (1 atualização por frame) ───────── */
  const rafRef = useRef<number | null>(null);
  const lastMouse = useRef<{ x: number; y: number } | null>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const s = rect.width / layout.w || 1;
      lastMouse.current = { x: (e.clientX - rect.left) / s, y: (e.clientY - rect.top) / s };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          setMouse(lastMouse.current);
        });
      }
    },
    [layout.w],
  );

  const onPointerLeaveStage = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    lastMouse.current = null;
    setMouse(null);
    setHover(null);
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  // Esc desafixa
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinned(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // No celular o painel fica abaixo do palco: ao fixar uma bolha, garante que ele apareça
  const handleToggle = (id: BubbleId) => {
    const willPin = pinned !== id;
    setPinned(willPin ? id : null);
    if (willPin && mode !== 'wide') {
      requestAnimationFrame(() => {
        const el = panelRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom > window.innerHeight || r.top < 0) {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
        }
      });
    }
  };

  if (!enabled) return null;

  const tag = c?.tag || fb.tag;
  const title = c?.titulo || fb.title;
  const subtitle = c?.subtitulo || fb.subtitle;
  const activeContent = active ? contents[active] : null;
  const activeColor = active ? COLORS[active].bg : '#E2FF00';
  const activeKind = active ? layout.bubbles.find((b) => b.id === active)?.kind : undefined;

  const stageStyle: CSSProperties = {
    width: layout.w,
    height: layout.h,
    transform: `scale(${scale})`,
  };

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles[mode]}`} aria-labelledby="culturas-title">
      <svg className={styles.leaves} viewBox="0 0 620 900" aria-hidden="true" focusable="false">
        {LEAVES.map(([cx, cy, rx, ry, rot], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke="#3E5A10"
            strokeWidth="1.5"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        ))}
      </svg>

      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.tag}>{tag}</span>
          <h2 id="culturas-title" className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.stageCol}>
          <div
            ref={stageWrapRef}
            className={styles.stageWrap}
            style={{ height: layout.h * scale }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeaveStage}
          >
            <div className={styles.stage} style={stageStyle}>
              {layout.bubbles.map((b, i) => {
                const col = COLORS[b.id];
                const content = contents[b.id];
                const isActive = active === b.id;
                const grow = b.kind === 'cultura' ? 1.32 : 1.25;
                const off = offsets[b.id] || { ox: 0, oy: 0 };
                const r = b.d / 2;
                const ariaLabel =
                  b.kind === 'cultura'
                    ? `${fb.view} ${content.label}`
                    : content.title || content.label || b.id;

                const wrapStyle: CSSProperties = {
                  left: b.cx - r,
                  top: b.cy - r,
                  width: b.d,
                  height: b.d,
                  zIndex: isActive ? 10 : 1,
                  transform: `translate(${off.ox}px, ${off.oy}px)`,
                };
                const floatStyle: CSSProperties = {
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                };
                const btnStyle: CSSProperties = {
                  background: col.bg,
                  color: col.ink,
                  transform: `scale(${isActive ? grow : 1})`,
                  boxShadow: isActive ? '0 24px 60px rgba(0,0,0,0.45)' : 'none',
                };

                return (
                  <div key={b.id} className={styles.move} style={wrapStyle}>
                    <div className={styles.float} style={floatStyle}>
                      <button
                        type="button"
                        className={styles.bubble}
                        style={btnStyle}
                        aria-label={ariaLabel}
                        aria-pressed={pinned === b.id}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(b.id)}
                        onPointerLeave={(e) => e.pointerType === 'mouse' && setHover((h) => (h === b.id ? null : h))}
                        onFocus={(e) => e.currentTarget.matches(':focus-visible') && setHover(b.id)}
                        onBlur={() => setHover((h) => (h === b.id ? null : h))}
                        onClick={() => handleToggle(b.id)}
                      >
                        {b.kind === 'cultura' ? (
                          <>
                            <span
                              className={styles.restLabel}
                              style={{ opacity: isActive && content.photo ? 0 : 1, fontSize: mode === 'compact' ? 17 : 21 }}
                            >
                              {content.label}
                            </span>
                            {/* Sem foto: a bolha permanece igual ao estado de repouso (só o rótulo) */}
                            {content.photo && (
                              <>
                                <span className={styles.photoLayer} style={{ opacity: isActive ? 1 : 0 }}>
                                  <img src={content.photo} alt="" className={styles.photo} draggable={false} />
                                </span>
                                <span
                                  className={styles.namePill}
                                  style={{ opacity: isActive ? 1 : 0, background: col.bg, color: col.ink }}
                                >
                                  {content.label}
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <span className={styles.statContent} style={{ opacity: isActive ? 1 : 0 }}>
                            {content.number && (
                              <span className={styles.statNumber} style={{ fontSize: Math.round(b.d / layout.numDivisor) }}>
                                {content.number}
                              </span>
                            )}
                            {content.label && (
                              <span className={styles.statLegend} style={{ fontSize: layout.legendPx }}>
                                {content.label}
                              </span>
                            )}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside ref={panelRef} className={styles.panel} aria-live="polite">
          {activeContent ? (
            <>
              <div className={styles.panelKickerRow}>
                <span className={styles.dot} style={{ background: activeColor }} />
                <span className={styles.kicker}>{activeContent.kicker}</span>
              </div>
              <h3 className={`${styles.panelTitle} ${styles.panelTitleActive}`}>{activeContent.title}</h3>
              {activeContent.text && <p className={`${styles.panelText} ${styles.panelTextActive}`}>{activeContent.text}</p>}
              {activeKind === 'cultura' && activeContent.stats.length > 0 && (
                <div className={styles.panelStats}>
                  {activeContent.stats.map((s, i) => (
                    <div key={i} className={styles.panelStatRow}>
                      <span className={styles.panelStatNum}>{s.numero}</span>
                      <span className={styles.panelStatLegend}>{s.legenda}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <span className={styles.kicker}>{c?.painelKicker || fb.emptyKicker}</span>
              <h3 className={styles.panelTitle}>{c?.painelTitulo || fb.emptyTitle}</h3>
              <p className={styles.panelText}>{c?.painelTexto || fb.emptyText}</p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
