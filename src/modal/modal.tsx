'use client'

import * as Dialog from '@radix-ui/react-dialog'
import {
  createContext,
  createElement,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useAnimationControls } from 'framer-motion'
import type { Spring, Target } from 'framer-motion'
import type { RefObject, SyntheticEvent } from 'react'
import type { ModalContentPropsInternal, ModalProps } from './types'

import { DialogOverlay } from '~/dialog/DialogOverlay'
import { Divider } from '~/divider'
import { useEventCallback } from '~/hooks/use-event-callback'
import { useIsUnMounted } from '~/hooks/use-is-unmounted'
import { CloseIcon } from '~/icons/close'
import { stopPropagation } from '~/lib/dom'
import { clsxm } from '~/lib/helper'
import {
  useIsMobile,
  useModalGlobalConfigurations,
  useMotionComponent,
  useSetModalStack,
  useSheetStack,
} from '~/providers'

import { PresentSheet } from '../sheet'
import { ModalBEM } from './bem'

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

  onClose?: (open: boolean) => void
}> = memo(({ item, index, onClose: onPropsClose, children }) => {
  const m = useMotionComponent()

  const setStack = useSetModalStack()
  const close = useEventCallback(() => {
    setStack((p) => {
      return p.filter((modal) => modal.id !== item.id)
    })
    onPropsClose?.(false)
  })

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

  const modalStyle = useMemo(() => ({ zIndex: 99 + index }), [index])
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
    animateController.start(enterStyle)
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
            <DialogOverlay zIndex={20} />
            <Dialog.Content asChild>
              <div
                className={clsxm(
                  ModalBEM.root,
                  'fixed inset-0 z-[20] overflow-auto',
                  modalContainerClassName,
                )}
                onClick={clickOutsideToDismiss ? dismiss : undefined}
              >
                <div className="contents" onClick={stopPropagation}>
                  <CustomModalComponent>{finalChildren}</CustomModalComponent>
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
          <DialogOverlay zIndex={20} />
          <Dialog.Content asChild>
            <div
              className={clsxm(
                ModalBEM.root,
                'fixed inset-0 z-[20] flex items-center justify-center',
                modalContainerClassName,
              )}
              onClick={clickOutsideToDismiss ? dismiss : noticeModal}
            >
              <m.div
                style={modalStyle}
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
              >
                <Dialog.Title
                  className={`${ModalBEM.title} flex-shrink-0 px-4 py-2 text-lg font-medium`}
                >
                  {title}
                </Dialog.Title>
                <Divider className="my-2 flex-shrink-0 border-slate-200 opacity-80 dark:border-neutral-800" />

                <div
                  className={`${ModalBEM.children} min-h-0 flex-shrink flex-grow overflow-auto px-4 py-2`}
                >
                  {finalChildren}
                </div>

                <Dialog.DialogClose
                  onClick={close}
                  className={`${ModalBEM.close} absolute right-0 top-0 z-[9] p-5`}
                >
                  <CloseIcon />
                </Dialog.DialogClose>
              </m.div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Wrapper>
  )
})
