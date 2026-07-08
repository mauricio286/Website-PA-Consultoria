import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './Carreiras.module.css';
import AnimatedText from '../../components/AnimatedText';
import { imgBgCarreiras } from '../../assets';
import { api, type CareersPageData, type Job } from '../../services/api';
import LexicalRenderer from '../../components/LexicalRenderer';
import { useLanguage } from '../../i18n';
import { message } from 'antd';

// ─── Dados de Fallback Estático Localizado ──────────────────────────────────
interface VagaContent {
  data: string;
  titulo: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  requisitos: string[];
  atribuicoes: string[];
}

interface Vaga {
  id: number;
  pt: VagaContent;
  en: VagaContent;
}

const fallbackVagas: Vaga[] = [
  {
    id: 1,
    pt: {
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'Corporate Administrative Analyst',
      descricaoCurta:
        'Ensure the organization and efficiency of the company\'s financial, tax, and administrative processes...',
      descricaoCompleta:
        'Ensure the organization and efficiency of the company\'s financial, tax, and administrative processes, ensuring compliance with legal and tax obligations, effective expense control, supplier management, and support to the financial administrative coordination.',
      requisitos: [
        'Driver\'s license category AB',
        'Experience as a financial administrative analyst',
        'Degree in Administration, Accounting Sciences, or related fields',
        'Proficiency in administrative and financial routines',
        'Assertive communication with suppliers and clients',
        'Proficiency in Excel and knowledge of Power BI',
        'Intermediate level Office package',
      ],
      atribuicoes: [
        'Perform bank reconciliation',
        'Enter invoices into the system',
        'Issue invoices as needed',
        'Responsible for accounts payable and accounts receivable routines',
        'Organize monthly movement',
        'Maintain organized digital and physical document archives',
      ],
    }
  },
  {
    id: 2,
    pt: {
      data: 'Aberta em 12/03/2027',
      titulo: 'Analista Centro de Operações Agrícolas (COA)',
      descricaoCurta:
        'Garantir a organização e a eficiência dos processos operacionais no campo...',
      descricaoCompleta:
        'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos da empresa através do Centro de Operações Agrícolas.',
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'Agricultural Operations Center Analyst (COA)',
      descricaoCurta:
        'Ensure the organization and efficiency of operational processes in the field...',
      descricaoCompleta:
        'Ensure the organization and efficiency of financial, fiscal, and administrative processes in the company through the Agricultural Operations Center.',
      requisitos: [
        'Degree in Agronomy or related fields',
        'Experience in agricultural operations management',
        'Knowledge of precision agriculture',
        'Ability with remote monitoring systems',
        'Intermediate/advanced Office package',
      ],
      atribuicoes: [
        'Monitor field operations in real time',
        'Coordinate teams and operational resources',
        'Elaborate agricultural performance reports',
        'Support strategic decisions with operational data',
        'Ensure compliance with safety protocols',
      ],
    }
  },
  {
    id: 3,
    pt: {
      data: 'Aberta em 12/03/2027',
      titulo: 'Estágio Obrigatório',
      descricaoCurta:
        'Garantir a organização e a eficiência dos processos financeiros, fiscais e administrativos...',
      descricaoCompleta:
        'Apoiar a organização e a eficiência dos processos administrativos e de campo da consultoria durante o estágio obrigatório.',
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'Mandatory Internship',
      descricaoCurta:
        'Ensure the organization and efficiency of financial, tax, and administrative processes...',
      descricaoCompleta:
        'Support the organization and efficiency of administrative and field processes of the consultancy during the mandatory internship.',
      requisitos: [
        'Enrolled in Agronomy, Administration, or related fields',
        'Availability of 20 to 30 hours per week',
        'Interest in agribusiness',
        'Good communication and proactivity',
      ],
      atribuicoes: [
        'Support administrative activities',
        'Participate in supervised field visits',
        'Assist in report preparation',
        'Support internal projects of the consultancy',
      ],
    }
  },
  {
    id: 4,
    pt: {
      data: 'Aberta em 12/03/2027',
      titulo: 'Trabalhador Volante da Agricultura',
      descricaoCurta:
        'Realizar atividades operacionais de campo e manutenção geral...',
      descricaoCompleta:
        'Realizar atividades de plantio, colheita, aplicação de insumos e manutenção geral da lavoura.',
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'Agricultural Seasonal Worker',
      descricaoCurta:
        'Perform operational field activities and general maintenance...',
      descricaoCompleta:
        'Perform planting, harvesting, input application, and general crop maintenance activities.',
      requisitos: [
        'Experience in rural activities',
        'Availability for field work',
        'Driver\'s license category B (desirable)',
        'Physical stamina for outdoor activities',
      ],
      atribuicoes: [
        'Perform planting and harvesting activities',
        'Maintenance of crops and equipment',
        'Application of inputs according to technical guidance',
        'Control and record of daily activities',
      ],
    }
  }
];

