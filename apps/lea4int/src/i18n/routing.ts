import { defineRouting } from 'next-intl/routing'

import { defaultLanguage, languages } from '@/i18n/config'

export const routing = defineRouting({
  locales: languages,
  defaultLocale: defaultLanguage,
  localeCookie: {
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365,
  },
})
