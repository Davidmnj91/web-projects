import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import type { LanguagePageProps } from '@/i18n/config'

import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('privacy-policy-page')

  return (
    <div className='desktop:px-12 desktop:py-24 p-6'>
      <Typography size='body-md' color='europe-dark'>
        {t.rich('content', defaultTranslationVales)}
      </Typography>
    </div>
  )
}
