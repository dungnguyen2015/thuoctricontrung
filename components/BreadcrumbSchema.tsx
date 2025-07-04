'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BreadcrumbSchema() {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([])

  useEffect(() => {
    if (!pathname) return

    const pathParts = pathname.split('/').filter(part => part)
    const baseUrl = 'https://thuoctricontrung.com'

    const crumbs = pathParts.map((part, index) => {
      const name = decodeURIComponent(part).replace(/-/g, ' ')
      return {
        "@type": "ListItem",
        position: index + 1,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        item: `${baseUrl}/${pathParts.slice(0, index + 1).join('/')}`
      }
    })

    setBreadcrumbs([
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: baseUrl
      },
      ...crumbs.map((item, i) => ({ ...item, position: i + 2 }))
    ])
  }, [pathname])

  if (breadcrumbs.length === 0) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs
  }

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(schema)}
    </script>
  )
}