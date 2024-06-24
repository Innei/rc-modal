'use client'

import { useEffect } from 'react'

import { useIsMobile } from '../hooks/use-is-mobile.js'
import { useSetIsMobile } from '../providers/index.js'

export const MobileDetector = () => {
  const set = useSetIsMobile()
  const isMobile = useIsMobile()

  useEffect(() => {
    set(isMobile)
  }, [isMobile, set])
  return null
}
