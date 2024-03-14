import * as Dialog from '@radix-ui/react-dialog'

import { useMotionComponent } from '~/providers'

export const DialogOverlay = ({
  onClick,
  zIndex,
}: {
  onClick?: () => void
  zIndex?: number
}) => {
  const m = useMotionComponent()
  return (
    <Dialog.Overlay asChild>
      <m.div
        onClick={onClick}
        className="fixed inset-0 z-[11] bg-zinc-50/80 dark:bg-zinc-950/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex }}
      />
    </Dialog.Overlay>
  )
}
