import Link from 'next/link'
import { useTranslations } from 'next-intl'

import type { ServicesCategories } from '@/types/services'
import type { Route } from 'next'

import { AnimatedCard } from '@/components/destination-card/animated-card'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { servicesCardConfig } from '@/types/services'

interface OtherServicesProps {
  services: ServicesCategories[]
}
export const OtherServices = ({ services }: OtherServicesProps) => {
  const t = useTranslations('services-page.services')

  return (
    <>
      <div className='bg-europe desktop:py-14 desktop:text-left flex h-[410px] flex-col items-center gap-6 px-2.5 py-8 text-center'>
        <Typography as='h3' size='heading-2xl' color='basics-white'>
          {t('other-services.title')}
        </Typography>
        <Typography as='p' size='body-lg' color='basics-white' weight='light' className='text-center'>
          {t.rich('other-services.description', defaultTranslationVales)}
        </Typography>
      </div>
      <div className='desktop:justify-center desktop:overflow-hidden mt-[-160px] flex items-center gap-4 overflow-auto p-6'>
        {Object.entries(servicesCardConfig)
          .filter(([service, _]) => services.includes(service as ServicesCategories))
          .map(([service, imgSrc]) => (
            <Link key={service} href={service as Route}>
              <AnimatedCard
                imgSrc={imgSrc}
                title={t(`${service}.title`)}
                caption={t('see-more')}
                containerClasses='w-[328px] h-[506px]'
                labelClasses='w-[174px] h-[192px]'
              />
            </Link>
          ))}
      </div>
    </>
  )
}
