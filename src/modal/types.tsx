import type { m, motion } from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'

export interface ModalProps {
  title: string
  CustomModalComponent?: FC<PropsWithChildren>
  content: FC<ModalContentPropsInternal>
  clickOutsideToDismiss?: boolean
  modalClassName?: string
  modalContainerClassName?: string

  /**
   * If `true`, the modal will be full screen.
   */
  max?: boolean

  wrapper?: FC
  overlay?: boolean
}
export interface ModalStackOptions {
  wrapper?: FC
}

export interface ModalStackContainerProps extends ModalGlobalConfigurations {
  /**
   * If not passed, it will be always `false`, so will can't switch to sheet mode in mobile.
   */
  sheet?: boolean

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

export interface ModalGlobalConfigurations
  extends Omit<
    ModalProps,
    'title' | 'content' | 'CustomModalComponent' | 'max'
  > {}

export type ModalContentComponent<T> = FC<ModalContentPropsInternal & T>
export type ModalContentPropsInternal = {
  dismiss: () => void
}
