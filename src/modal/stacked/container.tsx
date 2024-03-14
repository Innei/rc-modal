'use client'

import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'
import type { ModalStackContainerProps } from './types'

import {
  IsMobileProvider,
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
  const { m, isMobile, children } = props
  return (
    <ModalStackProvider>
      <SheetStackProvider>
        <IsMobileProvider>
          {children}
          <MotionComponentContext.Provider
            // Keep the value stable
            value={useMemo(() => ({ m }), [])}
          >
            <ModalStack />
            {typeof isMobile === 'boolean' && <SetMobile m={isMobile} />}
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

const ModalStack = () => {
  const stack = useModalStackInternal()

  return (
    <AnimatePresence mode="popLayout">
      {stack.map((item, index) => {
        return <Modal key={item.id} item={item} index={index} />
      })}
    </AnimatePresence>
  )
}
