import { useState, useRef, useEffect } from 'react';
import styles from './Carreiras.module.css';
import AnimatedText from '../../components/AnimatedText';
import { imgBgCarreiras } from '../../assets';
import { api, type CareersPageData, type Job } from '../../services/api';
import LexicalRenderer from '../../components/LexicalRenderer';

// ─── Dados de Fallback (caso API esteja vazia) ──────────────────────────────────
const fallbackVagas: Job[] = [
  {
    id: '1',
    title: 'Analista Administrativo Corporativo',
    summary: 'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos da empresa...',
    description: null,
    requirements: [
      { item: 'CNH categoria AB' },
      { item: 'Experiência como analista administrativo financeiro' },
      { item: 'Graduação em Administração, Ciências Contábeis ou áreas correlatas' },
      { item: 'Domínio das rotinas administrativas e financeiras' },
      { item: 'Comunicação assertiva com fornecedores e clientes' },
      { item: 'Domínio em Excel e conhecimento em Power BI' },
      { item: 'Pacote Office em nível intermediário' },
    ],
    responsibilities: [
      { item: 'Realizar a conciliação bancária' },
      { item: 'Lançar notas fiscais no sistema' },
      { item: 'Emitir notas fiscais conforme necessidade' },
      { item: 'Responsável pelas rotinas de contas a pagar e contas a receber' },
      { item: 'Organizar o movimento mensal (fluxos e documentos financeiros)' },
      { item: 'Manter organizado o arquivo digital e físico de documentos' },
    ],
    status: 'open',
    openingDate: '2027-03-12',
  },
  {
    id: '2',
    title: 'Analista Centro de Operações Agrícolas (COA)',
    summary: 'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
    description: null,
    requirements: [
      { item: 'Graduação em Agronomia ou áreas correlatas' },
      { item: 'Experiência em gestão de operações agrícolas' },
      { item: 'Conhecimento em agricultura de precisão' },
      { item: 'Habilidade com sistemas de monitoramento remoto' },
      { item: 'Pacote Office intermediário/avançado' },
    ],
    responsibilities: [
      { item: 'Monitorar operações de campo em tempo real' },
      { item: 'Coordenar equipes e recursos operacionais' },
      { item: 'Elaborar relatórios de desempenho agrícola' },
      { item: 'Apoiar decisões estratégicas com dados operacionais' },
      { item: 'Garantir conformidade com protocolos de segurança' },
    ],
    status: 'open',
    openingDate: '2027-03-12',
  },
  {
    id: '3',
    title: 'Estágio Obrigatório',
    summary: 'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
    description: null,
    requirements: [
      { item: 'Cursando Agronomia, Administração ou áreas correlatas' },
      { item: 'Disponibilidade de 20 a 30 horas semanais' },
      { item: 'Interesse no agronegócio' },
      { item: 'Boa comunicação e proatividade' },
    ],
    responsibilities: [
      { item: 'Apoio às atividades administrativas' },
      { item: 'Participar de visitas a campo sob supervisão' },
      { item: 'Auxiliar na elaboração de relatórios' },
      { item: 'Apoio a projetos internos da consultoria' },
    ],
    status: 'open',
    openingDate: '2027-03-12',
  },
  {
    id: '4',
    title: 'Trabalhador Volante da Agricultura',
    summary: 'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
    description: null,
    requirements: [
      { item: 'Experiência em atividades rurais' },
      { item: 'Disponibilidade para trabalho em campo' },
      { item: 'CNH categoria B (desejável)' },
      { item: 'Resistência física para atividades ao ar livre' },
    ],
    responsibilities: [
      { item: 'Realizar atividades de plantio e colheita' },
      { item: 'Manutenção de lavouras e equipamentos' },
      { item: 'Aplicação de insumos conforme orientação técnica' },
      { item: 'Controle e registro de atividades diárias' },
    ],
    status: 'open',
    openingDate: '2027-03-12',
  },
];

