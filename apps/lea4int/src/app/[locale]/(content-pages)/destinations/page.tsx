import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import dublin_bg from '../../../../../public/images/destinations/dublin_bg.webp'
import ghent_bg from '../../../../../public/images/destinations/ghent_bg.webp'
import krakow_bg from '../../../../../public/images/destinations/krakow_bg.webp'
import madrid_bg from '../../../../../public/images/destinations/madrid_bg.webp'
import malaga_bg from '../../../../../public/images/destinations/malaga_bg.webp'
import prague_bg from '../../../../../public/images/destinations/prague_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'
import type { Route } from 'next'

import { AnimatedCard } from '@/components/destination-card/animated-card'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('destinations-page')

  const destinations = {
    prague: prague_bg.src,
    madrid: madrid_bg.src,
    malaga: malaga_bg.src,
    krakow: krakow_bg.src,
    dublin: dublin_bg.src,
    ghent: ghent_bg.src,
  }

  return (
    <div>
      <div className='bg-europe desktop:py-14 flex h-[410px] flex-col items-center gap-6 px-2.5 py-8 text-center'>
        <Typography as='h1' size='heading-2xl' color='basics-white'>
          {t('title')}
        </Typography>
        <Typography as='span' size='body-lg' color='basics-white' weight='light' className='text-center'>
          {t.rich('message', defaultTranslationVales)}
        </Typography>
      </div>
      <div className='desktop:mt-[-160px] desktop:overflow-hidden mt-[-160px] flex flex-wrap items-center justify-center gap-4 overflow-auto p-6'>
        {Object.entries(destinations).map(([destination, imgSrc]) => (
          <Link key={destination} href={`destinations/${destination}` as Route}>
            <AnimatedCard
              imgSrc={imgSrc}
              title={t(`destinations.${destination}.title`)}
              caption={t(`destinations.${destination}.country`)}
              containerClasses='w-[328px] h-[340px]'
              labelClasses='w-[174px] h-[192px]'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
