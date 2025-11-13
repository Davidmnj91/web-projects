import {
  FirstAidKitIcon,
  GlobeIcon,
  MapPinIcon,
  MapTrifoldIcon,
  TaxiIcon,
  TicketIcon,
  TranslateIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import concierge_services_bg from '../../../../../../../public/images/services/concierge/concierge_services_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'

import { InformationCategories, MoreInfo } from '@/components/more-info/more-info'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('services-page.services.concierge')

  const services = {
    'meeting-greeting': <MapPinIcon size={32} />,
    'airport-transfer': <TaxiIcon size={32} />,
    'local-transport': <TicketIcon size={32} />,
    'immigration-services': <GlobeIcon size={32} />,
    'city-tour': <MapTrifoldIcon size={32} />,
    'emergency-support': <FirstAidKitIcon size={32} />,
    'language-support': <TranslateIcon size={32} />,
  }

  return (
    <div>
      <div className='desktop:gap-28 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
        <Typography as='h1' size='heading-2xl' color='europe-dark' className='desktop:text-left text-center'>
          {t('title')}
        </Typography>
        <Typography as='p' size='body-lg' color='europe-dark' className='text-center'>
          {t.rich('description', defaultTranslationVales)}
        </Typography>
      </div>
      <div className='desktop:flex-row flex flex-col-reverse'>
        <div className='desktop:flex-[0_0_60%] desktop:justify-between desktop:px-12 desktop:py-24 flex flex-col gap-8 p-6'>
          <Typography as='h2' size='heading-xl' color='europe-dark'>
            {t(`includes`)}
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
          className='desktop:h-[858px] desktop:flex-[0_0_40%] h-[283px] w-full bg-contain bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${concierge_services_bg.src})`,
          }}
        />
      </div>
      <section id='more-info'>
        <div className='desktop:py-14'>
          <MoreInfo informationCategories={[InformationCategories.MORE_INFO]} className='desktop:max-w-[576px]' />
        </div>
      </section>
    </div>
  )
}
