import type { m, motion } from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'

export interface ModalProps {
  title: string
  CustomModalComponent?: FC<PropsWithChildren>
  content: FC<ModalContentPropsInternal>
  clickOutsideToDismiss?: boolean
  modalClassName?: string
  modalContainerClassName?: string

  max?: boolean

  ////
  sheetFullScreen?: boolean | 'half'

  wrapper?: FC
}
export interface ModalStackOptions {
  wrapper?: FC
}

export interface ModalStackContainerProps {
  /**
   * If not passed, it will be always `false`, so will can't switch to sheet mode in mobile.
   */
  isMobile?: boolean

  // CloseIcon?: ReactNode

  /**
   * Framer motion provide two way to declare motion component.
   *
   * 1. If you using `<LazyMotion/>`, please passed `m`.
   * 2. If you using the default, please passed `motion`.
   *
   * @see https://www.framer.com/motion/lazy-motion
   */
  m: typeof m | typeof motion
}

export type ModalContentComponent<T> = FC<ModalContentPropsInternal & T>
export type ModalContentPropsInternal = {
  dismiss: () => void
}
