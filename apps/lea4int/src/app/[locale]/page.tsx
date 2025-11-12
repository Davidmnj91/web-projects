'use client'

import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React, { Fragment, useCallback, useRef, useState } from 'react'

import our_beliefs_bg from '../../../public/images/home/our_beliefs_bg.webp'
import our_commitment_bg from '../../../public/images/home/our_commitment_bg.webp'
import who_we_are_bg from '../../../public/images/home/who_we_are_bg.webp'
import main_bg from '../../../public/images/main_bg.webp'

import type { Faqs } from '@/types/faq'
import type { Subset } from '@/types/types'
import type { Variants } from 'framer-motion'

import { buttonTypes, tagButtonTypes } from '@/components/button/button'
import { CommitmentsCarousel } from '@/components/commitments-carousel/commitments-carousel'
import { FaqList } from '@/components/faq-list/faq-list'
import { MobileMenu } from '@/components/header/header'
import LocaleSwitcher from '@/components/locale-switcher/locale-switcher'
import { FullLogo } from '@/components/logo/fullLogo.svg'
import { Menu } from '@/components/menu/menu'
import { MoreInfo } from '@/components/more-info/more-info'
import { Partners } from '@/components/partners/partners'
import { TopDestinations } from '@/components/top-destinations/top-destinations'
import { Typography } from '@/components/typography/typography'
import { defaultTranslationVales } from '@/i18n/translation-values'
import { Contact } from '@/types/contact'
import { Destinations } from '@/types/destinations'
import { FAQCategories } from '@/types/faq'

const FaqsHome: Subset<typeof Faqs> = {
  [FAQCategories.erasmus]: ['what-is-erasmus-plus', 'how-to-erasmus-plus', 'why-erasmus-plus'],
  [FAQCategories.languageCourses]: ['language-courses-offer'],
  [FAQCategories.concierge]: ['what-included'],
}

