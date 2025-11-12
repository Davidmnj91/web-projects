import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import not_found from '../../../../public/images/not_found.webp'

import type { Route } from 'next'

import { buttonTypes } from '@/components/button/button'

export default function CatchAllPage() {
  const t = useTranslations('not-found-page')

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div>
        <Image src={not_found.src} alt='404' width={750} height={532} />
        <Link href={'/' as Route} className={buttonTypes({ intent: 'primary' })}>
          {t('back-to-home')}
        </Link>
      </div>
    </div>
  )
}
