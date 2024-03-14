'use client'

import { useEffect } from 'react'

import { useSetIsMobile } from '~/providers'

import { useIsMobile } from '../hooks/use-is-mobile'

export const MobileDetector = () => {
  const set = useSetIsMobile()
  const isMobile = useIsMobile()

  useEffect(() => {
    set(isMobile)
  }, [isMobile, set])
  return null
}
