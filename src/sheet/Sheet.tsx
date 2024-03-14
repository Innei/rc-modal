import React, { useEffect, useMemo, useState } from 'react'
import { Drawer } from 'vaul'
import type { FC, PropsWithChildren, ReactNode } from 'react'

import { useSetSheetStack } from '~/providers'

export interface PresentSheetProps {
  content: ReactNode | FC
  open?: boolean
  onOpenChange?: (value: boolean) => void
  title?: string
  zIndex?: number
  dismissible?: boolean
  defaultOpen?: boolean
}

export const PresentSheet: FC<PropsWithChildren<PresentSheetProps>> = (
  props,
) => {
  const {
    content,
    children,
    zIndex = 998,
    title,
    dismissible = true,
    defaultOpen,
  } = props

  const [isOpen, setIsOpen] = useState(props.open ?? defaultOpen)

  const nextRootProps = useMemo(() => {
    const nextProps = {
      onOpenChange: setIsOpen,
    } as any
    if (isOpen !== undefined) {
      nextProps.open = isOpen
    }

    if (props.onOpenChange !== undefined) {
      nextProps.onOpenChange = (v: boolean) => {
        setIsOpen(v)
        props.onOpenChange?.(v)
      }
    }

    return nextProps
  }, [props, isOpen, setIsOpen])

  useEffect(() => {
    if (props.open !== undefined) {
      setIsOpen(props.open)
    }
  }, [props.open])
  const [holderRef, setHolderRef] = useState<HTMLDivElement | null>()
  const setSheetStack = useSetSheetStack()

  useEffect(() => {
    const holder = holderRef
    if (!holder) return
    setSheetStack((p) => p.concat(holder))

    return () => {
      setSheetStack((p) => p.filter((item) => item !== holder))
    }
  }, [holderRef, setSheetStack])

  const Root = Drawer.Root

  const overlayZIndex = zIndex - 1
  const contentZIndex = zIndex

  return (
    <Root dismissible={dismissible} {...nextRootProps}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content
          style={{
            zIndex: contentZIndex,
          }}
          className="fixed bottom-0 left-0 right-0 mt-24 flex max-h-[95vh] flex-col rounded-t-[10px] bg-white p-4 dark:bg-neutral-950"
        >
          {dismissible && (
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-neutral-800" />
          )}

          {title && (
            <Drawer.Title className="-mt-4 mb-4 flex justify-center text-lg font-medium">
              {title}
            </Drawer.Title>
          )}

          {typeof content === 'function'
            ? React.createElement(content)
            : content}
          <div ref={setHolderRef} />
        </Drawer.Content>
        <Drawer.Overlay
          className="fixed inset-0 bg-neutral-800/40"
          style={{
            zIndex: overlayZIndex,
          }}
        />
      </Drawer.Portal>
    </Root>
  )
}
