import { ArrowDownIcon, ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import dublin_1_bg from '../../../../../../public/images/destinations/dublin_1_bg.webp'
import dublin_2_bg from '../../../../../../public/images/destinations/dublin_2_bg.webp'
import dublin_bg from '../../../../../../public/images/destinations/dublin_bg.webp'
import ghent_1_bg from '../../../../../../public/images/destinations/ghent_1_bg.webp'
import ghent_2_bg from '../../../../../../public/images/destinations/ghent_2_bg.webp'
import ghent_bg from '../../../../../../public/images/destinations/ghent_bg.webp'
import krakow_1_bg from '../../../../../../public/images/destinations/krakow_1_bg.webp'
import krakow_2_bg from '../../../../../../public/images/destinations/krakow_2_bg.webp'
import krakow_bg from '../../../../../../public/images/destinations/krakow_bg.webp'
import madrid_1_bg from '../../../../../../public/images/destinations/madrid_1_bg.webp'
import madrid_2_bg from '../../../../../../public/images/destinations/madrid_2_bg.webp'
import madrid_bg from '../../../../../../public/images/destinations/madrid_bg.webp'
import malaga_1_bg from '../../../../../../public/images/destinations/malaga_1_bg.webp'
import malaga_2_bg from '../../../../../../public/images/destinations/malaga_2_bg.webp'
import malaga_bg from '../../../../../../public/images/destinations/malaga_bg.webp'
import prague_1_bg from '../../../../../../public/images/destinations/prague_1_bg.webp'
import prague_2_bg from '../../../../../../public/images/destinations/prague_2_bg.webp'
import prague_main_bg from '../../../../../../public/images/destinations/prague_main_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'
import type { AvailableServices } from '@/types/destinations'
import type { Route } from 'next'
import type { JSX } from 'react'

import { buttonTypes } from '@/components/button/button'
import { EuropeMapDublin } from '@/components/maps/dublin.svg'
import { EuropeMapGhent } from '@/components/maps/ghent.svg'
import { EuropeMapKrakow } from '@/components/maps/krakow.svg'
import { EuropeMapMadrid } from '@/components/maps/madrid.svg'
import { EuropeMapMalaga } from '@/components/maps/malaga.svg'
import { EuropeMapPrague } from '@/components/maps/prague.svg'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { Destinations } from '@/types/destinations'

export const dynamicParams = false

interface DestinationPageDetails {
  name: string
  mainImageSrc: string
  mapComponent: JSX.Element
  sampleImages: [string, string]
  servicesAvailable: [AvailableServices, string][]
}
const iconClassNames = 'h-[310px] w-[375px] desktop:h-[500px] desktop:w-[605px]'
const destinationsProps: Record<Destinations, DestinationPageDetails> = {
  [Destinations.PRAGUE]: {
    name: 'prague',
    mainImageSrc: prague_main_bg.src,
    mapComponent: <EuropeMapPrague className={iconClassNames} />,
    sampleImages: [prague_1_bg.src, prague_2_bg.src],
    servicesAvailable: [
      ['work-experience', '/services/erasmus#work-experience'],
      ['job-shadowing', '/services/erasmus#job-shadowing'],
      ['language-courses', '/services/language-courses'],
      ['concierge', '/services/concierge'],
    ],
  },
  [Destinations.MADRID]: {
    name: 'madrid',
    mainImageSrc: madrid_bg.src,
    mapComponent: <EuropeMapMadrid className={iconClassNames} />,
    sampleImages: [madrid_1_bg.src, madrid_2_bg.src],
    servicesAvailable: [
      ['work-experience', '/services/erasmus#work-experience'],
      ['job-shadowing', '/services/erasmus#job-shadowing'],
      ['language-courses', '/services/language-courses'],
      ['student-exchange', '/services/student-exchange'],
      ['concierge', '/services/concierge'],
    ],
  },
  [Destinations.MALAGA]: {
    name: 'malaga',
    mainImageSrc: malaga_bg.src,
    mapComponent: <EuropeMapMalaga className={iconClassNames} />,
    sampleImages: [malaga_1_bg.src, malaga_2_bg.src],
    servicesAvailable: [
      ['work-experience', '/services/erasmus#work-experience'],
      ['job-shadowing', '/services/erasmus#job-shadowing'],
      ['language-courses', '/services/language-courses'],
      ['student-exchange', '/services/student-exchange'],
      ['concierge', '/services/concierge'],
    ],
  },
  [Destinations.KRAKOW]: {
    name: 'krakow',
    mainImageSrc: krakow_bg.src,
    mapComponent: <EuropeMapKrakow className={iconClassNames} />,
    sampleImages: [krakow_1_bg.src, krakow_2_bg.src],
    servicesAvailable: [
      ['work-experience', '/services/erasmus#work-experience'],
      ['job-shadowing', '/services/erasmus#job-shadowing'],
    ],
  },
  [Destinations.DUBLIN]: {
    name: 'dublin',
    mainImageSrc: dublin_bg.src,
    mapComponent: <EuropeMapDublin className={iconClassNames} />,
    sampleImages: [dublin_1_bg.src, dublin_2_bg.src],
    servicesAvailable: [
      ['work-experience', '/services/erasmus#work-experience'],
      ['job-shadowing', '/services/erasmus#job-shadowing'],
      ['language-courses', '/services/language-courses'],
    ],
  },
  [Destinations.GHENT]: {
    name: 'ghent',
    mainImageSrc: ghent_bg.src,
    mapComponent: <EuropeMapGhent className={iconClassNames} />,
    sampleImages: [ghent_1_bg.src, ghent_2_bg.src],
    servicesAvailable: [
      ['work-experience', '/services/erasmus#work-experience'],
      ['job-shadowing', '/services/erasmus#job-shadowing'],
    ],
  },
}

export function generateStaticParams() {
  return Object.values(Destinations).map((destination) => ({
    destination,
  }))
}

export default function Page(props: LanguagePageProps<{ destination: Destinations }>) {
  const params = use(props.params)

  const { locale, destination } = params

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!destinationsProps[destination]) {
    notFound()
  }

  const { name, mainImageSrc, sampleImages, servicesAvailable, mapComponent } = destinationsProps[destination]

  setRequestLocale(locale)

  const t = useTranslations(`destinations-page.destinations.${name}`)
  const tServices = useTranslations('destinations-page.services')

  return (
    <div>
      <div
        className='desktop:h-[716px] flex h-[545px] w-full items-center justify-center bg-cover bg-center'
        style={{
          backgroundImage: `url(${mainImageSrc}), linear-gradient(#0308227F,#0308227F)`,
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className='flex flex-col items-center justify-center gap-8'>
          <Typography as='h1' size='heading-4xl' color='basics-white'>
            {t('title')}
          </Typography>
          <div className='flex items-center gap-4'>
            <span className='border-b-europe-light desktop:w-[250px] w-[116px] border-b' />
            <ArrowDownIcon className='text-gold' size={32} />
            <span className='border-b-europe-light desktop:w-[250px] w-[116px] border-b' />
          </div>
        </div>
      </div>
      <div className='desktop:flex-row desktop:px-12 desktop:py-16 flex flex-col items-center justify-between'>
        <div className='desktop:gap-16 desktop:p-0 flex max-w-[614px] flex-col gap-8 p-6'>
          <div className='gap-1 text-center'>
            <Typography as='span' size='heading-sm' color='gold-dark'>
              {t('destinations')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('choose')}
            </Typography>
          </div>
          <Typography as='p' size='body-lg' color='europe-dark'>
            {t.rich('reason', defaultTranslationVales)}
          </Typography>
        </div>
        {mapComponent}
      </div>
      <div className='desktop:px-12 flex flex-col gap-2.5 py-6'>
        <div className='desktop:justify-between desktop:p-0 flex items-center justify-center gap-20 pt-2 pb-6'>
          <span className='border-b-europe desktop:inline hidden h-1 grow border-b' />
          <Typography as='h2' size='heading-xl' color='europe-dark' className='desktop:text-left text-center'>
            {t('know')}
          </Typography>
        </div>
        <div className='desktop:flex-row desktop:gap-12 desktop:px-0 flex flex-col gap-4 px-8'>
          <div className='h-[402px] grow'>
            <Image
              src={sampleImages[0]}
              alt={`${destination}_1`}
              width={650}
              height={402}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className='h-[402px] grow'>
            <Image
              src={sampleImages[1]}
              alt={`${destination}_2`}
              width={650}
              height={402}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
      <div className='desktop:mt-16 flex flex-col'>
        <Typography as='h2' size='heading-xl' color='europe-dark' className='desktop:px-12 px-6 py-6'>
          {tServices('title', { city: t('title') })}
        </Typography>
        <ul className='desktop:px-12'>
          {servicesAvailable.map(([service, href]) => (
            <li
              key={service}
              className='border-basics-disabled desktop:px-0 desktop:py-6 flex items-center justify-between border-t-0 border-b-2 p-6 first-of-type:border-t-2'
            >
              <Typography as='h3' size='heading-lg' color='europe-dark'>
                {tServices(`${service}`)}
              </Typography>
              <Link
                href={href as Route}
                className={clsx(buttonTypes({ intent: 'secondary-light' }), 'desktop:inline-block hidden')}
              >
                {tServices(`see-more`)}
              </Link>
              <ArrowRightIcon className='desktop:hidden' size={32} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
