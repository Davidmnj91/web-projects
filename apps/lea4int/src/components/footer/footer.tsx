'use client'

import { EnvelopeIcon, PhoneIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

import erasmus_quality_standards from '../../../public/images/erasmus_quality_standards.webp'

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/icons/social-icons'
import LocaleSwitcher from '@/components/locale-switcher/locale-switcher'
import { FullLogo, Logo } from '@/components/logo/fullLogo.svg'
import { Menu } from '@/components/menu/menu'
import { Typography } from '@/components/typography/typography'
import { Contact } from '@/types/contact'

const MobileFooter = () => {
  const t = useTranslations('footer')

  return (
    <footer className='bg-europe flex flex-col items-center justify-center gap-11 px-4 py-10'>
      <FullLogo width={129} height={50} />
      <div className='flex flex-col items-center justify-center gap-4'>
        <LocaleSwitcher />
        <Menu />
      </div>
      <Image unoptimized src={erasmus_quality_standards.src} alt='eramus_quality_standards' width={125} height={125} />
      <div className='flex w-full flex-col items-center justify-center gap-2'>
        <div className='text-basics-white flex items-center gap-6'>
          <EnvelopeIcon size={32} weight='thin' />
          <Typography as='a' size='body-md' color='basics-white' href={`mailto:${Contact.mail}`}>
            {Contact.mail}
          </Typography>
        </div>
        <div className='text-basics-white flex items-center gap-6'>
          <PhoneIcon size={32} weight='thin' />
          <Typography as='a' size='body-md' color='basics-white' href={`tel:${Contact.phone}`}>
            {Contact.phone}
          </Typography>
        </div>
      </div>
      <div className='text-basics-white flex gap-4'>
        <Typography as='span' size='body-md' color='basics-white'>
          {t('follow-us')}
        </Typography>
        <Link aria-label='lea4int instagram' href={Contact.instagram} target='_blank'>
          <InstagramIcon size={24} />
        </Link>
        <Link aria-label='lea4int linkedin' href={Contact.linkedin} target='_blank'>
          <LinkedinIcon size={24} />
        </Link>
        <Link aria-label='lea4int facebook' href={Contact.facebook} target='_blank'>
          <FacebookIcon size={24} />
        </Link>
        <Link aria-label='lea4int youtube' href={Contact.youtube} target='_blank'>
          <YoutubeIcon size={24} />
        </Link>
      </div>
      <div className='flex w-full items-center justify-between gap-6'>
        <span className='border-b-gold-dark h-1 w-[250px] flex-1 border-b' />
        <Logo width={60} height={46} />
        <span className='border-b-gold-dark h-1 w-[250px] flex-1 border-b' />
      </div>
      <div className='flex flex-col items-center justify-center gap-6'>
        <Typography as='span' size='body-sm' color='basics-white'>
          {t('copyright')}
        </Typography>
        <Link aria-label='privacy policy' href={'/privacy-policy'} target={'_blank'}>
          <Typography as='span' size='body-sm' color='basics-white' className='underline'>
            {t('privacy-policy')}
          </Typography>
        </Link>
      </div>
    </footer>
  )
}

const DesktopFooter = () => {
  const t = useTranslations('footer')

  return (
    <footer className='bg-europe flex flex-col gap-11 p-10'>
      <div className='flex w-full justify-between gap-11'>
        <div className='flex flex-col justify-between gap-12'>
          <FullLogo width={129} height={50} />
          <div className='flex flex-col gap-2'>
            <div className='text-basics-white flex items-center gap-6'>
              <EnvelopeIcon size={32} weight='thin' />
              <Typography as='a' size='body-md' color='basics-white' href={`mailto:${Contact.mail}`}>
                {Contact.mail}
              </Typography>
            </div>
            <div className='text-basics-white flex items-center gap-6'>
              <PhoneIcon size={32} weight='thin' />
              <Typography as='a' size='body-md' color='basics-white' href={`tel:${Contact.phone}`}>
                {Contact.phone}
              </Typography>
            </div>
          </div>
          <Image
            unoptimized
            src={erasmus_quality_standards.src}
            alt='eramus_quality_standards'
            width={125}
            height={125}
          />
          <div className='text-basics-white flex gap-4'>
            <Typography as='span' size='body-md' color='basics-white'>
              {t('follow-us')}
            </Typography>
            <Link aria-label='lea4int instagram' href={Contact.instagram} target='_blank'>
              <InstagramIcon size={24} />
            </Link>
            <Link aria-label='lea4int linkedin' href={Contact.linkedin} target='_blank'>
              <LinkedinIcon size={24} />
            </Link>
            <Link aria-label='lea4int facebook' href={Contact.facebook} target='_blank'>
              <FacebookIcon size={24} />
            </Link>
            <Link aria-label='lea4int youtube' href={Contact.youtube} target='_blank'>
              <YoutubeIcon size={24} />
            </Link>
          </div>
        </div>
        <div className='flex flex-col items-end justify-between gap-4'>
          <LocaleSwitcher />
          <nav className='flex h-full flex-col justify-center gap-4'>
            <Menu itemClassNames='text-right' />
          </nav>
        </div>
      </div>
      <div className='flex w-full items-center justify-between gap-6'>
        <span className='border-b-gold-dark h-1 w-[250px] flex-1 border-b' />
        <Logo width={60} height={46} />
        <span className='border-b-gold-dark h-1 w-[250px] flex-1 border-b' />
      </div>
      <div className='flex w-full flex-col'>
        <Typography as='span' size='body-sm' color='basics-white'>
          {t('copyright')}
        </Typography>
        <Link aria-label='privacy policy' href={'/privacy-policy'} target={'_blank'}>
          <Typography as='span' size='body-sm' color='basics-white' className='underline'>
            {t('privacy-policy')}
          </Typography>
        </Link>
      </div>
    </footer>
  )
}

export const Footer = () => (
  <>
    <div className='desktop:hidden'>
      <MobileFooter />
    </div>
    <div className='desktop:block hidden'>
      <DesktopFooter />
    </div>
  </>
)
