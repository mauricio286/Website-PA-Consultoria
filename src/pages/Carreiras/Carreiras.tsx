import { useState, useRef, useEffect } from 'react';
import styles from './Carreiras.module.css';
import AnimatedText from '../../components/AnimatedText';
import { imgBgCarreiras } from '../../assets';

// ─── Dados das Vagas ─────────────────────────────────────────────────────────
interface Vaga {
  id: number;
  data: string;
  titulo: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  requisitos: string[];
  atribuicoes: string[];
}

const vagas: Vaga[] = [
  {
    id: 1,
    data: 'Aberta em 12/03/2027',
    titulo: 'Analista Administrativo Corporativo',
    descricaoCurta:
      'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos da empresa...',
    descricaoCompleta:
      'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos da empresa, assegurando a conformidade com as obrigações legais e fiscais, o controle eficaz das despesas, a gestão de fornecedores e o suporte à coordenação administrativa financeira.',
    requisitos: [
      'CNH categoria AB',
      'Experiência como analista administrativo financeiro',
      'Graduação em Administração, Ciências Contábeis ou áreas correlatas',
      'Domínio das rotinas administrativas e financeiras',
      'Comunicação assertiva com fornecedores e clientes',
      'Domínio em Excel e conhecimento em Power BI',
      'Pacote Office em nível intermediário',
    ],
    atribuicoes: [
      'Realizar a conciliação bancária',
      'Lançar notas fiscais no sistema',
      'Emitir notas fiscais conforme necessidade',
      'Responsável pelas rotinas de contas a pagar e contas a receber',
      'Organizar o movimento mensal (fluxos e documentos financeiros)',
      'Manter organizado o arquivo digital e físico de documentos',
    ],
  },
  {
    id: 2,
    data: 'Aberta em 12/03/2027',
    titulo: 'Analista Centro de Operações Agrícolas (COA)',
    descricaoCurta:
      'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
    descricaoCompleta:
      'Responsável por coordenar e monitorar as operações agrícolas no centro de comando, garantindo eficiência operacional e comunicação entre equipes de campo e gestão estratégica.',
    requisitos: [
      'Graduação em Agronomia ou áreas correlatas',
      'Experiência em gestão de operações agrícolas',
      'Conhecimento em agricultura de precisão',
      'Habilidade com sistemas de monitoramento remoto',
      'Pacote Office intermediário/avançado',
    ],
    atribuicoes: [
      'Monitorar operações de campo em tempo real',
      'Coordenar equipes e recursos operacionais',
      'Elaborar relatórios de desempenho agrícola',
      'Apoiar decisões estratégicas com dados operacionais',
      'Garantir conformidade com protocolos de segurança',
    ],
  },
  {
    id: 3,
    data: 'Aberta em 12/03/2027',
    titulo: 'Estágio Obrigatório',
    descricaoCurta:
      'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
    descricaoCompleta:
      'Oportunidade de estágio obrigatório para estudantes de cursos de Agronomia, Administração ou áreas correlatas, com foco em aprendizado prático nas operações do Grupo PA.',
    requisitos: [
      'Cursando Agronomia, Administração ou áreas correlatas',
      'Disponibilidade de 20 a 30 horas semanais',
      'Interesse no agronegócio',
      'Boa comunicação e proatividade',
    ],
    atribuicoes: [
      'Apoio às atividades administrativas',
      'Participar de visitas a campo sob supervisão',
      'Auxiliar na elaboração de relatórios',
      'Apoio a projetos internos da consultoria',
    ],
  },
  {
    id: 4,
    data: 'Aberta em 12/03/2027',
    titulo: 'Trabalhador Volante da Agricultura',
    descricaoCurta:
      'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
    descricaoCompleta:
      'Execução de atividades operacionais no campo, incluindo plantio, colheita e manutenção de lavouras, sob supervisão da equipe técnica do Grupo PA.',
    requisitos: [
      'Experiência em atividades rurais',
      'Disponibilidade para trabalho em campo',
      'CNH categoria B (desejável)',
      'Resistência física para atividades ao ar livre',
    ],
    atribuicoes: [
      'Realizar atividades de plantio e colheita',
      'Manutenção de lavouras e equipamentos',
      'Aplicação de insumos conforme orientação técnica',
      'Controle e registro de atividades diárias',
    ],
  },
  {
    id: 5,
    data: 'Aberta em 12/03/2027',
    titulo: 'Analista Administrativo Corporativo',
    descricaoCurta:
      'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
    descricaoCompleta:
      'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos da empresa, assegurando a conformidade com as obrigações legais e fiscais, o controle eficaz das despesas, a gestão de fornecedores e o suporte à coordenação administrativa financeira.',
    requisitos: [
      'CNH categoria AB',
      'Experiência como analista administrativo financeiro',
      'Graduação em Administração, Ciências Contábeis ou áreas correlatas',
      'Domínio das rotinas administrativas e financeiras',
      'Domínio em Excel e conhecimento em Power BI',
    ],
    atribuicoes: [
      'Realizar a conciliação bancária',
      'Lançar notas fiscais no sistema',
      'Responsável pelas rotinas de contas a pagar e contas a receber',
      'Organizar o movimento mensal',
      'Manter organizado o arquivo digital e físico de documentos',
    ],
  },
];

