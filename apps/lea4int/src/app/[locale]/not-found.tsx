import { useTranslations } from 'next-intl'

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations('pages')

  return <h1>{t('404')}</h1>
}
