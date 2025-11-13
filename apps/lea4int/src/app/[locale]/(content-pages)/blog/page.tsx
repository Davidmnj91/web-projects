import { unstable_cache } from 'next/cache'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import React, { Suspense } from 'react'

import type { LanguagePageProps } from '@/i18n/config'

import { Typography } from '@/components/typography/typography'
import { VideoBlog } from '@/components/video-blog/video-blog'
import { getVideos } from '@/services/youtube.service'

const getData = unstable_cache(
  async () => await getVideos(),
  ['youtube-videos'],
  { revalidate: 7200 }, // Re-fetch videos each 2 hour, do not exceed google cuota
)

export default async function Page({ params }: LanguagePageProps) {
  const { locale } = await params

  setRequestLocale(locale)

  const videos = await getData()

  const t = await getTranslations('blog-page')

  return (
    <div>
      <div className='desktop:gap-24 desktop:py-24 flex flex-col items-center justify-center gap-12 py-14'>
        <Typography as='h1' size='heading-2xl' color='europe-dark' className='desktop:text-left text-center'>
          {t('title')}
        </Typography>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <section id='videos'>
          <VideoBlog videos={videos} />
        </section>
      </Suspense>
    </div>
  )
}
