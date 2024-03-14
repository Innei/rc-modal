import { useCallback, useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'foxact/use-isomorphic-layout-effect'

export const useEventCallback = <T extends (...args: any[]) => any>(fn: T) => {
  const ref = useRef<T>(fn)

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args: any[]) => ref.current(...args), []) as T
}
