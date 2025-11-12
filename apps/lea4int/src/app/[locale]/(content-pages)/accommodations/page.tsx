import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import airbnb_bg from '../../../../../public/images/accommodations/airbnb_bg.webp'
import apartment_bg from '../../../../../public/images/accommodations/apartment_bg.webp'
import host_family_bg from '../../../../../public/images/accommodations/host_family_bg.webp'
import hostel_bg from '../../../../../public/images/accommodations/hostel_bg.webp'
import hotel_bg from '../../../../../public/images/accommodations/hotel_bg.webp'
import student_residence_bg from '../../../../../public/images/accommodations/student_residence_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'

import { buttonTypes, tagButtonTypes } from '@/components/button/button'
import { BecomePartner } from '@/components/partners/become-partner'
import { TopDestinations } from '@/components/top-destinations/top-destinations'
import { Typography } from '@/components/typography/typography'
import { Destinations } from '@/types/destinations'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('accommodations-page')

  const accommodations = {
    apartment: apartment_bg.src,
    'student-residence': student_residence_bg.src,
    'host-family': host_family_bg.src,
    hotel: hotel_bg.src,
    hostel: hostel_bg.src,
    airbnb: airbnb_bg.src,
  }

  return (
    <div>
      <div className='desktop:py-24 flex items-center justify-center py-14'>
        <Typography as='h1' size='heading-2xl' color='europe-dark' className='desktop:text-left text-center'>
          {t('title')}
        </Typography>
      </div>
      <div className='border-y-basics-disabled bg-basics-white desktop:justify-center desktop:overflow-hidden desktop:px-12 sticky top-[80px] z-20 flex items-center gap-6 overflow-auto border-y px-6 py-6'>
        {Object.keys(accommodations).map((accommodation) => (
          <Link href={`#${accommodation}`} scroll={true} key={accommodation} className={tagButtonTypes()}>
            {t(`accommodations.${accommodation}.title`)}
          </Link>
        ))}
      </div>
      <div className='desktop:px-12 desktop:py-24 flex items-center justify-center p-6'>
        <Typography as='h2' size='body-lg' color='europe-dark' className='text-center'>
          {t('description')}
        </Typography>
      </div>
      {Object.entries(accommodations).map(([accommodation, imgSrc], index) => (
        <section key={accommodation} id={accommodation} className='scroll-mt-[164px]'>
          <div className='desktop:mb-14 mb-6 flex items-center justify-center'>
            <div className='bg-basics-gray desktop:max-w-[1200px] flex p-6'>
              <div
                className={clsx(
                  `border-europe desktop:h-[530px] desktop:w-[1150px] desktop:gap-[70px] flex flex-col-reverse items-center justify-center gap-6 border px-4 py-2.5`,
                  index % 2 === 0 ? 'desktop:flex-row' : 'desktop:flex-row-reverse',
                )}
              >
                <div
                  className={clsx(
                    'desktop:mb-0 desktop:h-[427px] desktop:w-[675px] h-[189px] w-full bg-contain bg-center bg-no-repeat',
                    index % 2 === 0 ? 'desktop:ml-[-100px]' : 'desktop:mr-[-100px]',
                  )}
                  style={{ backgroundImage: `url(${imgSrc})` }}
                />
                <div className='desktop:max-w-[474px] desktop:px-6 flex flex-col items-start justify-center gap-2.5'>
                  <Typography as='h3' size='heading-lg' color='europe' weight='bold'>
                    {t(`accommodations.${accommodation}.title`)}
                  </Typography>
                  <Typography as='p' size='body-lg' color='europe'>
                    {t(`accommodations.${accommodation}.description`)}
                  </Typography>
                  <Link href={'/contact/individual'} className={buttonTypes({ intent: 'primary' })}>
                    {t('contact-us')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section id='become-partner'>
        <BecomePartner />
      </section>
      <section id='top-destinations'>
        <div className='mb-16'>
          <TopDestinations destinations={[Destinations.PRAGUE, Destinations.MADRID, Destinations.MALAGA]} />
        </div>
      </section>
    </div>
  )
}
