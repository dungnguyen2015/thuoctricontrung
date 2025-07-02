'use client'

import { useEffect, useState } from 'react'

export default function LazyHydrate({
  children,
  trigger
}: {
  children: React.ReactNode
  trigger?: 'scroll' | 'hover' | 'visible'
}) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (trigger === 'visible') {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setHydrated(true)
          observer.disconnect()
        }
      })
      observer.observe(document.documentElement)
      return () => observer.disconnect()
    }
    setHydrated(true)
  }, [trigger])

  return hydrated ? children : <div className="placeholder" />
}