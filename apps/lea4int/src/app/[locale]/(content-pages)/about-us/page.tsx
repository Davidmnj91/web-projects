import {
  EyeIcon,
  GearIcon,
  HandHeartIcon,
  LeafIcon,
  PuzzlePieceIcon,
  SealCheckIcon,
  UsersFourIcon,
  UsersIcon,
} from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import lucia_bg from '../../../../../public/images/partners/lucia_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'

import { tagButtonTypes } from '@/components/button/button'
import { Partners } from '@/components/partners/partners'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('about-us-page')

  const values = {
    inclusion: <PuzzlePieceIcon size={54} weight='thin' />,
    diversity: <UsersFourIcon size={54} weight='thin' />,
    respect: <HandHeartIcon size={54} weight='thin' />,
    quality: <SealCheckIcon size={54} weight='thin' />,
    honesty: <EyeIcon size={54} weight='thin' />,
    innovation: <GearIcon size={54} weight='thin' />,
    sustainability: <LeafIcon size={54} weight='thin' />,
    collaboration: <UsersIcon size={54} weight='thin' />,
  }

  return (
    <div>
      <div className='desktop:py-24 flex items-center justify-center py-14'>
        <Typography as='h1' size='heading-2xl' color='europe-dark' className='desktop:text-left text-center'>
          {t('title')}
        </Typography>
      </div>
      <div className='desktop:flex-row desktop:p-24 flex flex-col items-center justify-center gap-14 p-6'>
        <div
          className='desktop:h-[346px] desktop:w-[422px] desktop:bg-cover relative flex h-[272px] w-full flex-col items-end bg-contain bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${lucia_bg.src}` }}
        >
          <span
            className={clsx(
              tagButtonTypes({ intent: 'selected' }),
              'desktop:left-auto desktop:right-12 desktop:ml-auto absolute left-1/2 mt-5 ml-10 grow-0 translate-x-1/2',
            )}
          >
            {t('role.director')}
          </span>
        </div>
        <svg className='desktop:inline-block hidden' width='2' height='569' viewBox='0 0 2 569' fill='none'>
          <path d='M1 0.234375L1.00002 528.234' stroke='#45586A' />
        </svg>
        <svg className='desktop:hidden' width='175' height='2' viewBox='0 0 175 2' fill='none'>
          <path d='M175 1L-2.29478e-06 0.999985' stroke='#45586A' />
        </svg>
        <div className='desktop:flex-[0_0_647px] desktop:items-start desktop:justify-center flex flex-col items-center gap-8'>
          <Typography as='p' size='body-lg' color='europe-dark'>
            {t.rich('description', defaultTranslationVales)}
          </Typography>
        </div>
      </div>
      <div className='bg-europe flex flex-col items-center gap-14 py-14'>
        <Typography as='h2' size='heading-2xl' color='basics-white'>
          {t('values.title')}
        </Typography>
        <div className='desktop:grid-cols-4 grid grid-cols-2 gap-6'>
          {Object.entries(values).map(([value, icon]) => (
            <div
              key={value}
              className='border-basics-white desktop:h-[200px] desktop:w-[200px] flex h-[140px] w-[140px] flex-col items-center justify-center gap-2.5 rounded-full border border-dashed'
            >
              <Typography as='span' size='heading-md' color='basics-white'>
                {t(`values.${value}`)}
              </Typography>
              <div className='text-gold'>{icon}</div>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-center py-20'>
          <Typography
            as='h3'
            size='heading-lg'
            color='basics-white'
            className='desktop:w-[850px] desktop:flex-row flex flex-col items-center text-center'
          >
            <Typography as='span' size='heading-4xl' color='gold-dark'>
              &ldquo;
            </Typography>
            <span className='desktop:w-[706px] w-[297px] capitalize'>{t.rich('quote', defaultTranslationVales)}</span>
            <Typography as='span' size='heading-4xl' color='gold-dark'>
              &rdquo;
            </Typography>
          </Typography>
        </div>
      </div>
      <div className='py-14'>
        <Partners />
      </div>
    </div>
  )
}
