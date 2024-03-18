'use client'

import { useEffect } from 'react'

import { useSetIsMobile } from '~/providers/index.js'

import { useIsMobile } from '../hooks/use-is-mobile.js'

export const MobileDetector = () => {
  const set = useSetIsMobile()
  const isMobile = useIsMobile()

  useEffect(() => {
    set(isMobile)
  }, [isMobile, set])
  return null
}
