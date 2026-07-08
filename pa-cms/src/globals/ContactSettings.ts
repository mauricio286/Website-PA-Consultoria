import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

// Dados de contato da empresa: endereços, telefones, e-mails e destinatários dos formulários
const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Configurações de Contato',
  admin: {
    group: 'Páginas',
  },
  access: {
    read: () => true,

    update: isLoggedIn,
  },
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '01 · Hero',
      fields: [
        {
          name: 'heroImage',
          label: 'Imagem de fundo do Hero',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'heroImageTablet',
          label: 'Imagem de fundo (Tablet)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Opcional. Exibida em tablets (telas de até 1024px). Se não informada, usa a de Desktop.',
          },
        },
        {
          name: 'heroImageMobile',
          label: 'Imagem de fundo (Mobile)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Opcional. Exibida em celulares (telas de até 580px). Se não informada, usa a de Desktop ou Tablet.',
          },
        },
      ],
    },

    // ── E-mails ────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'E-mails',
      fields: [
        {
          name: 'mainEmail',
          label: 'E-mail principal',
          type: 'email',
          admin: { description: 'Ex: contato@agropa.com.br' },
        },
        {
          name: 'hrEmail',
          label: 'E-mail de RH',
          type: 'email',
          admin: { description: 'Ex: rh@agropa.com.br' },
        },
        {
          name: 'formRecipientEmail',
          label: 'Destinatário do formulário de contato',
          type: 'email',
          admin: {
            description: 'Recebe as mensagens enviadas pelo formulário da página Contato.',
          },
        },
        {
          name: 'careerRecipientEmail',
          label: 'Destinatário das candidaturas',
          type: 'email',
          admin: {
            description: 'Recebe as candidaturas enviadas pela página Carreiras.',
          },
        },
      ],
    },

    // ── Telefones ──────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Telefones',
      fields: [
        {
          name: 'phone',
          label: 'Telefone principal',
          type: 'text',
          admin: { description: 'Ex: (65) 3016-1203' },
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp',
          type: 'text',
          admin: { description: 'Número com DDD, sem formatação. Ex: 65991234567' },
        },
      ],
    },

    // ── Formulário de Contato ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Formulário de Contato',
      fields: [
        {
          name: 'formTitle',
          label: 'Título do Formulário',
          type: 'text',
          localized: true,
          defaultValue: 'Fale conosco',
        },
        {
          name: 'formDescription',
          label: 'Descrição do Formulário',
          type: 'textarea',
          localized: true,
          defaultValue: 'Nosso time está à disposição para esclarecer dúvidas, apresentar nossos serviços e ajudar você a encontrar as melhores soluções para sua realidade. Entre em contato conosco. Será um prazer conversar com você.',
        },
      ],
    },

    // ── Endereços ──────────────────────────────────────────────────────────
    {
      name: 'addresses',
      label: 'Endereços',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Nome da unidade',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'Ex: Grupo PA - Matriz' },
        },
        {
          name: 'address',
          label: 'Endereço completo',
          type: 'text',
          localized: true,
        },
        {
          name: 'phone',
          label: 'Telefone',
          type: 'text',
        },
        {
          name: 'email',
          label: 'E-mail da unidade',
          type: 'email',
        },
      ],
    },
  ],
}

export default ContactSettings