// ─── Auxiliar de Formatação de Data ─────────────────────────────────────────────
const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'Aberta';
  try {
    const datePart = dateStr.split('T')[0];
    const parts = datePart.split('-');
    if (parts.length === 3) {
      return `Aberta em ${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    return `Aberta em ${day}/${month}/${year}`;
  } catch (e) {
    return 'Aberta';
  }
};

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
  const [vagas, setVagas] = useState<Job[]>([]);
  const [careersPage, setCareersPage] = useState<CareersPageData | null>(null);
  const [vagaSelecionada, setVagaSelecionada] = useState<Job | null>(null);
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
    window.scrollTo(0, 0);
    api.getCareersPage()
      .then(data => {
        setCareersPage(data);
      })
      .catch(err => {
        console.error('Erro ao carregar dados da página Carreiras:', err);
      });

    api.getJobs()
      .then(data => {
        setVagas(data);
      })
      .catch(err => {
        console.error('Erro ao carregar vagas:', err);
      });
  }, []);

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
  }, [vagas, careersPage]);

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

  const handleSelectVaga = (vaga: Job) => {
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
    if (!vagaSelecionada) {
      alert('Por favor, selecione uma vaga antes de enviar.');
      return;
    }
    setIsSubmitting(true);

    const submissionData = new FormData();
    submissionData.append('jobId', vagaSelecionada.id);
    submissionData.append('name', formData.nome);
    submissionData.append('email', formData.email);
    submissionData.append('phone', formData.celular);
    submissionData.append('cpf', formData.cpf);
    submissionData.append('rg', formData.rg);
    submissionData.append('state', formData.estado);
    submissionData.append('city', formData.cidade);
    submissionData.append('education', formData.formacao);
    submissionData.append('qualifications', formData.qualificacoes);
    submissionData.append('experience', formData.experiencia);
    submissionData.append('resume', formData.curriculo);

    api.submitJobApplication(submissionData)
      .then(res => {
        setIsSubmitting(false);
        if (res.success) {
          setSubmitted(true);
        } else {
          alert(res.message || 'Erro ao enviar candidatura.');
        }
      })
      .catch(err => {
        setIsSubmitting(false);
        console.error('Erro ao enviar candidatura:', err);
        alert('Erro de conexão ao enviar candidatura. Tente novamente.');
      });
  };

  const bgImage = careersPage?.heroImage ? api.getMediaUrl(careersPage.heroImage) : imgBgCarreiras;
  const displayVagas = vagas.length > 0 ? vagas : fallbackVagas;

  return (
    <main className={`${styles.carreirasPage} page-transition-enter`}>

      {/* ── Sessão 01 — Hero ─────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <img src={bgImage} alt="Banner Carreiras" className={styles.heroBg} />
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
            <AnimatedText text={careersPage?.title || "Faça parte "} type="word" />
            <span className={styles.highlight}>
              <AnimatedText text={careersPage?.titleHighlight || "da PA"} type="word" delay={0.15} />
            </span>
          </h2>
            <div className={styles.introText} ref={alignRef}>
              {careersPage?.introText ? (
                careersPage.introText.split(/\r?\n\r?\n+/).map((para, idx, arr) => (
                  <p key={idx} style={{ marginBottom: idx < arr.length - 1 ? '16px' : '0px' }}>
                    {para}
                  </p>
                ))
              ) : (
                <>
                  <p style={{ marginBottom: '16px' }}>
                    No Grupo PA, entendemos que as melhores oportunidades não são necessariamente as mais fáceis, mas aquelas que desafiam, desenvolvem e permitem crescimento profissional e pessoal.
                  </p>
                  <p style={{ marginBottom: '16px' }}>
                    Buscamos pessoas comprometidas, curiosas e dispostas a evoluir todos os dias. Pessoas que valorizam o trabalho em equipe, assumem responsabilidades e enxergam os desafios como oportunidades de aprendizado.
                  </p>
                  <p style={{ marginBottom: '0px' }}>
                    Seja na consultoria, na pesquisa, na produção agrícola ou nos demais negócios do Grupo PA, trabalhamos para construir uma equipe forte, preparada e apaixonada pelo que faz.
                  </p>
                </>
              )}
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
            {displayVagas.map(vaga => {
              const isSelected = vagaSelecionada?.id === vaga.id;
              return (
                <div
                  key={vaga.id}
                  data-card
                  className={`${styles.vagaCard} ${isSelected ? styles.vagaCardSelected : ''}`}
                >
                  {/* Data */}
                  <div className={styles.cardTop}>
                    <span className={styles.vagaData}>{formatDate(vaga.openingDate)}</span>
                  </div>

                  {/* Título + descrição */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.vagaTitulo}>{vaga.title}</h3>
                    <p className={styles.vagaDescricao}>{vaga.summary}</p>
                  </div>

                  {/* Divisória */}
                  <div className={styles.vagaDivider} />

                  {/* Botão */}
                  <div className={styles.cardBottom}>
                    <button
                      className={`btn-pa ${isSelected ? 'green-accent' : 'gray'}`}
                      onClick={() => handleSelectVaga(vaga)}
                      aria-pressed={isSelected}
                      style={vaga.status !== 'open' && !isSelected ? { opacity: 0.7 } : undefined}
                    >
                      <span className="btn-label">
                        {isSelected
                          ? vaga.status === 'open' ? 'Aplicando...' : 'Visualizando...'
                          : vaga.status === 'open'
                            ? 'Aplicar'
                            : vaga.status === 'paused'
                              ? 'Pausada'
                              : 'Encerrada'}
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
                <AnimatedText text={vagaSelecionada.title} type="word" once={false} />
              </h2>
              {vagaSelecionada.description ? (
                <div className={styles.vagaDetalheDesc}>
                  <LexicalRenderer content={vagaSelecionada.description} />
                </div>
              ) : (
                <p className={styles.vagaDetalheDesc}>
                  {vagaSelecionada.summary}
                </p>
              )}
            </div>

            {/* Requisitos + Atribuições */}
            <div className={styles.vagaReqAtrib}>
              <div className={styles.vagaColuna}>
                <h4 className={styles.vagaColunaTitle}>Requisitos</h4>
                <ul className={styles.vagaLista}>
                  {vagaSelecionada.requirements && vagaSelecionada.requirements.length > 0 ? (
                    vagaSelecionada.requirements.map((req, i) => (
                      <li key={req.id || i}>{req.item}</li>
                    ))
                  ) : (
                    <li>Nenhum requisito especificado</li>
                  )}
                </ul>
              </div>
              <div className={styles.vagaColuna}>
                <h4 className={styles.vagaColunaTitle}>Atribuições</h4>
                <ul className={styles.vagaLista}>
                  {vagaSelecionada.responsibilities && vagaSelecionada.responsibilities.length > 0 ? (
                    vagaSelecionada.responsibilities.map((atr, i) => (
                      <li key={atr.id || i}>{atr.item}</li>
                    ))
                  ) : (
                    <li>Nenhuma atribuição especificada</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Formulário */}
            {vagaSelecionada.status !== 'open' ? (
              <div className={styles.successMessage} style={{ backgroundColor: 'var(--color-bg-light)', border: '1px solid var(--theme-elevation-200)' }}>
                <span className="material-symbols-rounded" style={{ fontSize: '3rem', color: 'var(--theme-elevation-400)', marginBottom: '1rem' }}>
                  info
                </span>
                <h3>Inscrições Suspensas</h3>
                <p>
                  Esta vaga está temporariamente <strong>{vagaSelecionada.status === 'paused' ? 'Pausada' : 'Encerrada'}</strong> e não está aceitando novas candidaturas no momento.
                </p>
                <button
                  className="btn-pa gray"
                  onClick={() => {
                    setVagaSelecionada(null);
                    setFormData(initialForm);
                  }}
                >
                  <span className="btn-label">Voltar para a listagem</span>
                  <span className="btn-icon">
                    <span className="material-symbols-rounded">arrow_back</span>
                  </span>
                </button>
              </div>
            ) : submitted ? (
              <div className={styles.successMessage}>
                <span className={`material-symbols-rounded ${styles.successIcon}`}>
                  check_circle
                </span>
                <h3>Candidatura enviada!</h3>
                <p>
                  Recebemos sua candidatura para{' '}
                  <strong>{vagaSelecionada.title}</strong>.{' '}
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
