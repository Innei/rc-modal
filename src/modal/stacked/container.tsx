'use client'

import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { FC } from 'react'
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

export const ModalStackContainer: FC<ModalStackContainerProps> = (props) => {
  const { m, isMobile, ...config } = props
  return (
    <ModalStackProvider>
      <SheetStackProvider>
        <MotionComponentContext.Provider
          // Keep the value stable
          value={useMemo(() => ({ m }), [])}
        >
          <IsMobileProvider>
            <ModalStack />
            <SetMobile m={isMobile} />
          </IsMobileProvider>
        </MotionComponentContext.Provider>
      </SheetStackProvider>
    </ModalStackProvider>
  )
}

const SetMobile: FC<{ m?: boolean }> = ({ m }) => {
  const set = useSetIsMobile()
  useMemo(() => {
    typeof m === 'boolean' && set(m)
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
