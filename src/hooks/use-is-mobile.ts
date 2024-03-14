import { useEffect, useState } from 'react'

export const useIsMobile = ({ mobileBreakpoint = 768 } = {}) => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileBreakpoint])
  return isMobile
}
