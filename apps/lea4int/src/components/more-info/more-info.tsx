import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import React from 'react'

import { BigButton } from '@/components/button/big-button'
import { Typography } from '@/components/typography/typography'

export enum InformationCategories {
  MORE_INFO = 'more-info',
  REQUEST_QUOTE = 'request-quote',
  HOST_FAMILIY = 'host-family',
}

const informationLinks = {
  [InformationCategories.MORE_INFO]: 'contact/individual',
  [InformationCategories.REQUEST_QUOTE]: 'contact/institutions',
  [InformationCategories.HOST_FAMILIY]: 'contact/host-family',
}

interface MoreInfoProps {
  informationCategories?: InformationCategories[]
  className?: string
}

export const MoreInfo = ({
  informationCategories = Object.values(InformationCategories) as InformationCategories[],
  className,
}: MoreInfoProps) => {
  const t = useTranslations('more-info')

  return (
    <div
      className={clsx(
        'bg-europe desktop:m-auto desktop:w-[1100px] desktop:p-14 flex w-full flex-col gap-9 px-6 py-14',
        className,
      )}
    >
      <Typography
        as='h3'
        color='basics-white'
        size='heading-2xl'
        className='desktop:text-left text-center'
        dangerouslySetInnerHTML={{
          __html: t.raw('title'),
        }}
      />
      <Typography
        as='p'
        size='body-lg'
        color='basics-white'
        weight='light'
        dangerouslySetInnerHTML={{
          __html: t.raw('questions'),
        }}
      />
      <div className='desktop:flex-row flex w-full flex-col justify-between gap-[30px]'>
        {Object.entries(informationCategories).map(([title, href]) => (
          <BigButton
            key={title}
            subject={t.raw(href) as string}
            caption={t('contact-us')}
            href={informationLinks[href]}
          />
        ))}
      </div>
    </div>
  )
}
