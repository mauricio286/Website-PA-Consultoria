import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isAdmin'

// Pontos de presença exibidos no mapa SVG da seção Atuação
// ATENÇÃO: positionX e positionY são coordenadas em pixels do viewBox SVG (1195×1031),
// não coordenadas geográficas (lat/lng). Alterar o SVG do mapa pode deslocar todos os pins.
const MapLocations: CollectionConfig = {
  slug: 'map-locations',
  labels: {
    singular: 'Localização',
    plural: 'Localizações',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'state', 'area', 'published'],
    group: 'Conteúdo',
    description: 'Pins exibidos no mapa SVG. As coordenadas são pixels, não lat/lng.',
  },
  disableBulkEdit: true,
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'title',
      label: 'Nome da cidade',
      type: 'text',
      required: true,
      admin: { description: 'Nome na lista' },
    },
    {
      name: 'city',
      label: 'Cidade',
      type: 'text',
      required: true,
      admin: { description: 'Nome no mapa' },
    },
    {
      name: 'state',
      label: 'Estado (UF)',
      type: 'text',
      maxLength: 2,
    },
    {
      name: 'area',
      label: 'Área de atuação',
      type: 'text',
      admin: { description: 'Ex: 15.600 Hac.' },
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
    },

    // ── Seletor de Posição Visual ──────────────────────────────────────────
    {
      name: 'mapPicker',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/MapPicker/MapPicker',
        },
      },
    },

    // ── Coordenadas SVG ────────────────────────────────────────────────────
    // Valores relativos ao viewBox="0 0 1195 1031" do mapa
    {
      type: 'row',
      fields: [
        {
          name: 'positionX',
          label: 'Posição X (px)',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
            description: 'Eixo horizontal no SVG do mapa.',
          },
        },
        {
          name: 'positionY',
          label: 'Posição Y (px)',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
            description: 'Eixo vertical no SVG do mapa.',
          },
        },
      ],
    },

    /*   {
        name: 'order',
        label: 'Ordem de exibição',
        type: 'number',
        defaultValue: 0,
      },
    */
    {
      name: 'published',
      label: 'Publicado',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default MapLocations