export default function HomePage() {
  const t = useTranslations('home-page')

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [menuOpen, setMenuOpen] = useState(false)

  const headerVariants: Variants = {
    transparent: {
      backgroundColor: '#2E3B4800',
      transition: { duration: 0.3, ease: ['easeIn'] },
    },
    opaque: {
      backgroundColor: '#2E3B48',
      transition: { duration: 0.3, ease: ['easeOut'] },
    },
  }

  const handleMenuOpen = useCallback(
    (open: boolean) => {
      if (menuOpen !== open && ref.current) {
        setMenuOpen(open)
        document.body.style.overflow = open ? 'hidden' : 'auto'
      }
    },
    [menuOpen],
  )

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={inView && !menuOpen ? 'transparent' : 'opaque'}
        className='desktop:p-10 sticky top-0 z-50 flex h-[80px] items-center justify-between px-6 py-2.5'
      >
        <FullLogo width={129} height={50} />
        <div className='desktop:hidden'>
          <MobileMenu onStateChange={handleMenuOpen} />
        </div>
        <nav className='desktop:flex hidden items-center gap-[70px]'>
          <Menu />
          <LocaleSwitcher />
        </nav>
      </motion.header>
      <main>
        <div
          ref={ref}
          style={{
            position: 'absolute',
            height: '100dvh',
            width: '100%',
            zIndex: '-1',
            backgroundImage: `url(${main_bg.src}), linear-gradient(#0308227F,#0308227F)`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className='m-auto mt-[-80px] flex h-screen w-full flex-col items-center justify-center'>
          <div>
            <Typography as='h1' size='heading-4xl' color='basics-disabled' className='text-center'>
              {t('language')}
            </Typography>
            <Typography as='h1' size='heading-4xl' color='basics-disabled' className='text-center'>
              {t('education')}
            </Typography>
            <Typography as='h1' size='heading-4xl' color='basics-disabled' className='text-center'>
              {t('travel')}
            </Typography>
          </div>
          <div className='mt-[36px]'>
            <Typography
              as='h2'
              size='body-md'
              color='basics-white'
              className='desktop:max-w-[840px] max-w-[336px] text-center'
            >
              {t.rich('slogan', defaultTranslationVales)}
            </Typography>
          </div>
          <Link href={'/contact/individual'} className={clsx('mt-[60px]', buttonTypes({ intent: 'primary' }))}>
            {t('request-more-info')}
          </Link>
        </div>
        <section id='who-we-are'>
          <div
            className='desktop:mt-14 w-full bg-cover bg-center'
            style={{
              backgroundImage: `url(${who_we_are_bg.src})`,
            }}
          >
            <div className='desktop:flex-row flex w-full flex-col justify-center'>
              <div className='bg-star-light desktop:mt-[-28px] desktop:h-[550px] desktop:max-w-[416px] desktop:gap-0 flex flex-col justify-between gap-8 px-6 py-9'>
                <div>
                  <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
                    {Contact.companyName}
                  </Typography>
                  <Typography as='h1' size='heading-xl' color='europe-dark'>
                    {t('who-we-are.title')}
                  </Typography>
                </div>
                <div>
                  <Typography
                    as='p'
                    size='body-lg'
                    color='europe-dark'
                    dangerouslySetInnerHTML={{
                      __html: t.raw('who-we-are.description'),
                    }}
                  />
                  <Link href={'/services'} className={clsx(tagButtonTypes(), 'mt-8')}>
                    {t('see-more')}
                  </Link>
                </div>
              </div>
              <div className='bg-basics-white desktop:h-[550px] desktop:max-w-[416px] desktop:gap-0 flex flex-col justify-between gap-8 px-6 py-9'>
                <div>
                  <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
                    {Contact.companyName}
                  </Typography>
                  <Typography as='h1' size='heading-xl' color='europe-dark'>
                    {t('our-focus.title')}
                  </Typography>
                </div>
                <Typography
                  as='p'
                  size='body-lg'
                  color='europe-dark'
                  dangerouslySetInnerHTML={{
                    __html: t.raw('our-focus.description'),
                  }}
                />
              </div>
              <div
                className='desktop:hidden h-[130px] w-full bg-cover bg-center'
                style={{
                  backgroundImage: `url(${who_we_are_bg.src})`,
                }}
              />
            </div>
          </div>
          <div className='desktop:mt-[176px] w-full'>
            <div
              className='bg-europe w-full bg-no-repeat'
              style={{
                backgroundImage: `url(${our_beliefs_bg.src})`,
              }}
            >
              <div className='desktop:flex-row desktop:gap-20 flex w-full flex-col justify-center'>
                <div className='bg-basics-white desktop:mt-[-128px] desktop:h-[478px] desktop:max-w-[490px] desktop:gap-0 flex flex-col justify-between gap-8 p-6'>
                  <div>
                    <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
                      {Contact.companyName}
                    </Typography>
                    <Typography as='h1' size='heading-xl' color='europe-dark'>
                      {t('our-principles.title')}
                    </Typography>
                  </div>
                  <Typography
                    as='p'
                    size='body-lg'
                    color='europe-dark'
                    dangerouslySetInnerHTML={{
                      __html: t.raw('our-principles.description'),
                    }}
                  />
                </div>
                <div
                  className='desktop:hidden h-[130px] w-full bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${our_beliefs_bg.src})`,
                  }}
                />
                <div className='bg-basics-white desktop:h-[542px] desktop:max-w-[490px] desktop:gap-0 flex flex-col justify-between gap-8 p-6'>
                  <div>
                    <Typography as='span' size='heading-sm' color='gold-dark' weight='bold'>
                      {Contact.companyName}
                    </Typography>
                    <Typography as='h1' size='heading-xl' color='europe-dark'>
                      {t('coming-challenges.title')}
                    </Typography>
                  </div>
                  <Typography
                    as='p'
                    size='body-lg'
                    color='europe-dark'
                    dangerouslySetInnerHTML={{
                      __html: t.raw('coming-challenges.description'),
                    }}
                  />
                </div>
              </div>
              <div className='relative flex items-center justify-center py-20'>
                <Typography
                  as='h3'
                  size='heading-lg'
                  color='basics-white'
                  className='desktop:w-[816px] desktop:flex-row flex w-[242px] flex-col items-center text-center'
                >
                  <Typography as='span' size='heading-4xl' color='gold-dark'>
                    &ldquo;
                  </Typography>
                  <Typography as='span' size='heading-lg' color='basics-white'>
                    {t.rich('help-you', defaultTranslationVales)}
                  </Typography>
                  <Typography as='span' size='heading-4xl' color='gold-dark'>
                    &rdquo;
                  </Typography>
                </Typography>
              </div>
            </div>
          </div>
        </section>
        <section id='our-commitment'>
          <div className='desktop:mx-12 desktop:my-14 mx-0 mt-14'>
            <div className='desktop:flex-row desktop:justify-center desktop:gap-20 flex flex-col-reverse gap-6'>
              <CommitmentsCarousel />
              <div>
                <Typography
                  as='h3'
                  size='heading-2xl'
                  color='europe-dark'
                  className='border-b-europe-light desktop:mx-0 desktop:text-left mx-2.5 border-b-2 text-center'
                >
                  {t('our-commitment.title')}
                </Typography>
              </div>
            </div>
          </div>
          <div
            className='desktop:mt-[-280px] desktop:h-[496px] h-[172px] w-full bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${our_commitment_bg.src})`,
            }}
          />
        </section>
        <section id='top-destinations'>
          <TopDestinations destinations={[Destinations.PRAGUE, Destinations.MADRID, Destinations.MALAGA]} />
        </section>
        <section id='faq'>
          <div className='desktop:mt-14 flex flex-col items-center justify-center px-2.5 pt-16'>
            <Typography as='h3' size='heading-2xl' color='europe-dark' className='desktop:text-left text-center'>
              {t('faq.title')}
            </Typography>
            <div className='my-14 flex items-center justify-center'>
              <span className='border-b-europe desktop:w-[250px] w-[76px] border-b' />
              <Link href={'/faq'} className={clsx('mx-4', buttonTypes({ intent: 'secondary-light' }))}>
                {t('faq.see-more')}
              </Link>
              <span className='border-b-europe desktop:w-[250px] w-[76px] border-b' />
            </div>
            <div className='desktop:my-14 max-w-[1440px]'>
              {Object.entries(FaqsHome)
                .flatMap(([category, faqs]) => faqs.map((faq) => `${category}.${faq}`))
                .map((faq) => (
                  <div
                    key={faq}
                    className='border-basics-disabled desktop:px-12 border-t-0 border-b-2 px-3.5 py-6 first-of-type:border-t-2'
                  >
                    <FaqList faqKey={faq} />
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section id='more-info'>
          <div className='desktop:my-14 flex items-center justify-center'>
            <MoreInfo />
          </div>
        </section>
        <section id='our-partners'>
          <div className='py-16'>
            <Partners />
          </div>
        </section>
      </main>
    </>
  )
}
