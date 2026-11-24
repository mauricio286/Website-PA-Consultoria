import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

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
    // ── Ativação / Desativação da Página e Menu ─────────────────────────────
    {
      name: 'enabled',
      label: 'Ativar Página de Eventos e Exibir no Menu',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Desativada por padrão. Quando marcado, o menu "Eventos" aparece no cabeçalho e a página /eventos fica acessível. Desmarque para ocultar após o evento.',
      },
    },

    // ── 01 · Banner Principal (Hero) ────────────────────────────────────────
    {
      type: 'collapsible',
      label: '01 · Banner Principal (Hero)',
      fields: [
        {
          name: 'heroBadge',
          label: 'Tag / Badge Superior',
          type: 'text',
          localized: true,
          defaultValue: 'Próximo evento',
        },
        {
          name: 'heroTitle',
          label: 'Título Principal do Evento',
          type: 'text',
          localized: true,
          defaultValue: 'PA SUMMIT 2027',
          required: true,
        },
        {
          name: 'heroSubtitle',
          label: 'Subtítulo',
          type: 'text',
          localized: true,
          defaultValue: 'Produtividade em outra dimensão',
        },
        {
          name: 'heroImage',
          label: 'Imagem / KV de Fundo (1920×900)',
          type: 'upload',
          relationTo: 'media',
          localized: true,
        },
      ],
    },

    // ── 02 · Números em Destaque ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '02 · Números em Destaque',
      fields: [
        {
          name: 'statsTag',
          label: 'Tag da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'O evento',
        },
        {
          name: 'statsTitle',
          label: 'Título / Descritivo Curto',
          type: 'textarea',
          localized: true,
          defaultValue: 'Uma imersão completa em resultados de pesquisa, inovação agronômica e tendências de mercado para impulsionar a safra.',
        },
        {
          name: 'stats',
          label: 'Cards de Estatísticas (Métricas)',
          type: 'array',
          fields: [
            {
              name: 'number',
              label: 'Número / Destaque (ex: 14ª, 06.02, 800+)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'label',
              label: 'Legenda explicativa (ex: edição do Dia de Campo)',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },

    // ── 03 · Informações Gerais ─────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '03 · Informações Gerais',
      fields: [
        {
          name: 'aboutTitle',
          label: 'Título da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'Sobre o PA Summit',
        },
        {
          name: 'aboutText',
          label: 'Texto Descritivo (Esquerda)',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({}),
        },
        {
          name: 'infoItems',
          label: 'Informações Práticas (Direita)',
          type: 'array',
          fields: [
            {
              name: 'key',
              label: 'Rótulo (ex: Data, Local, Horário, Público)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'value',
              label: 'Informação (ex: 06 de fevereiro de 2027)',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },

    // ── 04 · Empresas Confirmadas ───────────────────────────────────────────
    {
      type: 'collapsible',
      label: '04 · Empresas Confirmadas (Logos Deslizando)',
      fields: [
        {
          name: 'partnersTag',
          label: 'Tag da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'Quem estará lá',
        },
        {
          name: 'partnersTitle',
          label: 'Título da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'Empresas confirmadas',
        },
        {
          name: 'partnersLogos',
          label: 'Logomarcas de Patrocinadores e Parceiros',
          type: 'array',
          fields: [
            {
              name: 'name',
              label: 'Nome da Empresa',
              type: 'text',
              required: true,
            },
            {
              name: 'logo',
              label: 'Imagem do Logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },

    // ── 05 · Programação / Como Funciona ────────────────────────────────────
    {
      type: 'collapsible',
      label: '05 · Programação / Como Funciona',
      fields: [
        {
          name: 'scheduleTag',
          label: 'Tag da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'Programação',
        },
        {
          name: 'scheduleTitle',
          label: 'Título da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'Como funciona o evento',
        },
        {
          name: 'scheduleImage',
          label: 'Imagem Ilustrativa (Esquerda)',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'scheduleSteps',
          label: 'Etapas da Programação (Direita)',
          type: 'array',
          fields: [
            {
              name: 'time',
              label: 'Horário (ex: 07:30)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'title',
              label: 'Título da Etapa (ex: Credenciamento e Abertura)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              label: 'Breve Descrição',
              type: 'textarea',
              localized: true,
            },
          ],
        },
      ],
    },

    // ── 06 · CTA Ingressos (Sympla) ─────────────────────────────────────────
    {
      type: 'collapsible',
      label: '06 · Ingressos (CTA Sympla)',
      fields: [
        {
          name: 'ctaTitle',
          label: 'Título do Bloco CTA',
          type: 'text',
          localized: true,
          defaultValue: 'Garanta seu lugar',
        },
        {
          name: 'ctaSubtitle',
          label: 'Subtítulo / Informações de Ingressos',
          type: 'text',
          localized: true,
          defaultValue: 'Lote promocional por tempo limitado · Vagas limitadas',
        },
        {
          name: 'ctaButtonLabel',
          label: 'Texto do Botão',
          type: 'text',
          localized: true,
          defaultValue: 'Compre aqui agora',
        },
        {
          name: 'ctaButtonUrl',
          label: 'Link de Compra (URL da Sympla)',
          type: 'text',
          defaultValue: 'https://www.sympla.com.br/',
        },
        {
          name: 'ctaNotice',
          label: 'Aviso Inferior',
          type: 'text',
          localized: true,
          defaultValue: 'Redireciona com segurança para a página do evento na Sympla',
        },
      ],
    },

    // ── 07 · Eventos Anteriores ─────────────────────────────────────────────
    {
      type: 'collapsible',
      label: '07 · Eventos Anteriores (Nossa História)',
      fields: [
        {
          name: 'pastEventsTag',
          label: 'Tag da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'Nossa história',
        },
        {
          name: 'pastEventsTitle',
          label: 'Título da Seção',
          type: 'text',
          localized: true,
          defaultValue: 'Veja nossos eventos anteriores',
        },
        {
          name: 'pastEvents',
          label: 'Lista de Eventos Anteriores',
          type: 'array',
          fields: [
            {
              name: 'name',
              label: 'Nome do Evento (ex: PA Summit 2026)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'date',
              label: 'Data / Mês (ex: Fevereiro 2026)',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'people',
              label: 'Total de Participantes (ex: 800 pessoas)',
              type: 'text',
              localized: true,
            },
            {
              name: 'desc',
              label: 'Breve Descrição',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'photo',
              label: 'Foto do Evento',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'galleryUrl',
              label: 'Link da Galeria (Opcional)',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default EventsPage

