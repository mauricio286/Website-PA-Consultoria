import type { CollectionBeforeChangeHook } from 'payload'
import slugify from 'slugify'

// Gera o slug automaticamente a partir do campo 'title' se não foi preenchido manualmente
export const autoSlugHook: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' || !data.slug) {
    data.slug = slugify(data.title ?? '', {
      lower: true,
      strict: true,    // remove caracteres especiais
      locale: 'pt',    // trata acentos do português
    })
  }
  return data
}