// ─── Auxiliar de Formatação de Data ─────────────────────────────────────────────
const formatDate = (dateStr?: string, locale?: string) => {
  if (!dateStr) return locale === 'en' ? 'Open' : 'Aberta';
  try {
    const datePart = dateStr.split('T')[0];
    const parts = datePart.split('-');
    if (parts.length === 3) {
      return locale === 'en'
        ? `Opened on ${parts[1]}/${parts[2]}/${parts[0]}`
        : `Aberta em ${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    return locale === 'en'
      ? `Opened on ${month}/${day}/${year}`
      : `Aberta em ${day}/${month}/${year}`;
  } catch (e) {
    return locale === 'en' ? 'Open' : 'Aberta';
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
  const [pdfError, setPdfError] = useState(false);
  const { locale, t } = useLanguage();

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
    api.getCareersPage(locale)
      .then(data => {
        setCareersPage(data);
      })
      .catch(err => {
        console.error('Erro ao carregar dados da página Carreiras:', err);
      });

    api.getJobs(locale)
      .then(data => {
        setVagas(data);
      })
      .catch(err => {
        console.error('Erro ao carregar vagas:', err);
      });
  }, [locale]);

  const fallbackJobs: Job[] = useMemo(() => fallbackVagas.map(v => {
    const content = locale === 'en' ? v.en : v.pt;
    return {
      id: String(v.id),
      title: content.titulo,
      summary: content.descricaoCurta,
      description: content.descricaoCompleta,
      requirements: content.requisitos.map((r, i) => ({ id: `req-${i}`, item: r })),
      responsibilities: content.atribuicoes.map((a, i) => ({ id: `resp-${i}`, item: a })),
      status: 'open',
      openingDate: '2027-03-12',
    };
  }), [locale]);

  const displayVagas = vagas.length > 0 ? vagas : fallbackJobs;

  useEffect(() => {
    if (vagaSelecionada && displayVagas.length > 0) {
      const updated = displayVagas.find(v => v.id === vagaSelecionada.id);
      if (updated) {
        setVagaSelecionada(updated);
      }
    }
  }, [displayVagas, vagaSelecionada]);

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
  }, [displayVagas, careersPage]);

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
      setPdfError(false);
      return;
    }
    setVagaSelecionada(vaga);
    setFormData(initialForm);
    setSubmitted(false);
    setPdfError(false);
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
      if (file.type !== 'application/pdf') {
        message.error(t.carreiras.uploadAlerta || 'Por segurança, apenas arquivos PDF são permitidos.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isLt5M) {
        message.error('O arquivo excedeu o limite máximo de 5MB.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const sanitizeFilename = (name: string) => {
        const extension = name.substring(name.lastIndexOf('.'));
        const baseName = name.substring(0, name.lastIndexOf('.'));
        const safeBaseName = baseName
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]/g, '_')
          .toLowerCase();
        return `${safeBaseName}${extension}`;
      };

      const safeFilename = sanitizeFilename(file.name);
      const sanitizedFile = new File([file], safeFilename, { type: 'application/pdf' });

      setUploadProgress(0);
      setPdfError(false);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFormData(prev => ({ ...prev, curriculo: sanitizedFile }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.curriculo) {
      setPdfError(true);
      return;
    }
    if (!vagaSelecionada) {
      message.error(locale === 'en' ? 'Please select a job vacancy before submitting.' : 'Por favor, selecione uma vaga antes de enviar.');
      return;
    }
    setIsSubmitting(true);

    const submissionData = new FormData();
    submissionData.append('jobId', vagaSelecionada.id);
    submissionData.append('name', formData.nome.trim());
    submissionData.append('email', formData.email.trim());
    submissionData.append('phone', formData.celular.trim());
    submissionData.append('cpf', formData.cpf.trim());
    submissionData.append('rg', formData.rg.trim());
    submissionData.append('state', formData.estado.trim());
    submissionData.append('city', formData.cidade.trim());
    submissionData.append('education', formData.formacao.trim());
    submissionData.append('qualifications', formData.qualificacoes.trim());
    submissionData.append('experience', formData.experiencia.trim());
    submissionData.append('resume', formData.curriculo);

    api.submitJobApplication(submissionData)
      .then(res => {
        setIsSubmitting(false);
        if (res.success) {
          setSubmitted(true);
        } else {
          message.error(res.message || 'Erro ao enviar candidatura.');
        }
      })
      .catch(err => {
        setIsSubmitting(false);
        console.error('Erro ao enviar candidatura:', err);
        message.error('Erro de conexão ao enviar candidatura. Tente novamente.');
      });
  };

  const bgImage = careersPage?.heroImage ? api.getMediaUrl(careersPage.heroImage) : imgBgCarreiras;
  const bgImageTablet = careersPage?.heroImageTablet ? api.getMediaUrl(careersPage.heroImageTablet) : undefined;
  const bgImageMobile = careersPage?.heroImageMobile ? api.getMediaUrl(careersPage.heroImageMobile) : undefined;

  return (
    <main className={`${styles.carreirasPage} page-transition-enter`}>
      {/* ── Sessão 01 — Hero ─────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <picture>
            {bgImageMobile && <source media="(max-width: 580px)" srcSet={bgImageMobile} />}
            {bgImageTablet && <source media="(max-width: 1024px)" srcSet={bgImageTablet} />}
            <img src={bgImage} alt="Banner Carreiras" className={styles.heroBg} />
          </picture>
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
            <AnimatedText key={`carr-title1-${locale}-${careersPage?.title}`} text={careersPage?.title || t.carreiras.title1} type="word" />{' '}
            <span className={styles.highlight}>
              <AnimatedText key={`carr-title2-${locale}-${careersPage?.titleHighlight}`} text={careersPage?.titleHighlight || t.carreiras.titleHighlight} type="word" delay={0.15} />
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
                  {t.carreiras.introP1}
                </p>
                <p style={{ marginBottom: '16px' }}>
                  {t.carreiras.introP2}
                </p>
                <p style={{ marginBottom: '0px' }}>
                  {t.carreiras.introP3}
                </p>
              </>
            )}
          </div>
        </div>

        {/* ── Carrossel de Vagas ─────────────────────────────────────────── */}
        <div className={styles.carouselSection}>
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
            data-lenis-prevent="true"
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
                    <span className={styles.vagaData}>{formatDate(vaga.openingDate, locale)}</span>
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
                          ? t.carreiras.aplicando || (vaga.status === 'open' ? 'Aplicando...' : 'Visualizando...')
                          : vaga.status === 'open'
                            ? t.carreiras.aplicar || 'Aplicar'
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
        {vagaSelecionada && (() => {
          return (
            <div className={styles.formularioWrapper} ref={formularioRef}>
              {/* Cabeçalho da vaga */}
              <div className={styles.vagaDetalheHeader}>
                <h2 className={styles.vagaDetalheTitulo}>
                  <AnimatedText key={`vaga-${vagaSelecionada.id}-${locale}`} text={vagaSelecionada.title} type="word" once={false} />
                </h2>
                {vagaSelecionada.description ? (
                  <div className={styles.vagaDetalheDesc}>
                    {typeof vagaSelecionada.description === 'string' ? (
                      <p>{vagaSelecionada.description}</p>
                    ) : (
                      <LexicalRenderer content={vagaSelecionada.description} />
                    )}
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
                  <h4 className={styles.vagaColunaTitle}>{t.carreiras.requisitos}</h4>
                  <ul className={styles.vagaLista}>
                    {vagaSelecionada.requirements && vagaSelecionada.requirements.length > 0 ? (
                      vagaSelecionada.requirements.map((req, i) => (
                        <li key={req.id || i}>{req.item}</li>
                      ))
                    ) : (
                      <li>{locale === 'en' ? 'No requirements specified' : 'Nenhum requisito especificado'}</li>
                    )}
                  </ul>
                </div>
                <div className={styles.vagaColuna}>
                  <h4 className={styles.vagaColunaTitle}>{t.carreiras.atribuicoes}</h4>
                  <ul className={styles.vagaLista}>
                    {vagaSelecionada.responsibilities && vagaSelecionada.responsibilities.length > 0 ? (
                      vagaSelecionada.responsibilities.map((atr, i) => (
                        <li key={atr.id || i}>{atr.item}</li>
                      ))
                    ) : (
                      <li>{locale === 'en' ? 'No responsibilities specified' : 'Nenhuma atribuição especificada'}</li>
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
                  <h3>{locale === 'en' ? 'Applications Paused' : 'Inscrições Suspensas'}</h3>
                  <p>
                    {locale === 'en' 
                      ? <>This position is temporarily <strong>{vagaSelecionada.status === 'paused' ? 'Paused' : 'Closed'}</strong> and not accepting new applications.</>
                      : <>Esta vaga está temporariamente <strong>{vagaSelecionada.status === 'paused' ? 'Pausada' : 'Encerrada'}</strong> e não está aceitando novas candidaturas no momento.</>}
                  </p>
                  <button
                    className="btn-pa gray"
                    onClick={() => {
                      setVagaSelecionada(null);
                      setFormData(initialForm);
                    }}
                  >
                    <span className="btn-label">{locale === 'en' ? 'Back to listings' : 'Voltar para a listagem'}</span>
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
                  <h3>{t.carreiras.sucesso}</h3>
                  <p>
                    {t.carreiras.sucessoDesc1 || 'Recebemos sua candidatura para '}{' '}
                    <strong>{vagaSelecionada.title}</strong>.{' '}
                    {t.carreiras.sucessoDesc2 || 'Nossa equipe entrará em contato em breve.'}
                  </p>
                  <button
                    className="btn-pa dark-green"
                    onClick={() => {
                      setSubmitted(false);
                      setVagaSelecionada(null);
                      setFormData(initialForm);
                    }}
                  >
                    <span className="btn-label">{t.carreiras.verOutras}</span>
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
                      placeholder={t.carreiras.nomeCompleto}
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={100}
                    />
                  </div>
                  {/* Celular + Email */}
                  <div className={`${styles.formRow} ${styles.formRow2}`}>
                    <input
                      id="f-celular"
                      className={styles.formInput}
                      type="tel"
                      name="celular"
                      placeholder={t.carreiras.celular}
                      value={formData.celular}
                      onChange={handleChange}
                      required
                      maxLength={15}
                    />
                    <input
                      id="f-email"
                      className={styles.formInput}
                      type="email"
                      name="email"
                      placeholder={t.carreiras.email}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={100}
                    />
                  </div>
                  {/* CPF + RG */}
                  <div className={`${styles.formRow} ${styles.formRow2}`}>
                    <input
                      id="f-cpf"
                      className={styles.formInput}
                      type="text"
                      name="cpf"
                      placeholder={t.carreiras.cpf}
                      value={formData.cpf}
                      onChange={handleChange}
                      required
                      maxLength={14}
                    />
                    <input
                      id="f-rg"
                      className={styles.formInput}
                      type="text"
                      name="rg"
                      placeholder={t.carreiras.rg}
                      value={formData.rg}
                      onChange={handleChange}
                      required
                      maxLength={20}
                    />
                  </div>
                  {/* Estado + Cidade */}
                  <div className={`${styles.formRow} ${styles.formRow2}`}>
                    <input
                      id="f-estado"
                      className={styles.formInput}
                      type="text"
                      name="estado"
                      placeholder={t.carreiras.estado}
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
                      placeholder={t.carreiras.cidade}
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={50}
                    />
                  </div>
                  {/* Formação */}
                  <div className={styles.formRow}>
                    <input
                      id="f-formacao"
                      className={styles.formInput}
                      type="text"
                      name="formacao"
                      placeholder={t.carreiras.formacao}
                      value={formData.formacao}
                      onChange={handleChange}
                      maxLength={100}
                    />
                  </div>
                  {/* Outras qualificações */}
                  <div className={styles.formRow}>
                    <textarea
                      id="f-qualificacoes"
                      className={`${styles.formInput} ${styles.formTextarea}`}
                      name="qualificacoes"
                      placeholder={t.carreiras.qualificacoes}
                      value={formData.qualificacoes}
                      onChange={handleChange}
                      rows={4}
                      minLength={10}
                      maxLength={1000}
                    />
                  </div>
                  {/* Experiência */}
                  <div className={styles.formRow}>
                    <textarea
                      id="f-experiencia"
                      className={`${styles.formInput} ${styles.formTextarea}`}
                      name="experiencia"
                      placeholder={t.carreiras.experiencia}
                      value={formData.experiencia}
                      onChange={handleChange}
                      rows={4}
                      minLength={10}
                      maxLength={1000}
                      required
                    />
                  </div>
                  {/* Currículo */}
                  <div className={`${styles.formRow} ${styles.formRowUpload}`}>
                    <span className={styles.uploadLabel}>{t.carreiras.curriculo}</span>
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
                            {formData.curriculo ? formData.curriculo.name : t.carreiras.upload}
                          </span>
                          <div className={styles.uploadIconsWrapper}>
                            {formData.curriculo && (
                              <div 
                                className={styles.removeFileIcon}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormData(prev => ({ ...prev, curriculo: null }));
                                  if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                title="Remover anexo"
                              >
                                <span className="material-symbols-rounded">close</span>
                              </div>
                            )}
                            <span className={`material-symbols-rounded ${styles.uploadIcon} ${formData.curriculo ? styles.uploadIconSuccess : ''}`}>
                              {formData.curriculo ? 'check_circle' : 'attach_file'}
                            </span>
                          </div>
                        </>
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      className={styles.fileInputHidden}
                      onChange={handleFile}
                      aria-label="Selecionar arquivo de currículo"
                    />
                  </div>
                  {pdfError && (
                    <div className={styles.pdfErrorWrapper}>
                      <span className={`material-symbols-rounded ${styles.pdfErrorIcon}`}>error</span>
                      <p className={styles.pdfErrorText}>{t.carreiras.uploadAlerta}</p>
                    </div>
                  )}
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
                          {t.carreiras.enviando}
                          <div className={styles.spinner}></div>
                        </>
                      ) : (
                        <>
                          <span>{t.carreiras.enviar}</span>
                          <span className={`material-symbols-rounded ${styles.btnIcon}`}>send</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })()}
      </section>
    </main>
  );
}
