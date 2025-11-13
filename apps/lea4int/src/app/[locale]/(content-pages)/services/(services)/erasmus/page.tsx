import { AirplaneIcon, BankIcon, FlowerLotusIcon, MonitorIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import erasmus_mundus_bg from '../../../../../../../public/images/services/erasmus/erasmus_mundus_bg.webp'
import job_shadowing_bg from '../../../../../../../public/images/services/erasmus/job_shadowing_bg.webp'
import ka_2_bg from '../../../../../../../public/images/services/erasmus/ka_2_bg.webp'
import school_exchange_bg from '../../../../../../../public/images/services/erasmus/school_exchange_bg.webp'
import we_offer_bg from '../../../../../../../public/images/services/erasmus/we_offer_bg.webp'
import work_experience_bg from '../../../../../../../public/images/services/erasmus/work_experience_bg.webp'

import type { LanguagePageProps } from '@/i18n/config'
import type { JSX } from 'react'

import { buttonTypes, tagButtonTypes } from '@/components/button/button'
import { BecomePartner } from '@/components/partners/become-partner'
import { ServiceItem } from '@/components/service-item/service-item'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { Services } from '@/types/services'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('services-page.services.erasmus')

  const erasmusServices = Services.erasmus
  const professions: Record<string, JSX.Element> = {
    IT: <MonitorIcon size={32} />,
    business: <BankIcon size={32} />,
    tourism: <AirplaneIcon size={32} />,
    beauty: <FlowerLotusIcon size={32} />,
  }
  return (
    <div>
      <div className='desktop:py-24 flex items-center justify-center px-2.5 py-16'>
        <Typography as='h1' size='heading-2xl' color='europe-dark' className='text-center'>
          {t('title')}
        </Typography>
      </div>
      <div className='border-y-basics-disabled bg-basics-white desktop:justify-center desktop:overflow-hidden desktop:px-12 sticky top-[80px] z-20 flex items-center gap-6 overflow-auto border-y px-6 py-6'>
        {erasmusServices.map((service) => (
          <Link href={`#${service}`} scroll={true} key={service} className={tagButtonTypes()}>
            {t(`categories.${service}.title`)}
          </Link>
        ))}
        <Link href={`#KA-2`} scroll={true} className={tagButtonTypes()}>
          {t(`categories.KA-2.title`)}
        </Link>
      </div>
      <section id='work-experience'>
        <div className='desktop:gap-28 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
          <div className='text-center'>
            <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
              {t('overview')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('categories.work-experience.title')}
            </Typography>
          </div>
          <Typography as='span' size='body-lg' color='europe-dark' className='text-center'>
            {t.rich('categories.work-experience.description', defaultTranslationVales)}
          </Typography>
        </div>
        <div className='desktop:h-[893px] desktop:flex-row flex flex-col'>
          <div
            className='desktop:h-full desktop:flex-[0_0_60%] relative h-[380px] bg-cover bg-center'
            style={{
              backgroundImage: `url(${work_experience_bg.src})`,
            }}
          >
            <div className='bg-europe desktop:left-auto desktop:right-[-90px] desktop:top-16 desktop:translate-x-0 desktop:translate-y-0 absolute top-[50%] left-[50%] flex h-[240px] w-[245px] flex-[0_0_40%] translate-x-[-50%] translate-y-[-50%] items-center justify-center p-6'>
              <div className='border-basics-white grow border p-2.5'>
                <Typography as='span' size='heading-lg' color='basics-white'>
                  {t.rich('categories.work-experience.with', defaultTranslationVales)}
                </Typography>
              </div>
            </div>
          </div>
          <div className='desktop:flex-[0_0_40%] desktop:px-12 desktop:text-left flex flex-col justify-end p-6 text-center'>
            <div className='bg-basics-white z-10'>
              <Typography as='p' size='body-lg' color='europe-dark'>
                {t.rich('categories.work-experience.message', defaultTranslationVales)}
              </Typography>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='desktop:flex-[0_0_60%] desktop:justify-between desktop:px-12 desktop:py-24 flex flex-col gap-8 p-6'>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('categories.work-experience.we-offer.title')}
            </Typography>
            <ul className='flex flex-col gap-4'>
              {Object.entries(professions).map(([title, icon]) => (
                <ServiceItem
                  key={title}
                  icon={icon}
                  title={t(`categories.work-experience.we-offer.${title}.title`)}
                  description={t.rich(
                    `categories.work-experience.we-offer.${title}.description`,
                    defaultTranslationVales,
                  )}
                />
              ))}
            </ul>
            <div>
              <Link href={'/contact/individual'} className={buttonTypes({ intent: 'primary' })}>
                {t('categories.work-experience.know-more')}
              </Link>
            </div>
          </div>
          <div
            className='desktop:block desktop:flex-[0_0_40%] hidden bg-cover bg-bottom bg-no-repeat'
            style={{
              backgroundImage: `url(${we_offer_bg.src})`,
            }}
          />
        </div>
      </section>
      <section id='job-shadowing'>
        <div className='desktop:gap-28 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
          <div className='text-center'>
            <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
              {t('overview')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('categories.job-shadowing.title')}
            </Typography>
          </div>
          <Typography as='span' size='body-lg' color='europe-dark' className='text-center'>
            {t.rich('categories.job-shadowing.description', defaultTranslationVales)}
          </Typography>
        </div>
        <div className='desktop:h-[1012px] desktop:flex-row flex flex-col'>
          <div
            className='desktop:h-full desktop:flex-[0_0_60%] relative h-[380px] bg-cover bg-center'
            style={{
              backgroundImage: `url(${job_shadowing_bg.src})`,
            }}
          >
            <div className='bg-europe desktop:left-auto desktop:right-[-90px] desktop:top-16 desktop:translate-x-0 desktop:translate-y-0 absolute top-[50%] left-[50%] flex h-[240px] w-[245px] flex-[0_0_40%] translate-x-[-50%] translate-y-[-50%] items-center justify-center p-6'>
              <div className='border-basics-white grow border p-2.5'>
                <Typography as='span' size='heading-lg' color='basics-white'>
                  {t.rich('categories.job-shadowing.with', defaultTranslationVales)}
                </Typography>
              </div>
            </div>
          </div>
          <div className='desktop:flex-[0_0_40%] desktop:px-12 desktop:text-left flex flex-col justify-end p-6 text-center'>
            <div className='bg-basics-white z-10'>
              <Typography as='p' size='body-lg' color='europe-dark'>
                {t.rich('categories.job-shadowing.message', defaultTranslationVales)}
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <section id='school-exchange'>
        <div className='desktop:gap-28 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
          <div className='text-center'>
            <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
              {t('overview')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('categories.school-exchange.title')}
            </Typography>
          </div>
          <Typography as='span' size='body-lg' color='europe-dark' className='text-center'>
            {t.rich('categories.school-exchange.description', defaultTranslationVales)}
          </Typography>
        </div>
        <div className='desktop:h-[782px] desktop:flex-row flex flex-col'>
          <div
            className='desktop:h-full desktop:flex-[0_0_60%] relative h-[380px] bg-cover bg-center'
            style={{
              backgroundImage: `url(${school_exchange_bg.src})`,
            }}
          >
            <div className='bg-europe desktop:left-auto desktop:right-[-90px] desktop:top-16 desktop:translate-x-0 desktop:translate-y-0 absolute top-[50%] left-[50%] flex h-[240px] w-[245px] flex-[0_0_40%] translate-x-[-50%] translate-y-[-50%] items-center justify-center p-6'>
              <div className='border-basics-white grow border p-2.5'>
                <Typography as='span' size='heading-lg' color='basics-white'>
                  {t.rich('categories.school-exchange.with', defaultTranslationVales)}
                </Typography>
              </div>
            </div>
          </div>
          <div className='desktop:flex-[0_0_40%] desktop:px-12 desktop:text-left flex flex-col justify-end p-6 text-center'>
            <div className='bg-basics-white z-10'>
              <Typography as='p' size='body-lg' color='europe-dark'>
                {t.rich('categories.school-exchange.message', defaultTranslationVales)}
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <section id='erasmus-mundus'>
        <div className='desktop:gap-28 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
          <div className='text-center'>
            <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
              {t('overview')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('categories.erasmus-mundus.title')}
            </Typography>
          </div>
          <Typography as='span' size='body-lg' color='europe-dark' className='text-center'>
            {t('categories.erasmus-mundus.description')}
          </Typography>
        </div>
        <div className='desktop:h-[698px] desktop:flex-row flex flex-col'>
          <div
            className='desktop:h-full desktop:flex-[0_0_60%] relative h-[380px] bg-cover bg-center'
            style={{
              backgroundImage: `url(${erasmus_mundus_bg.src})`,
            }}
          >
            <div className='bg-europe desktop:left-auto desktop:right-[-90px] desktop:top-16 desktop:translate-x-0 desktop:translate-y-0 absolute top-[50%] left-[50%] flex h-[240px] w-[245px] flex-[0_0_40%] translate-x-[-50%] translate-y-[-50%] items-center justify-center p-6'>
              <div className='border-basics-white grow border p-2.5'>
                <Typography as='span' size='heading-lg' color='basics-white'>
                  {t.rich('categories.erasmus-mundus.with', defaultTranslationVales)}
                </Typography>
              </div>
            </div>
          </div>
          <div className='desktop:flex-[0_0_40%] desktop:px-12 desktop:text-left flex flex-col justify-end p-6 text-center'>
            <div className='bg-basics-white z-10'>
              <Typography as='p' size='body-lg' color='europe-dark'>
                {t.rich('categories.erasmus-mundus.message', defaultTranslationVales)}
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <section id='KA-2'>
        <div className='desktop:gap-28 desktop:px-12 desktop:py-24 flex flex-col items-center justify-center gap-8 p-6'>
          <div className='text-center'>
            <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
              {t('overview')}
            </Typography>
            <Typography as='h2' size='heading-xl' color='europe-dark'>
              {t('categories.KA-2.title')}
            </Typography>
          </div>
          <Typography as='span' size='body-lg' color='europe-dark' className='text-center'>
            {t.rich('categories.KA-2.description', defaultTranslationVales)}
          </Typography>
          <div className='desktop:flex-row desktop:gap-16 mx-auto flex flex-col gap-8'>
            <div
              className='desktop:h-[478px] desktop:w-[275px] mx-auto h-[153px] w-[325px] bg-cover bg-no-repeat'
              style={{ backgroundImage: `url(${ka_2_bg.src})` }}
            />
            <div className='desktop:py-4 flex flex-col gap-8'>
              <div className='flex flex-col gap-6'>
                <Typography as='h3' size='heading-lg' color='europe-dark'>
                  {t('categories.KA-2.priority-topics.title')}
                </Typography>
                <ul>
                  <Typography as='span' size='body-lg' color='europe-dark'>
                    {t.rich('categories.KA-2.priority-topics.description', defaultTranslationVales)}
                  </Typography>
                </ul>
              </div>
              <div className='flex flex-col gap-6'>
                <Typography as='h3' size='heading-lg' color='europe-dark'>
                  {t('categories.KA-2.eligible.title')}
                </Typography>
                <ul>
                  <Typography as='span' size='body-lg' color='europe-dark'>
                    {t.rich('categories.KA-2.eligible.description', defaultTranslationVales)}
                  </Typography>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='become-partner'>
        <BecomePartner />
      </section>
    </div>
  )
}
