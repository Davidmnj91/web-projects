import { EnvelopeIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr'
import { headers } from 'next/headers'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React, { use } from 'react'

import { tagButtonTypes } from '@/components/button/button'
import { Typography } from '@/components/typography/typography'
import { Contact } from '@/types/contact'

interface RootContactLayoutProps {
  children: React.ReactNode
}

const roles = ['individual', 'host-family', 'institutions', 'partner']

export default function RootDestinationsLayout({ children }: RootContactLayoutProps) {
  const t = useTranslations('contact-page')

  const heads = use(headers())
  const pathname = heads.get('next-url')?.split('/').pop()

  return (
    <div>
      <div className='desktop:my-24 desktop:gap-1.5 my-14 flex flex-col items-center justify-center gap-6'>
        <Typography as='h1' size='heading-2xl' color='europe-dark'>
          {t('title')}
        </Typography>
        <Typography as='p' size='body-lg' color='europe-dark' className='desktop:text-left text-center'>
          {t('message')}
        </Typography>
      </div>
      <div className='border-y-basics-disabled bg-basics-white desktop:overflow-hidden desktop:px-16 sticky top-[80px] z-20 flex flex-row items-center gap-6 overflow-auto border-y px-6 py-6'>
        <Typography as='span' size='body-lg' color='europe-dark' className='shrink-0'>
          {t('who-are-you')}
        </Typography>
        {roles.map((role) => (
          <Link
            href={`/contact/${role}`}
            key={role}
            className={tagButtonTypes({
              intent: role === pathname ? 'selected' : 'enabled',
            })}
          >
            {t(`roles.${role}`)}
          </Link>
        ))}
      </div>
      <div className='desktop:px-24 desktop:py-12 flex justify-center p-6'>{children}</div>
      <div className='desktop:pb-24 flex flex-col items-center justify-center gap-3 pt-8 pb-14'>
        <div className='flex items-center justify-center gap-6'>
          <EnvelopeIcon size={32} weight='thin' />
          <Typography as='a' size='body-lg' color='europe-dark' href={`mailto:${Contact.mail}`}>
            {Contact.mail}
          </Typography>
        </div>
        <div className='flex items-center justify-center gap-6'>
          <PhoneIcon size={32} weight='thin' />
          <Typography as='a' size='body-lg' color='europe-dark' href={`tel:${Contact.phone}`}>
            {Contact.phone}
          </Typography>
        </div>
      </div>
    </div>
  )
}
