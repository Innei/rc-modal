import React, { forwardRef } from 'react'
import type { ForwardedRef } from 'react'

import { RootPortal } from '~/portal'
import { useMotionComponent } from '~/providers'

export const ModalOverlay = forwardRef(
  ({ zIndex }: { zIndex?: number }, ref: ForwardedRef<HTMLDivElement>) => {
    const m = useMotionComponent()

    return (
      <RootPortal>
        <m.div
          ref={ref}
          id="modal-overlay"
          className="pointer-events-none fixed inset-0 z-[11] bg-zinc-50/80 dark:bg-neutral-900/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          style={{ zIndex }}
        />
      </RootPortal>
    )
  },
)
