import type { MetadataRoute } from 'next'
import { routes } from '@/lib/routes'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bianomics.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}${routes.snapshot}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
