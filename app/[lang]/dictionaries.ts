import 'server-only'

// Define dictionary structure type
export interface Dictionary {
  [key: string]: string | Dictionary
}

// Define supported locales
export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

// Dictionary imports with type safety
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  console.log("🚀 ~ getDictionary ~ locale:", locale)
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    throw new Error(
      `Unsupported locale: ${locale}. Supported locales are: ${SUPPORTED_LOCALES.join(', ')}`
    )
  }

  return dictionaries[locale as Locale]()
}