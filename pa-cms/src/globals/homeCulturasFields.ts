import type { Field } from 'payload'

// Campos da seção "Culturas" (bolhas interativas) da Home.
// 3 culturas e 5 números fixos: posição, cor e tamanho de cada bolha são definidos pelo design.

const cultura = (
  name: string,
  label: string,
  defaults: { nome: string; texto: string; l1: string; l2: string; l3: string },
): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'nome', label: 'Nome da cultura', type: 'text', localized: true, defaultValue: defaults.nome },
    {
      name: 'texto',
      label: 'Texto no painel',
      type: 'textarea',
      localized: true,
      admin: { description: 'Breve texto sobre a atuação da PA nesta cultura.' },
    },
    {
      name: 'foto',
      label: 'Foto da bolha',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Aparece ao passar o mouse/tocar na bolha. Quadrada (1:1), mínimo 640×640 px.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'stat1Numero', label: 'Número 1', type: 'text', admin: { width: '30%', description: 'Ex: 120' } },
        { name: 'stat1Legenda', label: 'Legenda 1', type: 'text', localized: true, defaultValue: defaults.l1, admin: { width: '70%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'stat2Numero', label: 'Número 2', type: 'text', admin: { width: '30%' } },
        { name: 'stat2Legenda', label: 'Legenda 2', type: 'text', localized: true, defaultValue: defaults.l2, admin: { width: '70%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'stat3Numero', label: 'Número 3', type: 'text', admin: { width: '30%' } },
        { name: 'stat3Legenda', label: 'Legenda 3', type: 'text', localized: true, defaultValue: defaults.l3, admin: { width: '70%' } },
      ],
    },
  ],
})

const numero = (name: string, label: string, legenda: string, complemento: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'valor', label: 'Número', type: 'text', admin: { width: '30%', description: 'Ex: 15' } },
        { name: 'legenda', label: 'Legenda na bolha', type: 'text', localized: true, defaultValue: legenda, admin: { width: '70%' } },
      ],
    },
    {
      name: 'tituloPainel',
      label: 'Título no painel (complemento)',
      type: 'text',
      localized: true,
      defaultValue: complemento,
      admin: { description: 'Aparece depois do número. Ex: "anos" → "15 anos".' },
    },
    { name: 'texto', label: 'Texto no painel', type: 'textarea', localized: true },
  ],
})

export const homeCulturasField: Field = {
  type: 'collapsible',
  label: '05.1 · Culturas (bolhas interativas)',
  admin: { initCollapsed: true },
  fields: [
    {
      name: 'culturas',
      label: 'Seção Culturas',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Exibir a seção Culturas na Home',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Desmarcado: a seção não aparece no site. Marque somente depois de preencher os textos e as fotos.' },
        },
        { name: 'tag', label: 'Tag', type: 'text', localized: true, defaultValue: 'ESTRUTURA' },
        { name: 'titulo', label: 'Título', type: 'text', localized: true, defaultValue: 'Culturas' },
        {
          name: 'subtitulo',
          label: 'Subtítulo',
          type: 'text',
          localized: true,
          defaultValue: 'Passe o mouse ou toque em uma bolha para explorar.',
        },
        { name: 'painelKicker', label: 'Painel vazio — kicker', type: 'text', localized: true, defaultValue: 'GRUPO PA' },
        { name: 'painelTitulo', label: 'Painel vazio — título', type: 'text', localized: true, defaultValue: 'Onde a PA atua' },
        {
          name: 'painelTexto',
          label: 'Painel vazio — texto',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Cada bolha é uma cultura ou um número da PA. Passe o mouse para ver a imagem e os dados; clique para fixar.',
        },
        { name: 'kickerCultura', label: 'Kicker das culturas', type: 'text', localized: true, defaultValue: 'CULTURA' },
        { name: 'kickerNumeros', label: 'Kicker dos números', type: 'text', localized: true, defaultValue: 'A PA EM NÚMEROS' },

        cultura('soja', 'Cultura · Soja', {
          nome: 'Soja', texto: '', l1: 'ensaios na safra', l2: 'mil ha acompanhados', l3: 'produtores atendidos',
        }),
        cultura('milho', 'Cultura · Milho', {
          nome: 'Milho', texto: '', l1: 'ensaios na safra', l2: 'mil ha acompanhados', l3: 'híbridos avaliados',
        }),
        cultura('algodao', 'Cultura · Algodão', {
          nome: 'Algodão', texto: '', l1: 'ensaios na safra', l2: 'mil ha acompanhados', l3: 'variedades avaliadas',
        }),

        numero('n1', 'Número 1 · bolha verde-escura grande', 'anos de pesquisa', 'anos'),
        numero('n2', 'Número 2 · bolha lima pequena', 'consultores', 'consultores'),
        numero('n3', 'Número 3 · bolha verde-escura pequena (topo)', 'municípios', 'municípios'),
        numero('n4', 'Número 4 · bolha cobre', 'clientes', 'clientes'),
        numero('n5', 'Número 5 · bolha verde-escura pequena (direita)', 'mil ha', 'mil hectares'),
      ],
    },
  ],
}