// ─── Formulário ──────────────────────────────────────────────────────────────
interface FormData {
  nome: string;
  celular: string;
  email: string;
  cpf: string;
  rg: string;
  estado: string;
  cidade: string;
  formacao: string;
  qualificacoes: string;
  experiencia: string;
  curriculo: File | null;
}

const initialForm: FormData = {
  nome: '',
  celular: '',
  email: '',
  cpf: '',
  rg: '',
  estado: '',
  cidade: '',
  formacao: '',
  qualificacoes: '',
  experiencia: '',
  curriculo: null,
};

// ─── Componente Principal ────────────────────────────────────────────────────
export default function Carreiras() {
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [trackMarginLeft, setTrackMarginLeft] = useState(0);

  // Carrossel
  const carouselRef = useRef<HTMLDivElement>(null);
  const formularioRef = useRef<HTMLDivElement>(null);
  const alignRef = useRef<HTMLParagraphElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag-to-scroll
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => {
    const updateAlignment = () => {
      if (alignRef.current) {
        const rect = alignRef.current.getBoundingClientRect();
        setTrackMarginLeft(rect.left);
      }
    };
    
    updateAlignment();
    window.addEventListener('resize', updateAlignment);
    return () => window.removeEventListener('resize', updateAlignment);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - carouselRef.current.offsetLeft;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    carouselRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const scroll = (dir: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector('[data-card]') as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 405;
    carouselRef.current.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  const handleSelectVaga = (vaga: Vaga) => {
    if (vagaSelecionada?.id === vaga.id) {
      setVagaSelecionada(null);
      setFormData(initialForm);
      setSubmitted(false);
      return;
    }
    setVagaSelecionada(vaga);
    setFormData(initialForm);
    setSubmitted(false);
    setTimeout(() => {
      formularioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'celular') {
      let v = value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      if (v.length > 10) v = `${v.slice(0, 10)}-${v.slice(10)}`;
      setFormData(prev => ({ ...prev, celular: v }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setUploadProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFormData(prev => ({ ...prev, curriculo: file }));
          setTimeout(() => setUploadProgress(null), 500);
        } else {
          setUploadProgress(progress);
        }
      }, 150);
    } else {
      setFormData(prev => ({ ...prev, curriculo: null }));
      setUploadProgress(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.curriculo) {
      alert('Por favor, faça o upload do seu currículo em formato PDF ou Word antes de enviar.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className={`${styles.carreirasPage} page-transition-enter`}>

      {/* ── Sessão 01 — Hero ─────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <img src={imgBgCarreiras} alt="Banner Carreiras" className={styles.heroBg} />
        </div>
        <div className={styles.scrollDownWrapper}>
          <a href="#vagas" className={styles.scrollDownButton} aria-label="Ver vagas">
            <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>
              arrow_downward
            </span>
          </a>
        </div>
      </section>

      {/* ── Sessão 02 — Conteúdo principal ──────────────────────────────── */}
      <section id="vagas" className={styles.mainSection}>

        {/* Intro */}
        <div className={styles.introContainer}>
          <h2 className={styles.introTitle}>
            <AnimatedText text="Faça parte " type="word" />
            <span className={styles.highlight}>
              <AnimatedText text="da PA" type="word" delay={0.15} />
            </span>
          </h2>
            <div className={styles.introText} ref={alignRef}>
              <p style={{ marginBottom: '16px' }}>
                No Grupo PA, entendemos que as melhores oportunidades não são necessariamente as mais fáceis, mas aquelas que desafiam, desenvolvem e permitem crescimento profissional e pessoal.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Buscamos pessoas comprometidas, curiosas e dispostas a evoluir todos os dias. Pessoas que valorizam o trabalho em equipe, assumem responsabilidades e enxergam os desafios como oportunidades de aprendizado.
              </p>
              <p>
                Seja na consultoria, na pesquisa, na produção agrícola ou nos demais negócios do Grupo PA, trabalhamos para construir uma equipe forte, preparada e apaixonada pelo que faz.
              </p>
            </div>
        </div>

        {/* ── Carrossel de Vagas ─────────────────────────────────────────── */}
        <div className={styles.carouselSection}>
          {/* Botões prev/next agora dentro do fundo cinza */}
          <div className={styles.carouselControls}>
            <button
              className={styles.controlBtn}
              onClick={() => scroll('prev')}
              aria-label="Vaga anterior"
            >
              <span className="material-symbols-rounded">chevron_left</span>
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => scroll('next')}
              aria-label="Próxima vaga"
            >
              <span className="material-symbols-rounded">chevron_right</span>
            </button>
          </div>

          {/* Track scrollável */}
            <div
              className={styles.carouselTrack}
              ref={carouselRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{ 
                marginLeft: trackMarginLeft ? `${trackMarginLeft}px` : undefined,
                width: trackMarginLeft ? `calc(100% - ${trackMarginLeft}px)` : '100%'
              }}
            >
              {vagas.map(vaga => {
              const isSelected = vagaSelecionada?.id === vaga.id;
              return (
                <div
                  key={vaga.id}
                  data-card
                  className={`${styles.vagaCard} ${isSelected ? styles.vagaCardSelected : ''}`}
                >
                  {/* Data */}
                  <div className={styles.cardTop}>
                    <span className={styles.vagaData}>{vaga.data}</span>
                  </div>

                  {/* Título + descrição */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.vagaTitulo}>{vaga.titulo}</h3>
                    <p className={styles.vagaDescricao}>{vaga.descricaoCurta}</p>
                  </div>

                  {/* Divisória */}
                  <div className={styles.vagaDivider} />

                  {/* Botão */}
                  <div className={styles.cardBottom}>
                    <button
                      className={`btn-pa ${isSelected ? 'green-accent' : 'gray'}`}
                      onClick={() => handleSelectVaga(vaga)}
                      aria-pressed={isSelected}
                    >
                      <span className="btn-label">
                        {isSelected ? 'Aplicando...' : 'Aplicar'}
                      </span>
                      <span className="btn-icon">
                        <span className={`material-symbols-rounded ${isSelected ? styles.closeIcon : ''}`}>
                          {isSelected ? 'close' : 'arrow_back'}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Detalhe + Formulário ──────────────────────────────────────── */}
        {vagaSelecionada && (
          <div className={styles.formularioWrapper} ref={formularioRef}>
            {/* Cabeçalho da vaga */}
            <div className={styles.vagaDetalheHeader}>
              <h2 className={styles.vagaDetalheTitulo}>
                <AnimatedText text={vagaSelecionada.titulo} type="word" once={false} />
              </h2>
              <p className={styles.vagaDetalheDesc}>
                {vagaSelecionada.descricaoCompleta}
              </p>
            </div>

            {/* Requisitos + Atribuições */}
            <div className={styles.vagaReqAtrib}>
              <div className={styles.vagaColuna}>
                <h4 className={styles.vagaColunaTitle}>Requisitos</h4>
                <ul className={styles.vagaLista}>
                  {vagaSelecionada.requisitos.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.vagaColuna}>
                <h4 className={styles.vagaColunaTitle}>Atribuições</h4>
                <ul className={styles.vagaLista}>
                  {vagaSelecionada.atribuicoes.map((atr, i) => (
                    <li key={i}>{atr}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Formulário */}
            {submitted ? (
              <div className={styles.successMessage}>
                <span className={`material-symbols-rounded ${styles.successIcon}`}>
                  check_circle
                </span>
                <h3>Candidatura enviada!</h3>
                <p>
                  Recebemos sua candidatura para{' '}
                  <strong>{vagaSelecionada.titulo}</strong>.{' '}
                  Nossa equipe entrará em contato em breve.
                </p>
                <button
                  className="btn-pa dark-green"
                  onClick={() => {
                    setSubmitted(false);
                    setVagaSelecionada(null);
                    setFormData(initialForm);
                  }}
                >
                  <span className="btn-label">Ver outras vagas</span>
                  <span className="btn-icon">
                    <span className="material-symbols-rounded">arrow_back</span>
                  </span>
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                {/* Nome */}
                <div className={styles.formRow}>
                  <input
                    id="f-nome"
                    className={styles.formInput}
                    type="text"
                    name="nome"
                    placeholder="Nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                </div>
                {/* Celular + Email */}
                <div className={`${styles.formRow} ${styles.formRow2}`}>
                  <input
                    id="f-celular"
                    className={styles.formInput}
                    type="tel"
                    name="celular"
                    placeholder="Celular ou Fixo"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                  />
                  <input
                    id="f-email"
                    className={styles.formInput}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* CPF + RG */}
                <div className={`${styles.formRow} ${styles.formRow2}`}>
                  <input
                    id="f-cpf"
                    className={styles.formInput}
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                  <input
                    id="f-rg"
                    className={styles.formInput}
                    type="text"
                    name="rg"
                    placeholder="RG"
                    value={formData.rg}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Estado + Cidade */}
                <div className={`${styles.formRow} ${styles.formRow2}`}>
                  <input
                    id="f-estado"
                    className={styles.formInput}
                    type="text"
                    name="estado"
                    placeholder="Estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={2}
                  />
                  <input
                    id="f-cidade"
                    className={styles.formInput}
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                </div>
                {/* Formação */}
                <div className={styles.formRow}>
                  <input
                    id="f-formacao"
                    className={styles.formInput}
                    type="text"
                    name="formacao"
                    placeholder="Formação"
                    value={formData.formacao}
                    onChange={handleChange}
                  />
                </div>
                {/* Outras qualificações */}
                <div className={styles.formRow}>
                  <textarea
                    id="f-qualificacoes"
                    className={`${styles.formInput} ${styles.formTextarea}`}
                    name="qualificacoes"
                    placeholder="Outras qualificações"
                    value={formData.qualificacoes}
                    onChange={handleChange}
                    rows={4}
                    minLength={10}
                  />
                </div>
                {/* Experiência */}
                <div className={styles.formRow}>
                  <textarea
                    id="f-experiencia"
                    className={`${styles.formInput} ${styles.formTextarea}`}
                    name="experiencia"
                    placeholder="Experiência Profissional"
                    value={formData.experiencia}
                    onChange={handleChange}
                    rows={4}
                    minLength={10}
                    required
                  />
                </div>
                {/* Currículo */}
                <div className={`${styles.formRow} ${styles.formRowUpload}`}>
                  <span className={styles.uploadLabel}>Currículo</span>
                  <button
                    type="button"
                    className={styles.uploadBtn}
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Fazer upload do currículo"
                    disabled={uploadProgress !== null}
                  >
                    {uploadProgress !== null ? (
                      <div className={styles.uploadProgressContainer}>
                        <div className={styles.uploadProgressTrack}>
                          <div 
                            className={styles.uploadProgressBar} 
                            style={{ width: `${Math.min(uploadProgress, 100)}%` }} 
                          />
                        </div>
                        <span className={styles.uploadProgressText}>
                          {Math.floor(uploadProgress)}%
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className={formData.curriculo ? styles.uploadFileSelected : ''}>
                          {formData.curriculo ? formData.curriculo.name : 'Upload'}
                        </span>
                        <span className={`material-symbols-rounded ${styles.uploadIcon} ${formData.curriculo ? styles.uploadIconSuccess : ''}`}>
                          {formData.curriculo ? 'check_circle' : 'attach_file'}
                        </span>
                      </>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className={styles.fileInputHidden}
                    onChange={handleFile}
                    aria-label="Selecionar arquivo de currículo"
                  />
                </div>
                {/* Enviar */}
                <div className={styles.formRow}>
                  <button
                    id="carreiras-enviar"
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Enviando...
                        <div className={styles.spinner}></div>
                      </>
                    ) : (
                      <>
                        <span>Enviar</span>
                        <span className={`material-symbols-rounded ${styles.btnIcon}`}>send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
