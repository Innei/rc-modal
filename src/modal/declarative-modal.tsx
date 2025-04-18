'use client'

import { AnimatePresence } from 'motion/react'
import React, { useId, useMemo } from 'react'
import type { FC, ReactNode } from 'react'
import type { ModalProps } from './types'

import { clsxm } from '~/lib/helper'
import { useModalStackInternal } from '~/providers'

import { MODAL_STACK_Z_INDEX } from './constants'
import { Modal } from './modal'
import { ModalOverlay } from './overlay'

export interface DeclarativeModalProps extends Omit<ModalProps, 'content'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode

  id?: string
}

const Noop = () => null
const DeclarativeModalImpl: FC<DeclarativeModalProps> = ({
  open,
  onOpenChange,
  children,
  ...rest
}) => {
  const modalStack = useModalStackInternal()
  const index = useMemo(() => modalStack.length, [])

  const id = useId()
  const item = useMemo(
    () => ({
      ...rest,
      content: Noop,
      id,
    }),
    [id, rest],
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <ModalOverlay zIndex={MODAL_STACK_Z_INDEX - 10 + index} />
          <Modal onClose={onOpenChange} isTop index={index} item={item}>
            {children}
          </Modal>
        </>
      )}
    </AnimatePresence>
  )
}

const FooterAction: Component = ({ children, className }) => {
  return (
    <div
      className={clsxm('mt-4 flex items-center justify-end gap-2', className)}
    >
      {children}
    </div>
  )
}

export const DeclarativeModal = Object.assign(DeclarativeModalImpl, {
  FooterAction,
})
