import Head from 'next/head'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import type { LanguagePageProps } from '@/i18n/config'

import { tagButtonTypes } from '@/components/button/button'
import { FaqList } from '@/components/faq-list/faq-list'
import { MoreInfo } from '@/components/more-info/more-info'
import { Typography } from '@/components/typography/typography'
import { FAQCategories, Faqs } from '@/types/faq'

export default function Page({ params }: LanguagePageProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('faq-page')
  const tfaqs = useTranslations('faqs')

  const faqSchema = {
    '@context': 'http://schema.org',
    '@type': 'FAQPage',
    mainEntity: Object.entries(Faqs).map(([category, items]) =>
      items.map((faq) => ({
        '@type': 'Question',
        name: tfaqs(`${category}.${faq}.title`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: tfaqs.raw(`${category}.${faq}.description`),
        },
      })),
    ),
  }

  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>
      <div>
        <div>
          <div className='desktop:py-24 flex items-center justify-center py-14'>
            <Typography as='h1' size='heading-2xl' color='europe-dark' className='desktop:text-left text-center'>
              {t('title')}
            </Typography>
          </div>
          <div className='border-y-basics-disabled bg-basics-white desktop:justify-center desktop:overflow-hidden desktop:px-12 sticky top-20 flex items-center gap-6 overflow-auto border-y px-6 py-6'>
            {Object.values(FAQCategories).map((category) => (
              <Link href={`#${category}`} scroll={true} key={category} className={tagButtonTypes()}>
                {t(`categories.${category}`)}
              </Link>
            ))}
          </div>
          {Object.entries(Faqs).map(([category, items]) => (
            <section key={category} id={category} className='scroll-mt-[164px]'>
              <div className='border-b-basics-disabled desktop:px-12 desktop:pb-6 desktop:pt-12 border-b px-6 pt-6 pb-2'>
                <Typography as='h2' size='heading-xl' color='europe-dark' weight='bold'>
                  {t(`categories.${category}`)}
                </Typography>
              </div>
              {items.map((faq) => (
                <div
                  key={faq}
                  className='border-basics-disabled border-t-0 border-b-2 px-12 py-6 first-of-type:border-t-2'
                >
                  <FaqList key={faq} faqKey={`${category}.${faq}`} />
                </div>
              ))}
            </section>
          ))}
        </div>
        <section id='more-info'>
          <div className='py-14'>
            <MoreInfo />
          </div>
        </section>
      </div>
    </>
  )
}
