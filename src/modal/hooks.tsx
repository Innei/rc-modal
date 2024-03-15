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
        const modalId = `${id}-${++currentCount.current}`
        setModalStack((p) => {
          const modalProps = {
            ...props,
            id: props.id ?? modalId,
            wrapper,
          }
          modalIdToPropsMap[modalProps.id] = modalProps
          return p.concat(modalProps)
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
