'use client'

import { useCallback, useContext, useId, useRef } from 'react'
import type { ModalProps, ModalStackOptions } from './types'

import { useSetModalStack } from '~/providers'

import { CurrentModalContext } from './modal'

const modalIdToPropsMap = {} as Record<string, ModalProps>

export const useModalStack = (options?: ModalStackOptions) => {
  const id = useId()
  const currentCount = useRef(0)
  const { wrapper } = options || {}
  const setModalStack = useSetModalStack()
  return {
    present: useCallback(
      (props: ModalProps & { id?: string }) => {
        const fallbackModelId = `${id}-${++currentCount.current}`
        const modalId = props.id ?? fallbackModelId

        setModalStack((currentStack) => {
          const existingModal = currentStack.find((item) => item.id === modalId)

          if (existingModal) {
            // Move to top
            const index = currentStack.indexOf(existingModal)
            return [
              ...currentStack.slice(0, index),
              ...currentStack.slice(index + 1),
              existingModal,
            ]
          }

          const modalProps = {
            ...props,
            id: props.id ?? modalId,
            wrapper,
          }
          modalIdToPropsMap[modalProps.id] = modalProps
          return currentStack.concat(modalProps)
        })

        return () => {
          setModalStack((p) => {
            return p.filter((item) => item.id !== modalId)
          })
        }
      },
      [id, setModalStack],
    ),

    dismiss: useCallback(
      (id: string) => {
        setModalStack((p) => {
          return p.filter((item) => item.id !== id)
        })
      },
      [setModalStack],
    ),
    dismissTop: useCallback(() => {
      setModalStack((p) => p.slice(0, -1))
    }, [setModalStack]),
    dismissAll: useCallback(() => {
      setModalStack([])
    }, [setModalStack]),
  }
}
export const useCurrentModal = () => {
  return useContext(CurrentModalContext)
}
