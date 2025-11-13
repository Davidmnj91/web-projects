import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { typographyClasses } from '@/components/typography/typography'

interface MenuProps {
  itemClassNames?: string
}

export const Menu = ({ itemClassNames }: MenuProps) => {
  const t = useTranslations('pages')

  const pathname = usePathname()

  const isActive = (path: string) => {
    const coercedPathName = pathname.split('/')[2]
    return path === coercedPathName
  }

  const fullClassName = (path: string) =>
    clsx(
      typographyClasses({
        size: 'body-lg',
        color: isActive(path) ? 'gold' : 'basics-white',
      }),
      itemClassNames,
    )

  return (
    <>
      <Link className={fullClassName('services')} href={`/services`}>
        {t('services.main')}
      </Link>
      <Link className={fullClassName('about-us')} href={`/about-us`}>
        {t('about-us')}
      </Link>
      <Link className={fullClassName('destinations')} href={`/destinations`}>
        {t('destinations')}
      </Link>
      <Link className={fullClassName('accommodations')} href={`/accommodations`}>
        {t('accommodations')}
      </Link>
      <Link className={fullClassName('faq')} href={`/faq`}>
        {t('faq')}
      </Link>
      <Link className={fullClassName('blog')} href={`/blog`}>
        {t('blog')}
      </Link>
    </>
  )
}
