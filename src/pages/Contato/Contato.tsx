import { useState, useEffect } from 'react';
import styles from './Contato.module.css';
import { imgBgContato, imgIconWhereToVote, imgIconCall, imgIconMail } from '../../assets';
import { api } from '../../services/api';
import type { ContactSettingsData } from '../../services/api';

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

  useEffect(() => {
    api.getContactSettings()
      .then(data => setCmsData(data))
      .catch(err => console.error("Erro ao carregar dados de contato:", err));
  }, []);

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

  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulando um delay de envio (ex: API call)
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

  return (
    <main className={`${styles.contatoPage} page-transition-enter`}>
      {/* ── Sessão 01 — Hero ─────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrapper}>
          <img src={imgBgContato} alt="Banner Contato" className={styles.heroBg} />
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
            <h2 className={styles.introTitle}>{cmsData?.formTitle || "Fale conosco"}</h2>
            <p className={styles.introDesc}>
              {cmsData?.formDescription || "Nosso time está à disposição para esclarecer dúvidas, apresentar nossos serviços e ajudar você a encontrar as melhores soluções para sua realidade. Entre em contato conosco. Será um prazer conversar com você."}
            </p>

            <div className={styles.formWrapper}>
              {!submitted ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome" 
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
                      placeholder="Celular ou Fixo" 
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
                      placeholder="E-mail" 
                      className={styles.formInput} 
                      required 
                    />
                  </div>
                  
                  <input 
                    type="text" 
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    placeholder="Assunto" 
                    className={styles.formInput} 
                    required 
                    minLength={3}
                  />
                  
                  <textarea 
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Sua mensagem" 
                    className={`${styles.formInput} ${styles.formTextarea}`} 
                    required 
                    minLength={10}
                  ></textarea>
                  
                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        Enviando...
                        <div className={styles.spinner}></div>
                      </>
                    ) : (
                      <>
                        Enviar
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
                  <h3>Mensagem enviada!</h3>
                  <p>Agradecemos o seu contato. Em breve, um de nossos especialistas retornará para você.</p>
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
