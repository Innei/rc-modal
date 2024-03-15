"use client"

import { useEffect, useLayoutEffect } from "react"
import { Pirata_One } from "next/font/google"
import { usePathname } from "next/navigation"

export const Highlighter = () => {
  const pathname = usePathname()
  useEffect(() => {
    ;(window as any).Prism?.highlightAll()
  }, [pathname])

  useLayoutEffect(() => {
    // alway run in development when every re-render
    if (process.env.NODE_ENV === "development") {
      ;(window as any).Prism?.highlightAll()
    }
  })
  return null
}
