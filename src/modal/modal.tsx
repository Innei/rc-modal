'use client'

import * as Dialog from '@radix-ui/react-dialog'
import React, {
  createContext,
  createElement,
  forwardRef,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useAnimationControls, useDragControls } from 'framer-motion'
import type { Spring, Target } from 'framer-motion'
import type { PointerEventHandler, RefObject, SyntheticEvent } from 'react'
import type { ModalContentPropsInternal, ModalProps } from './types'

import { Divider } from '~/divider'
import { useEventCallback } from '~/hooks/use-event-callback'
import { useIsUnMounted } from '~/hooks/use-is-unmounted'
import { CloseIcon } from '~/icons/close'
import { stopPropagation } from '~/lib/dom'
import { clsxm } from '~/lib/helper'
import {
  useIsMobile,
  useModalGlobalConfigurations,
  useModalStackInternal,
  useMotionComponent,
  useSetModalStack,
  useSheetStack,
} from '~/providers'

import { PresentSheet } from '../sheet'
import { ModalBEM } from './bem'
import { MODAL_STACK_Z_INDEX } from './constants'

const microReboundPreset: Spring = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
}

const enterStyle: Target = {
  scale: 1,
  opacity: 1,
}
const initialStyle: Target = {
  scale: 0.96,
  opacity: 0,
}

export type CurrentModalContentProps = ModalContentPropsInternal & {
  ref: RefObject<HTMLElement>
}

export const CurrentModalContext = createContext<CurrentModalContentProps>(
  null as any,
)

