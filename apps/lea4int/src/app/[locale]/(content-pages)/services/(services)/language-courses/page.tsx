import {
  ChartLineIcon,
  ChatsIcon,
  CubeFocusIcon,
  DetectiveIcon,
  GlobeSimpleIcon,
  HardDrivesIcon,
  KanbanIcon,
  LifebuoyIcon,
  MagnifyingGlassPlusIcon,
  PersonIcon,
  RobotIcon,
  UserFocusIcon,
} from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import business_development_bg from '../../../../../../../public/images/services/language-courses/business_development_bg.webp'
import business_english_courses_bg from '../../../../../../../public/images/services/language-courses/business_english_courses_bg.webp'
import business_ia_bg from '../../../../../../../public/images/services/language-courses/business_ia_bg.webp'
import business_spanish_courses_bg from '../../../../../../../public/images/services/language-courses/business_spanish_courses_bg.webp'
import data_mining_bg from '../../../../../../../public/images/services/language-courses/data_mining_bg.webp'
import english_courses_bg from '../../../../../../../public/images/services/language-courses/english_courses_bg.webp'
import machine_learning_bg from '../../../../../../../public/images/services/language-courses/machine_learning_bg.webp'
import spanish_courses_bg from '../../../../../../../public/images/services/language-courses/spanish_courses_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'
import type { JSX } from 'react'

