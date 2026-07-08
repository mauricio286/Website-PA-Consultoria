import { useState, useRef, useEffect } from 'react';
import styles from './Carreiras.module.css';
import AnimatedText from '../../components/AnimatedText';
import { imgBgCarreiras } from '../../assets';
import { useLanguage } from '../../i18n';
import { message } from 'antd';

// ─── Dados das Vagas ─────────────────────────────────────────────────────────
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

const vagas: Vaga[] = [
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
        'Ensure the organization and efficiency of the company\'s financial, tax, and administrative processes, ensuring compliance with legal and tax obligations, effective expense control, supplier management, and support for financial administrative coordination.',
      requisitos: [
        'Driver\'s License category AB',
        'Experience as a financial administrative analyst',
        'Degree in Business Administration, Accounting, or related fields',
        'Mastery of administrative and financial routines',
        'Assertive communication with suppliers and clients',
        'Proficiency in Excel and knowledge of Power BI',
        'Intermediate level MS Office',
      ],
      atribuicoes: [
        'Perform bank reconciliation',
        'Enter invoices into the system',
        'Issue invoices as needed',
        'Responsible for accounts payable and accounts receivable routines',
        'Organize monthly movement (financial flows and documents)',
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
        'Responsável por coordenar e monitorar as operações agrícolas no centro de comando...',
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'Agricultural Operations Center Analyst (COA)',
      descricaoCurta:
        'Responsible for coordinating and monitoring agricultural operations in the command center...',
      descricaoCompleta:
        'Responsible for coordinating and monitoring agricultural operations in the command center, ensuring operational efficiency and communication between field teams and strategic management.',
      requisitos: [
        'Degree in Agronomy or related fields',
        'Experience in agricultural operations management',
        'Knowledge of precision agriculture',
        'Ability with remote monitoring systems',
        'Intermediate/advanced MS Office',
      ],
      atribuicoes: [
        'Monitor field operations in real time',
        'Coordinate field teams and operational resources',
        'Prepare agricultural performance reports',
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
        'Oportunidade de estágio obrigatório para estudantes de cursos de Agronomia, Administração...',
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'Mandatory Internship',
      descricaoCurta:
        'Mandatory internship opportunity for students of Agronomy, Business Administration...',
      descricaoCompleta:
        'Mandatory internship opportunity for students of Agronomy, Business Administration, or related fields, focusing on practical learning in Grupo PA operations.',
      requisitos: [
        'Currently studying Agronomy, Business Administration, or related fields',
        'Availability of 20 to 30 hours per week',
        'Interest in agribusiness',
        'Good communication and proactivity',
      ],
      atribuicoes: [
        'Support administrative activities',
        'Participate in field visits under supervision',
        'Assist in preparing reports',
        'Support internal consulting projects',
      ],
    }
  },
  {
    id: 4,
    pt: {
      data: 'Aberta em 12/03/2027',
      titulo: 'Trabalhador Volante da Agricultura',
      descricaoCurta:
        'Execução de atividades operacionais no campo, incluindo plantio, colheita e manutenção...',
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'General Agricultural Worker',
      descricaoCurta:
        'Execution of operational activities in the field, including planting, harvesting and maintenance...',
      descricaoCompleta:
        'Execution of operational activities in the field, including planting, harvesting, and crop maintenance, under the supervision of Grupo PA\'s technical team.',
      requisitos: [
        'Experience in rural activities',
        'Availability for fieldwork',
        'Driver\'s License category B (desirable)',
        'Physical endurance for outdoor activities',
      ],
      atribuicoes: [
        'Perform planting and harvesting activities',
        'Maintenance of crops and equipment',
        'Application of inputs according to technical guidance',
        'Control and recording of daily activities',
      ],
    }
  },
  {
    id: 5,
    pt: {
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
    en: {
      data: 'Opened on 03/12/2027',
      titulo: 'Corporate Administrative Analyst',
      descricaoCurta:
        'Ensure the organization and efficiency of the financial, tax, and administrative processes...',
      descricaoCompleta:
        'Ensure the organization and efficiency of the company\'s financial, tax, and administrative processes, ensuring compliance with legal and tax obligations, effective expense control, supplier management, and support for financial administrative coordination.',
      requisitos: [
        'Driver\'s License category AB',
        'Experience as a financial administrative analyst',
        'Degree in Business Administration, Accounting, or related fields',
        'Mastery of administrative and financial routines',
        'Proficiency in Excel and knowledge of Power BI',
      ],
      atribuicoes: [
        'Perform bank reconciliation',
        'Enter invoices into the system',
        'Responsible for accounts payable and accounts receivable routines',
        'Organize monthly movement',
        'Maintain organized digital and physical document archives',
      ],
    }
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
      // 1. MIME Type Restriction (AppSec)
      if (file.type !== 'application/pdf') {
        message.error(t.carreiras.uploadAlerta || 'Por segurança, apenas arquivos PDF são permitidos.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // 2. Size Limit - Max 5MB (AppSec)
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isLt5M) {
        message.error('O arquivo excedeu o limite máximo de 5MB.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // 3. Filename Sanitation (AppSec)
      const sanitizeFilename = (name: string) => {
        const extension = name.substring(name.lastIndexOf('.'));
        const baseName = name.substring(0, name.lastIndexOf('.'));
        const safeBaseName = baseName
          .normalize('NFD') // Remove acentos
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]/g, '_') // Troca espaços e chars especiais por underline
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

    setIsSubmitting(true);

    // 4. Prepara e higieniza os dados no FormData (AppSec)
    const payload = new FormData();
    payload.append('nome', formData.nome.trim());
    payload.append('celular', formData.celular.trim());
    payload.append('email', formData.email.trim());
    payload.append('cpf', formData.cpf.trim());
    payload.append('rg', formData.rg.trim());
    payload.append('estado', formData.estado.trim());
    payload.append('cidade', formData.cidade.trim());
    payload.append('formacao', formData.formacao.trim());
    payload.append('qualificacoes', formData.qualificacoes.trim());
    payload.append('experiencia', formData.experiencia.trim());
    payload.append('curriculo', formData.curriculo);

    try {
      // SECURITY NOTE: A API Key do Resend NUNCA deve ser exposta no client-side.
      // O fetch abaixo enviará este payload para uma rota interna do seu back-end,
      // e é o seu back-end (Node/Next/PHP) que chamará a API do Resend de forma segura.
      
      /* Exemplo real:
      await fetch('/api/candidatura', {
        method: 'POST',
        body: payload, // O navegador ajusta automaticamente o Content-Type multipart/form-data com boundary
      });
      */

      // Simulando o tempo de rede por enquanto
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
    } catch (error) {
      message.error('Erro ao enviar candidatura. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
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
            <AnimatedText key={`carr-title1-${locale}`} text={t.carreiras.title1} type="word" />
            <span className={styles.highlight}>
              <AnimatedText key={`carr-title2-${locale}`} text={t.carreiras.titleHighlight} type="word" delay={0.15} />
            </span>
          </h2>
            <div className={styles.introText} ref={alignRef}>
              <p style={{ marginBottom: '16px' }}>
                {t.carreiras.introP1}
              </p>
              <p style={{ marginBottom: '16px' }}>
                {t.carreiras.introP2}
              </p>
              <p>
                {t.carreiras.introP3}
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
              const content = locale === 'en' ? vaga.en : vaga.pt;
              return (
                <div
                  key={vaga.id}
                  data-card
                  className={`${styles.vagaCard} ${isSelected ? styles.vagaCardSelected : ''}`}
                >
                  {/* Data */}
                  <div className={styles.cardTop}>
                    <span className={styles.vagaData}>{content.data}</span>
                  </div>

                  {/* Título + descrição */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.vagaTitulo}>{content.titulo}</h3>
                    <p className={styles.vagaDescricao}>{content.descricaoCurta}</p>
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
                        {isSelected ? t.carreiras.aplicando : t.carreiras.aplicar}
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
          const content = locale === 'en' ? vagaSelecionada.en : vagaSelecionada.pt;
          return (
          <div className={styles.formularioWrapper} ref={formularioRef}>
            {/* Cabeçalho da vaga */}
            <div className={styles.vagaDetalheHeader}>
              <h2 className={styles.vagaDetalheTitulo}>
                <AnimatedText key={`vaga-${vagaSelecionada.id}-${locale}`} text={content.titulo} type="word" once={false} />
              </h2>
              <p className={styles.vagaDetalheDesc}>
                {content.descricaoCompleta}
              </p>
            </div>

            {/* Requisitos + Atribuições */}
            <div className={styles.vagaReqAtrib}>
              <div className={styles.vagaColuna}>
                <h4 className={styles.vagaColunaTitle}>{t.carreiras.requisitos}</h4>
                <ul className={styles.vagaLista}>
                  {content.requisitos.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.vagaColuna}>
                <h4 className={styles.vagaColunaTitle}>{t.carreiras.atribuicoes}</h4>
                <ul className={styles.vagaLista}>
                  {content.atribuicoes.map((atr, i) => (
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
                <h3>{t.carreiras.sucesso}</h3>
                <p>
                  {t.carreiras.sucessoDesc1}{' '}
                  <strong>{content.titulo}</strong>.{' '}
                  {t.carreiras.sucessoDesc2}
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
                    accept=".pdf,.doc,.docx"
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
