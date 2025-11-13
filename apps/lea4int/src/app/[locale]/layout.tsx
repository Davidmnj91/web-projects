import { notFound } from 'next/navigation'
import { useMessages } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import React, { use } from 'react'

import lea4international from '../../../public/images/lea4international.png'

import type { Language } from '@/i18n/config'

import { cormorant, ubuntu } from '@/app/fonts'
import { ContactUs } from '@/components/contact-us/contact-us'
import { CookieBanner } from '@/components/cookie-banner/cookie-banner'
import { Footer } from '@/components/footer/footer'
import { languages } from '@/i18n/config'
import IntlClientProvider from '@/providers/IntlClientProvider'
import { Contact } from '@/types/contact'

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default function RootLayout({ params, children }: RootLayoutProps) {
  const { locale } = use(params)

  if (!languages.includes(locale as Language)) notFound()

  setRequestLocale(locale)
  const messages = useMessages()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'LEA 4 International',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://lea4int.com',
    },
    headline: 'LEA 4 International',
    description:
      'LEA 4 International promotes Leading Education Abroad through the planification, implementation and coordination of a variety of educational projects. We work in collaboration with funding programs such as Erasmus+ in different European countries.',
    image: `https://lea4int.com${lea4international.src}`,
    dateCreated: '2024-01-11T11:35:00+07:00',
    datePublished: '2024-01-11T11:35:00+07:00',
    dateModified: '2024-01-11T11:35:00+07:00',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Valladolid, Spain',
      postalCode: 'F47007',
    },
    email: Contact.mail,
    telephone: Contact.phone,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: Contact.phone,
        contactType: 'customer service',
        contactOption: 'TollFree',
      },
    ],
    author: {
      '@type': 'Person',
      name: 'David Manjavacas Santos',
      url: 'https://www.linkedin.com/in/david-manjavacas-santos/',
    },
    publisher: {
      '@type': 'Person',
      name: 'David Manjavacas Santos',
    },
    inLanguage: locale,
    isFamilyFriendly: 'true',
  }

  return (
    <html style={{ scrollBehavior: 'smooth' }} lang={locale} className={`${cormorant.variable} ${ubuntu.variable}`}>
      <head>
        <title>LEA 4 International</title>
        <meta
          name='description'
          content='LEA 4 International promotes Leading Education Abroad through the planification, implementation and coordination of a variety of educational projects. We work in collaboration with funding programs such as Erasmus+ in different European countries.'
        />
        <meta
          name='keywords'
          content='erasmus, erasmus+, job shadowing, school exchange, erasmus mundus, english language courses, spanish language courses, student exchange, immersion programs, student concierge, KA2, intercambio de estudiantes, cursos de idiomas'
        />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='utf-8' />
        <meta property='og:site_name' content='LEA 4 Internaltional' />
        <meta property='og:locale' content={locale} />
        <meta property='og:title' content='LEA 4 Internaltional' />
        <meta
          property='og:description'
          content='LEA 4 International promotes Leading Education Abroad through the planification, implementation and coordination of a variety of educational projects. We work in collaboration with funding programs such as Erasmus+ in different European countries.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://lea4int.com' />
        <meta property='og:image' content={`https://lea4int.com${lea4international.src}`} />
        <meta property='og:image:alt' content='LEA 4 Internaltional' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='948' />
        <meta property='og:image:height' content='780' />
        <meta property='article:published_time' content='2024-01-11T11:35:00+07:00' />
        <meta property='article:modified_time' content='2024-01-11T11:35:00+07:00' />
        <meta property='article:author' content='https://www.linkedin.com/in/david-manjavacas-santos/' />
        <link rel='canonical' href={process.env.APP_DOMAIN} />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#2f3c49' />
        <meta name='msapplication-TileColor' content='#2b5797' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='google-site-verification' content='6TLnwupP2uv_SwtWptJfYpYCDXZZOMqDHyGfceP4Exw' />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className='bg-basics-white relative mx-auto'>
        <IntlClientProvider locale={locale} messages={messages} timeZone='Europe/Berlin' now={new Date()}>
          {children}
          <ContactUs />
          <Footer />
          <CookieBanner />
        </IntlClientProvider>
      </body>
    </html>
  )
}
