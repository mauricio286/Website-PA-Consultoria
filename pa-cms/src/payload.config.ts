import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import sharp from 'sharp'


// Collections
import Users from './collections/Users'
import Media from './collections/Media'
import Services from './collections/Services'
import Jobs from './collections/Jobs'
import Testimonials from './collections/Testimonials'
import Galleries from './collections/Galleries'
import MapLocations from './collections/MapLocations'

import { pt } from '@payloadcms/translations/languages/pt'

// Globals
import HomePage from './globals/HomePage'
import AboutPage from './globals/AboutPage'
import ServicesPage from './globals/ServicesPage'
import CareersPage from './globals/CareersPage'
import ContactSettings from './globals/ContactSettings'
import FooterSettings from './globals/FooterSettings'

// Endpoints customizados
import { contactHandler } from './endpoints/contact'
import { jobApplicationHandler } from './endpoints/jobApplication'

// Origens permitidas para CORS e CSRF (separadas por vírgula no .env)
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
const corsOrigins = [
  serverUrl,
  ...(process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim()),
]

const config = buildConfig({
  sharp,
  serverURL: serverUrl,
  // ── Painel admin ───────────────────────────────────────────────────────────
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: '@/components/CustomLogo',
      },
      afterNavLinks: [
        '@/components/CustomSidebar',
        '@/components/LogoutButton',
      ],
    },
    meta: {
      titleSuffix: '— PA Consultoria CMS',
    },
  },

  // ── Collections registradas ────────────────────────────────────────────────
  // IMPORTANTE: a ordem aqui define a ordem dos itens na sidebar!
  collections: [
    // Administração
    Users,
    // Páginas (aparecem junto com os globals na sidebar)
    Services,    // 3. Serviços
    Jobs,        // 4. Carreiras — vagas
    // Conteúdo de apoio
    Media,
    Testimonials,
    Galleries,
    MapLocations,
  ],

  // ── Globals registrados (aparecem na sidebar na ordem declarada) ────────────
  globals: [
    HomePage,        // 1. Home
    AboutPage,       // 2. Quem Somos
    ServicesPage,    // 3. Ecossistema (Geral)
    CareersPage,     // 4. Carreiras
    ContactSettings, // 5. Contato
    FooterSettings,  // 6. Footer
  ],

  // ── Editor de rich text ────────────────────────────────────────────────────
  editor: lexicalEditor({}),

  // ── Tradução (PT-BR) ───────────────────────────────────────────────────────
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },

  // ── Localização (PT/EN) ────────────────────────────────────────────────────
  localization: {
    locales: [
      {
        label: 'Português',
        code: 'pt',
      },
      {
        label: 'Inglês',
        code: 'en',
      },
    ],
    defaultLocale: 'pt',
    fallback: true,
  },

  // ── Banco de dados (PostgreSQL) ────────────────────────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  // ── Upload e armazenamento ─────────────────────────────────────────────────
  // Em desenvolvimento: arquivos salvos em /public/media (pasta local)
  // Em produção: trocar por gcsStorage do @payloadcms/storage-gcs
  plugins: [],

  // ── E-mail (Nodemailer / Resend SMTP) ───────────────────────────────────────
  // Configura automaticamente o transporte SMTP da Resend caso RESEND_API_KEY
  // seja fornecido, mantendo o fallback padrão para SMTP genérico ou mock local.
  email: nodemailerAdapter({
    defaultFromAddress: process.env.RESEND_FROM ?? process.env.EMAIL_FROM ?? 'noreply@agropa.com.br',
    defaultFromName: process.env.RESEND_FROM_NAME ?? 'PA Consultoria',
    transportOptions: (
      process.env.RESEND_API_KEY
        ? {
            host: 'smtp.resend.com',
            port: 465,
            secure: true,
            auth: {
              user: 'resend',
              pass: process.env.RESEND_API_KEY,
            },
          }
        : process.env.SMTP_USER &&
          process.env.SMTP_USER !== 'seu_email@gmail.com' &&
          process.env.SMTP_PASS &&
          process.env.SMTP_PASS !== 'xxxx_xxxx_xxxx_xxxx'
        ? {
            host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          }
        : {
            jsonTransport: true,
          }
    ) as any,
  }),

  // ── CORS e CSRF ────────────────────────────────────────────────────────────
  cors: corsOrigins,
  csrf: corsOrigins,

  // ── Endpoints customizados (formulários) ───────────────────────────────────
  endpoints: [
    {
      path: '/contact',
      method: 'post',
      handler: contactHandler,
    },
    {
      path: '/job-applications',
      method: 'post',
      handler: jobApplicationHandler,
    },
  ],

  // ── Chave secreta JWT ──────────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET ?? 'TROQUE_ISSO_EM_PRODUCAO',

  // ── TypeScript: tipos gerados automaticamente ──────────────────────────────
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },

  // ── Diretório raiz para build do Next.js ───────────────────────────────────
  routes: {
    admin: '/admin',
    api: '/api',
  },
})

export default config
