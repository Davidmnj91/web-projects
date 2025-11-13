import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

import dublin_bg from '../../../public/images/destinations/dublin_bg.webp'
import ghent_bg from '../../../public/images/destinations/ghent_bg.webp'
import krakow_bg from '../../../public/images/destinations/krakow_bg.webp'
import madrid_bg from '../../../public/images/destinations/madrid_bg.webp'
import malaga_bg from '../../../public/images/destinations/malaga_bg.webp'
import prague_bg from '../../../public/images/destinations/prague_bg.webp'

import type { Route } from 'next'

import { buttonTypes } from '@/components/button/button'
import { AnimatedCard } from '@/components/destination-card/animated-card'
import { Typography } from '@/components/typography/typography'
import { Destinations } from '@/types/destinations'

export const TopDestinations = ({ destinations }: { destinations: Destinations[] }) => {
  const t = useTranslations('top-destinations')

  const destinationsImages: Record<Destinations, string> = {
    [Destinations.PRAGUE]: prague_bg.src,
    [Destinations.MADRID]: madrid_bg.src,
    [Destinations.MALAGA]: malaga_bg.src,
    [Destinations.KRAKOW]: krakow_bg.src,
    [Destinations.DUBLIN]: dublin_bg.src,
    [Destinations.GHENT]: ghent_bg.src,
  }

  return (
    <>
      <div className='bg-europe desktop:mt-14 desktop:pt-14 flex h-[410px] flex-col items-center gap-6 px-2.5 pt-14'>
        <Typography as='h3' size='heading-2xl' color='basics-white' className='text-center'>
          {t('title')}
        </Typography>
        <div className='flex items-center justify-center'>
          <span className='border-b-europe-light desktop:w-[250px] w-[58px] border-b' />
          <Link href={'/destinations'} className={clsx('mx-4', buttonTypes({ intent: 'secondary-dark' }))}>
            {t('see-all')}
          </Link>
          <span className='border-b-europe-light desktop:w-[250px] w-[58px] border-b' />
        </div>
      </div>
      <div className='desktop:justify-center desktop:overflow-hidden mt-[-160px] flex items-center gap-4 overflow-auto px-6'>
        {Object.entries(destinationsImages)
          .filter(([destination, _]) => destinations.includes(destination as Destinations))
          .map(([destination, imgSrc]) => (
            <Link key={destination} href={`destinations/${destination}` as Route}>
              <AnimatedCard
                imgSrc={imgSrc}
                title={t(`destinations.${destination}.title`)}
                caption={t(`destinations.${destination}.country`)}
                containerClasses='w-[328px] h-[506px]'
                labelClasses='w-[174px] h-[192px]'
              />
            </Link>
          ))}
      </div>
    </>
  )
}