import { tagButtonTypes } from '@/components/button/button'
import { InformationCategories, MoreInfo } from '@/components/more-info/more-info'
import { ServiceItem } from '@/components/service-item/service-item'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { Services } from '@/types/services'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('services-page.services.language-courses')

  const languageCoursesServices = Services['language-courses']

  const sections = {
    'english-courses': english_courses_bg.src,
    'business-english-courses': business_english_courses_bg.src,
    'spanish-courses': spanish_courses_bg.src,
    'business-spanish-courses': business_spanish_courses_bg.src,
  }

  const iaSections = {
    'machine-learning': machine_learning_bg.src,
    'data-mining': data_mining_bg.src,
  }

  const courses: Record<string, JSX.Element> = {
    focus: <CubeFocusIcon size={32} />,
    help: <LifebuoyIcon size={32} />,
    details: <MagnifyingGlassPlusIcon size={32} />,
  }

  const iaResources: Record<string, JSX.Element> = {
    automation: <RobotIcon size={32} />,
    'data-analysis': <HardDrivesIcon size={32} />,
    'customer-service': <ChatsIcon size={32} />,
    'predictive-analytics': <ChartLineIcon size={32} />,
    personalization: <UserFocusIcon size={32} />,
    'supply-chain': <KanbanIcon size={32} />,
    'fraud-detection': <DetectiveIcon size={32} />,
    'human-resources': <PersonIcon size={32} />,
    'decision-support': <LifebuoyIcon size={32} />,
    nlp: <GlobeSimpleIcon size={32} />,
  }

  return (
    <div>
      <div className='desktop:py-24 flex items-center justify-center px-2.5 py-16'>
        <Typography as='h1' size='heading-2xl' color='europe-dark' className='text-center'>
          {t('title')}
        </Typography>
      </div>
      <div className='border-y-basics-disabled bg-basics-white desktop:justify-center desktop:overflow-hidden desktop:px-12 sticky top-[80px] z-20 flex items-center gap-6 overflow-auto border-y px-6 py-6'>
        {languageCoursesServices.map((service) => (
          <Link href={`#${service}`} scroll={true} key={service} className={tagButtonTypes()}>
            {t(`categories.${service}.title`)}
          </Link>
        ))}
      </div>
      <div className='desktop:gap-32 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
        <div className='flex flex-col items-center justify-center'>
          <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
            {t('overview')}
          </Typography>
          <Typography as='h2' size='heading-xl' color='europe-dark'>
            {t('sub-title')}
          </Typography>
        </div>
        <Typography as='p' size='body-lg' color='europe-dark' className='text-center'>
          {t('description')}
        </Typography>
      </div>
      {Object.entries(sections).map(([section, imgSrc], index) => (
        <section key={section} id={section}>
          <div className={clsx('flex', index % 2 !== 0 && 'flex-row-reverse')}>
            <div className='desktop:flex-[0_0_60%] desktop:gap-14 desktop:px-12 desktop:py-24 flex flex-auto flex-col gap-8 p-6'>
              <Typography as='h2' size='heading-xl' color='europe-dark'>
                {t(`categories.${section}.title`)}
              </Typography>
              <Typography as='p' size='body-lg' color='europe-dark'>
                {t.rich(`categories.${section}.description`, defaultTranslationVales)}
              </Typography>
              <div className='flex flex-col gap-4'>
                {Object.entries(courses).map(([title, icon]) => (
                  <ServiceItem
                    key={title}
                    icon={icon}
                    title={t.rich(`categories.${section}.we-offer.${title}.title`, defaultTranslationVales)}
                    description={t.rich(`categories.${section}.we-offer.${title}.description`, defaultTranslationVales)}
                  />
                ))}
              </div>
            </div>
            <div
              className='desktop:inline-block desktop:flex-[0_0_40%] hidden bg-cover bg-no-repeat'
              style={{
                backgroundImage: `url(${imgSrc})`,
              }}
            />
          </div>
        </section>
      ))}
      <section id='ai-trainings'>
        <div className='desktop:gap-32 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
          <div className='flex flex-col items-center justify-center'>
            <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
              {t('overview')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t(`categories.ai-trainings.title`)}
            </Typography>
          </div>
          <Typography as='p' size='body-lg' color='europe-dark' className='text-center'>
            {t.rich(`categories.ai-trainings.description`, defaultTranslationVales)}
          </Typography>
        </div>
      </section>
      {Object.entries(iaSections).map(([section, imgSrc], index) => (
        <section key={section} id={section}>
          <div className={clsx('flex', index % 2 !== 0 && 'flex-row-reverse')}>
            <div className='desktop:flex-[0_0_60%] desktop:gap-14 desktop:px-12 desktop:py-24 flex flex-auto flex-col gap-8 p-6'>
              <Typography as='h2' size='heading-xl' color='europe-dark'>
                {t(`categories.${section}.title`)}
              </Typography>
              <Typography as='p' size='body-lg' color='europe-dark'>
                {t.rich(`categories.${section}.description`, defaultTranslationVales)}
              </Typography>
            </div>
            <div
              className='desktop:inline-block desktop:flex-[0_0_40%] hidden bg-cover bg-no-repeat'
              style={{
                backgroundImage: `url(${imgSrc})`,
              }}
            />
          </div>
        </section>
      ))}
      <section id='business-ia'>
        <div className='flex'>
          <div className='desktop:flex-[0_0_60%] desktop:gap-14 desktop:px-12 desktop:py-24 flex flex-auto flex-col gap-8 p-6'>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('categories.business-ia.title')}
            </Typography>
            <Typography as='p' size='body-lg' color='europe-dark'>
              {t.rich('categories.business-ia.description', defaultTranslationVales)}
            </Typography>
            <div className='flex flex-col gap-4'>
              {Object.entries(iaResources).map(([title, icon]) => (
                <ServiceItem
                  key={title}
                  icon={icon}
                  description={t.rich(`categories.business-ia.we-offer.${title}`, defaultTranslationVales)}
                  mobileDirection='HORIZONTAL'
                />
              ))}
            </div>
            <Typography as='p' size='body-lg' color='europe-dark'>
              {t.rich('categories.business-ia.sub-description', defaultTranslationVales)}
            </Typography>
          </div>
          <div
            className='desktop:inline-block desktop:flex-[0_0_40%] hidden bg-cover bg-no-repeat'
            style={{
              backgroundImage: `url(${business_ia_bg.src})`,
            }}
          />
        </div>
      </section>
      <section id='business-development'>
        <div className='desktop:gap-32 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
          <div className='flex flex-col items-center justify-center'>
            <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
              {t('overview')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t(`categories.business-development.title`)}
            </Typography>
          </div>
          <Typography as='p' size='body-lg' color='europe-dark' className='text-center'>
            {t.rich(`categories.business-development.description`, defaultTranslationVales)}
          </Typography>
        </div>
        <Image
          src={business_development_bg.src}
          alt='BusinessDevelopment'
          height={401}
          width={1440}
          style={{ width: '100%' }}
        />
      </section>
      <section id='more-info'>
        <div className='desktop:py-14'>
          <MoreInfo informationCategories={[InformationCategories.MORE_INFO]} className='desktop:max-w-[576px]' />
        </div>
      </section>
    </div>
  )
}
