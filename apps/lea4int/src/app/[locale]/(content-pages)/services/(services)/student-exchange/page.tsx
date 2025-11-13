import { AirplaneTiltIcon, BankIcon, BedIcon, TaxiIcon, TrainIcon } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import exchange_bg from '../../../../../../../public/images/services/student-exchange/exchange_bg.webp'
import immersion_program_bg from '../../../../../../../public/images/services/student-exchange/immersion_program_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'

import { tagButtonTypes } from '@/components/button/button'
import { InformationCategories, MoreInfo } from '@/components/more-info/more-info'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { Services } from '@/types/services'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('services-page.services.student-exchange')

  const studentExchangeServices = Services['student-exchange']

  const sections = {
    'immersion-program': immersion_program_bg.src,
    'exchange-program': exchange_bg.src,
  }

  const services = {
    'round-trip': <AirplaneTiltIcon size={32} />,
    airport: <TaxiIcon size={32} />,
    'local-transport': <TrainIcon size={32} />,
    accommodation: <BedIcon size={32} />,
    cultural: <BankIcon size={32} />,
  }

  return (
    <div>
      <div className='desktop:py-24 flex items-center justify-center px-2.5 py-16'>
        <Typography as='h1' size='heading-2xl' color='europe-dark' className='text-center'>
          {t('title')}
        </Typography>
      </div>
      <div className='border-y-basics-disabled bg-basics-white desktop:justify-center desktop:overflow-hidden desktop:px-12 sticky top-[80px] z-20 flex items-center gap-6 overflow-auto border-y px-6 py-6'>
        {studentExchangeServices.map((service) => (
          <Link href={`#${service}`} scroll={true} key={service} className={tagButtonTypes()}>
            {t(`categories.${service}.title`)}
          </Link>
        ))}
      </div>
      {Object.entries(sections).map(([section, imgSrc], index) => (
        <section key={section} id={section}>
          <div className='desktop:gap-32 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 px-6 py-12'>
            <div className='flex flex-col items-center justify-center'>
              <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
                {t('overview')}
              </Typography>
              <Typography as='h2' size='heading-xl' color='europe-dark'>
                {t(`categories.${section}.title`)}
              </Typography>
            </div>
            <Typography as='p' size='body-lg' color='europe-dark' className='text-center'>
              {t.rich(`categories.${section}.description`, defaultTranslationVales)}
            </Typography>
          </div>
          <div className={clsx('flex', index % 2 !== 0 && 'flex-row-reverse')}>
            <div className='desktop:flex-[0_0_60%] desktop:gap-24 desktop:px-12 desktop:py-24 flex flex-auto flex-col gap-8 p-6'>
              <Typography as='h2' size='heading-xl' color='europe-dark'>
                {t(`categories.${section}.includes`)}
              </Typography>
              <ul className='flex flex-col gap-4'>
                {Object.entries(services).map(([title, icon]) => (
                  <li key={title} className='border-gold flex items-center border'>
                    <div className='border-r-gold border-r p-4'>{icon}</div>
                    <Typography as='p' size='body-lg' color='europe-dark' className='m-4'>
                      {t(`services.${title}`)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className='desktop:inline-block hidden flex-[0_0_40%] bg-cover bg-no-repeat'
              style={{
                backgroundImage: `url(${imgSrc})`,
              }}
            />
          </div>
        </section>
      ))}
      <section id='more-info'>
        <div className='desktop:py-14'>
          <MoreInfo informationCategories={[InformationCategories.MORE_INFO]} className='desktop:max-w-[576px]' />
        </div>
      </section>
    </div>
  )
}
