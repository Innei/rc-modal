import { createContext, useContext } from 'react'
import type { ModalGlobalConfigurations, ModalProps } from '~/modal/types'
import type { m, motion } from 'framer-motion'

import { createContextState } from '~/lib/craete-context-state'

export const [SheetStackProvider, useSheetStack, useSetSheetStack] =
  createContextState([] as HTMLDivElement[])

export const [ModalStackProvider, useModalStackInternal, useSetModalStack] =
  createContextState([] as (ModalProps & { id: string })[])

export const [IsMobileProvider, useIsMobile, useSetIsMobile] =
  createContextState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )

export const MotionComponentContext = createContext<{
  m: typeof m | typeof motion
}>(null!)

export const useMotionComponent = (): typeof m => {
  return useContext(MotionComponentContext).m
}

export const ModalGlobalConfigurationsContext =
  createContext<ModalGlobalConfigurations>({})
export const useModalGlobalConfigurations = () =>
  useContext(ModalGlobalConfigurationsContext)