export const Modal: Component<{
  item: ModalProps & { id: string }
  index: number
  isTop: boolean
  onClose?: (open: boolean) => void
}> = memo(
  forwardRef(
    ({ item, index, onClose: onPropsClose, children, isTop }, ref: any) => {
      const m = useMotionComponent()

      const setStack = useSetModalStack()
      const close = useEventCallback(() => {
        setStack((p) => {
          return p.filter((modal) => modal.id !== item.id)
        })
        onPropsClose?.(false)
      })
      const zIndexStyle = useMemo(
        () => ({ zIndex: MODAL_STACK_Z_INDEX + index + 1 }),
        [index],
      )
      const modalStack = useModalStackInternal()
      const currentIsClosing = modalStack.every((modal) => modal.id !== item.id)

      const onClose = useCallback(
        (open: boolean): void => {
          if (!open) {
            close()
          }
        },
        [close],
      )
      const globalConfig = useModalGlobalConfigurations()

      const {
        CustomModalComponent,
        modalClassName,
        content,
        title,
        clickOutsideToDismiss,
        modalContainerClassName,
        wrapper: Wrapper = Fragment,
        max,
      } = { ...globalConfig, ...item }

      const dismiss = useCallback(
        (e: SyntheticEvent) => {
          stopPropagation(e)
          close()
        },
        [close],
      )
      const isMobile = useIsMobile()

      const isUnmounted = useIsUnMounted()
      const animateController = useAnimationControls()
      useEffect(() => {
        if (isMobile) return
        requestAnimationFrame(() => {
          animateController.start(enterStyle)
        })
      }, [animateController, isMobile])
      const noticeModal = useCallback(() => {
        animateController
          .start({
            scale: 1.05,
            transition: {
              duration: 0.06,
            },
          })
          .then(() => {
            if (isUnmounted.current) return
            animateController.start({
              scale: 1,
            })
          })
      }, [animateController])

      const modalContentRef = useRef<HTMLDivElement>(null)
      const ModalProps: ModalContentPropsInternal = useMemo(
        () => ({
          dismiss: close,
        }),
        [close],
      )

      const ModalContextProps = useMemo<CurrentModalContentProps>(
        () => ({
          ...ModalProps,
          ref: modalContentRef,
        }),
        [ModalProps],
      )
      const finalChildren = (
        <CurrentModalContext.Provider value={ModalContextProps}>
          {children ? children : createElement(content, ModalProps)}
        </CurrentModalContext.Provider>
      )

      useEffect(() => {
        if (currentIsClosing) {
          // Radix dialog will block pointer events
          document.body.style.pointerEvents = 'auto'
        }
      }, [currentIsClosing])

      const edgeElementRef = useRef<HTMLDivElement>(null)

      const dragController = useDragControls()
      const handleDrag: PointerEventHandler<HTMLDivElement> = useCallback(
        (e) => {
          dragController.start(e)
        },
        [dragController],
      )

      useEffect(() => {
        if (isTop) return
        animateController.start({
          scale: 0.96,
          y: 10,
        })
        return () => {
          try {
            animateController.stop()
            animateController.start({
              scale: 1,
              y: 0,
            })
          } catch {
            /* empty */
          }
        }
      }, [isTop])

      const sheetStack = useSheetStack()
      if (isMobile) {
        const sheetLength = sheetStack.length

        return (
          <Wrapper>
            <PresentSheet
              title={title}
              defaultOpen
              zIndex={1000 + sheetLength}
              onOpenChange={(open) => {
                if (!open) {
                  setTimeout(() => {
                    close()
                  }, 1000)
                }
              }}
              content={finalChildren}
            />
          </Wrapper>
        )
      }

      if (CustomModalComponent) {
        return (
          <Wrapper>
            <Dialog.Root open onOpenChange={onClose}>
              <Dialog.Portal>
                <Dialog.Title className="sr-only">{title}</Dialog.Title>
                <Dialog.Content asChild>
                  <div
                    ref={ref}
                    className={clsxm(
                      ModalBEM.root,
                      'fixed inset-0 z-[20] overflow-auto',
                      currentIsClosing && 'pointer-events-none',
                      modalContainerClassName,
                    )}
                    onClick={clickOutsideToDismiss ? dismiss : undefined}
                  >
                    <div className="contents" onClick={stopPropagation}>
                      <CustomModalComponent>
                        {finalChildren}
                      </CustomModalComponent>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </Wrapper>
        )
      }
      return (
        <Wrapper>
          <Dialog.Root open onOpenChange={onClose}>
            <Dialog.Portal>
              <Dialog.Content asChild>
                <div
                  ref={edgeElementRef}
                  className={clsxm(
                    ModalBEM.root,
                    'fixed inset-0 z-[20] flex items-center justify-center',
                    currentIsClosing && 'pointer-events-none',
                    modalContainerClassName,
                  )}
                  onClick={clickOutsideToDismiss ? dismiss : noticeModal}
                  style={zIndexStyle}
                >
                  <m.div
                    ref={ref}
                    style={zIndexStyle}
                    exit={initialStyle}
                    initial={initialStyle}
                    animate={animateController}
                    transition={microReboundPreset}
                    className={clsxm(
                      ModalBEM.content,
                      'relative flex flex-col overflow-hidden rounded-lg',
                      'bg-zinc-50/80 dark:bg-zinc-950/80',
                      'p-2 shadow-2xl shadow-gray-300 backdrop-blur-sm dark:shadow-gray-800/50',
                      max
                        ? 'h-[90vh] w-[90vw]'
                        : 'max-h-[70vh] min-w-[300px] max-w-[90vw] lg:max-h-[calc(100vh-20rem)] lg:max-w-[70vw]',

                      'border border-slate-200 dark:border-neutral-800',
                      modalClassName,
                    )}
                    onClick={stopPropagation}
                    drag
                    dragControls={dragController}
                    dragElastic={0}
                    dragListener={false}
                    dragMomentum={false}
                    dragConstraints={edgeElementRef}
                    whileDrag={{
                      cursor: 'grabbing',
                    }}
                  >
                    <div
                      className="relative flex items-center"
                      onPointerDownCapture={handleDrag}
                    >
                      <Dialog.Title className="flex shrink-0 grow items-center gap-2 px-4 py-1 text-lg font-semibold">
                        <span>{title}</span>
                      </Dialog.Title>
                      <Dialog.DialogClose
                        onClick={close}
                        className={`${ModalBEM.close} absolute right-0 top-0 z-[9] p-2`}
                      >
                        {CloseIcon}
                      </Dialog.DialogClose>
                    </div>
                    <Divider className="my-2 flex-shrink-0 border-slate-200 opacity-80 dark:border-neutral-800" />

                    <div
                      className={`${ModalBEM.children} min-h-0 flex-shrink flex-grow overflow-auto px-4 py-2`}
                    >
                      {finalChildren}
                    </div>
                  </m.div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Wrapper>
      )
    },
  ),
)
