import { createContext, useContext } from 'react'
import type { ModalGlobalConfigurations, ModalProps } from '~/modal/types'
import type { m, motion } from 'motion/react'

import { createContextState } from '~/lib/create-context-state'

export const [SheetStackProvider, useSheetStack, useSetSheetStack] =
  createContextState([] as HTMLDivElement[], 'SheetStackProvider')

export const [ModalStackProvider, useModalStackInternal, useSetModalStack] =
  createContextState(
    [] as (ModalProps & { id: string })[],
    'ModalStackProvider',
  )

export const [IsMobileProvider, useIsMobile, useSetIsMobile] =
  createContextState(false)

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
