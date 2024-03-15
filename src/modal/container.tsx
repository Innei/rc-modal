'use client'

import { memo, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
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

import { Modal } from './modal'

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

  return (
    <AnimatePresence mode="popLayout">
      {stack.map((item, index) => {
        return <Modal key={item.id} item={item} index={index} />
      })}
    </AnimatePresence>
  )
})
