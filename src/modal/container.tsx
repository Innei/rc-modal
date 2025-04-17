'use client'

import { AnimatePresence } from 'motion/react'
import React, { memo, useMemo } from 'react'
import type { FC, PropsWithChildren } from 'react'
import type { ModalStackContainerProps } from './types'

import {
  IsMobileProvider,
  ModalGlobalConfigurationsContext,
  ModalStackProvider,
  MotionComponentContext,
  SheetStackProvider,
  useModalStackInternal,
  useSetIsMobile,
} from '~/providers'

import { MODAL_STACK_Z_INDEX } from './constants'
import { Modal } from './modal'
import { ModalOverlay } from './overlay'

export const ModalStackContainer: FC<
  ModalStackContainerProps & PropsWithChildren
> = (props) => {
  const { m, sheet, children, ...globalModalConfig } = props
  return (
    <ModalStackProvider>
      <SheetStackProvider>
        <IsMobileProvider>
          <MotionComponentContext.Provider
            // Keep the value stable
            value={useMemo(() => ({ m }), [])}
          >
            <ModalGlobalConfigurationsContext.Provider
              // Keep the value stable
              value={useMemo(
                () => ({
                  ...globalModalConfig,
                }),
                [],
              )}
            >
              {children}
              <ModalStack />
            </ModalGlobalConfigurationsContext.Provider>
            {typeof sheet === 'boolean' && <SetMobile m={sheet} />}
          </MotionComponentContext.Provider>
        </IsMobileProvider>
      </SheetStackProvider>
    </ModalStackProvider>
  )
}

const SetMobile: FC<{ m: boolean }> = ({ m }) => {
  const set = useSetIsMobile()

  useMemo(() => {
    set(m)
  }, [m, set])
  return null
}

const ModalStack = memo(() => {
  const stack = useModalStackInternal()

  const forceOverlay = stack.some((item) => item.overlay)

  return (
    <AnimatePresence mode="popLayout">
      {stack.map((item, index) => {
        return (
          <Modal
            isTop={index === stack.length - 1}
            key={item.id}
            item={item}
            index={index}
          />
        )
      })}
      {stack.length > 0 && forceOverlay && (
        <ModalOverlay zIndex={MODAL_STACK_Z_INDEX + stack.length - 1} />
      )}
    </AnimatePresence>
  )
})
