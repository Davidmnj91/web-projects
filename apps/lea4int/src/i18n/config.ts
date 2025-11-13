export type Language = 'en' | 'es'

export interface LanguagePageProps<T = object> {
  params: Promise<
    {
      locale: Language
    } & T
  >
}

export const defaultLanguage: Language = 'en'
export const languages: Language[] = ['en', 'es']
