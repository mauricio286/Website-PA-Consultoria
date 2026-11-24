import type { GlobalConfig, Field } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

// Página de Eventos — estrutura idêntica ao modelo (PA Summit):
// Hero · O evento (números) · Sobre (+ universos) · Empresas · Experiência (linha do tempo)
// · Ingressos (Sympla) · Edições anteriores (cards + galeria).
// Imagens não preenchidas usam as imagens padrão do site (mesmas do modelo).

const t = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({ name, label, type: 'text', localized: true, ...extra }) as Field

const ta = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({ name, label, type: 'textarea', localized: true, ...extra }) as Field

const EventsPage: GlobalConfig = {
  slug: 'events-page',
  label: '2.4. Página de Eventos',
  admin: {
    group: 'Páginas',
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'enabled',
      label: 'Ativar Página de Eventos e Exibir no Menu',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Desativada por padrão. Quando marcado, o menu "Eventos" aparece no cabeçalho e a página /eventos fica acessível. Desmarque para ocultar após o evento.',
      },
    },

    // ── 01 · Hero ───────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '01 · Banner Principal (Hero)',
      fields: [
        t('heroBadge', 'Tag / Badge Superior (ex: Próximo evento)'),
        t('heroTitleLine1', 'Título — linha 1 (ex: PA Summit)'),
        t('heroTitleLine2', 'Título — linha 2, em destaque lima (ex: 2027)'),
        t('heroSubtitle', 'Subtítulo (lado direito)'),
        t('heroDateLocation', 'Data e Local (lado direito)'),
        t('heroCtaLabel', 'Texto do botão (rola até os ingressos)'),
        {
          name: 'heroImage',
          label: 'Imagem de Fundo do Hero (recomendado 1920×900)',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Vazio = imagem padrão do site.' },
        },
      ],
    },

    // ── 02 · O evento ───────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · O Evento (título e números em destaque)',
      fields: [
        t('highlightsTag', 'Tag da Seção'),
        t('highlightsTitle1', 'Título — 1ª linha'),
        t('highlightsTitleAccent', 'Título — 2ª linha (em verde)'),
        ta('highlightsDescription', 'Descrição (à direita do título)'),
        {
          name: 'highlightsStats',
          label: 'Números em Destaque (barra verde)',
          type: 'array',
          maxRows: 4,
          admin: { description: 'Recomendado: 4 itens.' },
          fields: [
            t('value', 'Número / Destaque (ex: 14ª, 06.02, +1.500)', { required: true }),
            t('label', 'Legenda (ex: Edição do Dia de Campo)', { required: true }),
          ],
        },
      ],
    },

    // ── 03 · Sobre ──────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '03 · Sobre o Evento (textos, ficha e universos)',
      fields: [
        t('aboutTitle1', 'Título — parte normal (ex: Sobre o)'),
        t('aboutTitleAccent', 'Título — parte em verde (ex: PA Summit)'),
        ta('aboutP1', '1º Parágrafo'),
        ta('aboutP2', '2º Parágrafo'),
        {
          name: 'infoItems',
          label: 'Ficha de Informações (Data, Horário, Local, Público)',
          type: 'array',
          fields: [
            t('key', 'Rótulo (ex: Data)', { required: true }),
            t('value', 'Informação (ex: 06 de fevereiro de 2027)', { required: true }),
          ],
        },
        {
          name: 'universes',
          label: 'Universos (painéis com foto — Soja, Milho, Algodão)',
          type: 'array',
          maxRows: 3,
          admin: { description: 'Recomendado: 3 painéis. Foto vazia = imagem padrão do site.' },
          fields: [
            t('tag', 'Tag (ex: Universo 01)'),
            t('crop', 'Cultura (ex: Soja)', { required: true }),
            ta('focus', 'Foco / Descrição'),
            { name: 'image', label: 'Foto do painel', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },

    // ── 04 · Empresas ───────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '04 · Empresas Confirmadas (logos deslizando)',
      fields: [
        t('partnersTag', 'Tag da Seção'),
        t('partnersTitle1', 'Título — parte normal (ex: Empresas)'),
        t('partnersTitleAccent', 'Título — parte em lima (ex: confirmadas)'),
        {
          name: 'partnersLogos',
          label: 'Logos das Empresas',
          type: 'array',
          admin: {
            description:
              'As logos aparecem em branco sobre fundo escuro. Vazio = Syngenta, Corteva, BASF e Bayer.',
          },
          fields: [
            { name: 'name', label: 'Nome da Empresa', type: 'text', required: true },
            { name: 'logo', label: 'Logo (PNG/SVG, de preferência fundo transparente)', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },

    // ── 05 · Experiência ────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '05 · A Experiência (linha do tempo do dia)',
      fields: [
        t('experienceTag', 'Tag da Seção'),
        t('experienceTitle1', 'Título — parte normal (ex: Como o dia)'),
        t('experienceTitleAccent', 'Título — parte em lima (ex: acontece)'),
        t('experienceStepLabel', 'Rótulo da etapa (ex: Etapa)'),
        {
          name: 'experienceSteps',
          label: 'Etapas da Programação',
          type: 'array',
          admin: { description: 'Cada etapa troca a foto grande ao lado. Foto vazia = imagem padrão.' },
          fields: [
            t('time', 'Horário (ex: 07h00)', { required: true }),
            t('title', 'Título da Etapa', { required: true }),
            ta('description', 'Descrição'),
            t('caption', 'Legenda sobre a foto'),
            { name: 'image', label: 'Foto da etapa', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },

    // ── 06 · Ingressos ──────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '06 · Ingressos (banner lima — Sympla)',
      fields: [
        t('ticketsBadge', 'Selo (ex: Lote promocional aberto)'),
        t('ticketsTitle', 'Título (ex: Garanta seu lugar)'),
        ta('ticketsDescription', 'Descrição'),
        t('ticketsCtaLabel', 'Texto do botão'),
        {
          name: 'ticketsCtaUrl',
          label: 'Link de Compra (URL da Sympla)',
          type: 'text',
          defaultValue: 'https://www.sympla.com.br/',
        },
        t('ticketsNote', 'Aviso abaixo do banner'),
      ],
    },

    // ── 07 · Edições anteriores ─────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '07 · Edições Anteriores (cards e galeria de fotos)',
      fields: [
        t('pastTag', 'Tag da Seção'),
        t('pastTitle1', 'Título — parte normal (ex: Veja nossos)'),
        t('pastTitleAccent', 'Título — parte em verde (ex: eventos anteriores)'),
        t('pastViewLabel', 'Texto do link do card (ex: Ver mais)'),
        t('pastCloseLabel', 'Texto de fechar a galeria (ex: Fechar)'),
        t('pastPhotoLabel', 'Rótulo do contador de fotos (ex: Foto)'),
        {
          name: 'pastEvents',
          label: 'Edições Anteriores',
          type: 'array',
          fields: [
            t('name', 'Nome (ex: PA Summit 2026)', { required: true }),
            t('date', 'Data (ex: Fev 2026)', { required: true }),
            t('people', 'Participantes (ex: +1.350 participantes)'),
            ta('desc', 'Descrição'),
            { name: 'cover', label: 'Foto de capa do card', type: 'upload', relationTo: 'media' },
            {
              name: 'gallery',
              label: 'Galeria de fotos (abre ao clicar em "Ver mais")',
              type: 'array',
              admin: { description: 'Vazio = galeria padrão do site.' },
              fields: [
                { name: 'image', label: 'Foto', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default EventsPage
