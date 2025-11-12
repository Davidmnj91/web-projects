import { CaretLeftIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

import { BigButton } from '@/components/button/big-button'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

interface RootDestinationsLayoutProps {
  children: React.ReactNode
}

export default function RootDestinationsLayout({ children }: RootDestinationsLayoutProps) {
  const t = useTranslations('destinations-page')

  return (
    <>
      <div className='border-basics-disabled desktop:px-12 flex border-b px-6 py-2.5'>
        <Link href={'/destinations'} className='flex items-center gap-4'>
          <CaretLeftIcon size={32} weight='thin' />
          <Typography as='span' size='body-lg' color='europe-dark'>
            {t('back-to-destinations')}
          </Typography>
        </Link>
      </div>
      {children}
      <div className='desktop:py-14 flex justify-center'>
        <div className='bg-europe desktop:gap-9 desktop:p-14 flex flex-col gap-6 px-6 py-14'>
          <Typography as='h3' size='heading-2xl' color='basics-white'>
            {t('inspired.title')}
          </Typography>
          <Typography as='p' size='body-lg' color='basics-white'>
            {t.rich('inspired.description', defaultTranslationVales)}
          </Typography>
          <div className='desktop:flex-row desktop:gap-8 flex flex-col gap-6'>
            <BigButton subject={t('inspired.join')} caption={t('contact-us')} href={'/contact/individual'} />
            <BigButton subject={t('inspired.accommodations')} caption={t('see-more')} href={'/accommodations'} />
          </div>
        </div>
      </div>
    </>
  )
}
