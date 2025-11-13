import type { MetadataRoute } from 'next'

import { languages } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.APP_DOMAIN
  const pages = [
    { path: '', priority: 1 },
    { path: 'services', priority: 0.5 },
    { path: 'services/erasmus', priority: 0.5 },
    { path: 'services/language-courses', priority: 0.5 },
    { path: 'services/student-exchange', priority: 0.5 },
    { path: 'services/concierge', priority: 0.5 },
    { path: 'about-us', priority: 0.5 },
    { path: 'destinations', priority: 0.5 },
    { path: 'destinations/prague', priority: 0.5 },
    { path: 'destinations/madrid', priority: 0.5 },
    { path: 'destinations/malaga', priority: 0.5 },
    { path: 'destinations/krakow', priority: 0.5 },
    { path: 'destinations/dublin', priority: 0.5 },
    { path: 'destinations/ghent', priority: 0.5 },
    { path: 'accommodations', priority: 0.5 },
    { path: 'faq', priority: 0.5 },
    { path: 'contact', priority: 0.5 },
    { path: 'privacy-policy', priority: 0.5 },
  ]

  return languages.flatMap((lang) =>
    pages.map(({ path, priority }) => ({
      url: `${domain}/${lang}/${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: priority,
    })),
  )
}
