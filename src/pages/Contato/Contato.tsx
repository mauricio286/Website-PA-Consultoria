import { useState, useEffect } from 'react';
import styles from './Contato.module.css';
import { imgBgContato, imgIconWhereToVote, imgIconCall, imgIconMail } from '../../assets';
import { api } from '../../services/api';
import type { ContactSettingsData } from '../../services/api';
import { useLanguage } from '../../i18n';

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cmsData, setCmsData] = useState<ContactSettingsData | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const { locale, t } = useLanguage();

  useEffect(() => {
    api.getContactSettings(locale)
      .then(data => setCmsData(data))
      .catch(err => console.error("Erro ao carregar dados de contato:", err));
  }, [locale]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating message submit delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const addressData = (cmsData?.addresses && cmsData.addresses.length > 0)
    ? cmsData.addresses
    : [
        {
          title: "Grupo PA - Matriz",
          address: "Av. Brasil, 2453 - Jardim Cidade Alta, Tangará da Serra-MT - 78306-157",
          phone: "(65) 3016-1203",
          email: "contato@agropa.com.br"
        },
        {
          title: "Faz. São Paulo",
          address: "Rod. BR-364 , KM 724 + 15Km à direita - Zona Rural, Diamantino-MT - 78.304-000",
          phone: "(65) 3325-3129",
          email: "administrativoagricola@agropa.com.br"
        },
        {
          title: "Sinop",
          address: "Galeria Trivium – Sala 01, Rua das Andirobas, 223, Setor Comercial, CEP: 78550-000",
          phone: "---",
          email: "---"
        }
      ];

  const bgImage = cmsData?.heroImage ? api.getMediaUrl(cmsData.heroImage) : imgBgContato;
  const bgImageTablet = cmsData?.heroImageTablet ? api.getMediaUrl(cmsData.heroImageTablet) : undefined;
  const bgImageMobile = cmsData?.heroImageMobile ? api.getMediaUrl(cmsData.heroImageMobile) : undefined;

  return (
    <main className={`${styles.contatoPage} page-transition-enter`}>
      {/* ── Sessão 01 — Hero ─────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <picture>
            {bgImageMobile && <source media="(max-width: 580px)" srcSet={bgImageMobile} />}
            {bgImageTablet && <source media="(max-width: 1024px)" srcSet={bgImageTablet} />}
            <img src={bgImage} alt="Banner Contato" className={styles.heroBg} />
          </picture>
        </div>
        <div className={styles.scrollDownWrapper}>
          <a href="#contato" className={styles.scrollDownButton} aria-label="Rolar para o contato">
            <span className={`material-symbols-rounded ${styles.scrollDownIcon}`}>
              arrow_downward
            </span>
          </a>
        </div>
      </section>

      {/* ── Sessão 02 — Contact Section ──────────────────────────────────── */}
      <section id="contato" className={styles.contactSection}>
        <div className={styles.contactContainer}>
          
          {/* Left Column: Título e Formulário */}
          <div className={styles.leftColumn}>
            <h2 className={styles.introTitle}>{cmsData?.formTitle || t.contato.title}</h2>
            <p className={styles.introDesc}>
              {cmsData?.formDescription || t.contato.description}
            </p>

            <div className={styles.formWrapper}>
              {!submitted ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder={t.contato.nome} 
                    className={styles.formInput} 
                    required 
                    minLength={3}
                  />
                  
                  <div className={styles.formRow}>
                    <input 
                      type="tel" 
                      name="celular"
                      value={formData.celular}
                      onChange={handleChange}
                      placeholder={t.contato.celular} 
                      className={styles.formInput} 
                      required 
                      minLength={14}
                      maxLength={15}
                    />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contato.email} 
                      className={styles.formInput} 
                      required 
                    />
                  </div>
                  
                  <input 
                    type="text" 
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    placeholder={t.contato.assunto} 
                    className={styles.formInput} 
                    required 
                    minLength={3}
                  />
                  
                  <textarea 
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder={t.contato.mensagem} 
                    className={`${styles.formInput} ${styles.formTextarea}`} 
                    required 
                    minLength={10}
                  ></textarea>
                  
                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        {t.contato.enviando}
                        <div className={styles.spinner}></div>
                      </>
                    ) : (
                      <>
                        {t.contato.enviar}
                        <span className={`material-symbols-rounded ${styles.btnIcon}`}>send</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className={styles.successMessage}>
                  <span className={`material-symbols-rounded ${styles.successIcon}`}>
                    check_circle
                  </span>
                  <h3>{t.contato.sucesso}</h3>
                  <p>{t.contato.sucessoDesc}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Address Cards */}
          <div className={styles.rightColumn}>
            {addressData.map((data, index) => (
              <div key={index} className={styles.addressCard}>
                <h3 className={styles.cardTitle}>{data.title}</h3>
                
                <div className={styles.cardContactList}>
                  <div className={styles.cardContactItem}>
                    <img src={imgIconWhereToVote} alt="Endereço" className={styles.cardIconImg} />
                    <p className={styles.cardText}>{data.address}</p>
                  </div>
                  
                  <div className={styles.cardContactItem}>
                    <img src={imgIconCall} alt="Telefone" className={styles.cardIconImg} />
                    <p className={styles.cardText}>{data.phone}</p>
                  </div>
                  
                  <div className={styles.cardContactItem}>
                    <img src={imgIconMail} alt="E-mail" className={styles.cardIconImg} />
                    <p className={styles.cardText}>{data.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
