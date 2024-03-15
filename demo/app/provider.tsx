"use client"

import { useState, type PropsWithChildren } from "react"
import { m, motion } from "framer-motion"
import { Modal } from "rc-modal-sheet"
import { ModalStackContainer } from "~/modal"

import { Button } from "@/components/ui/button"

export const Providers = (props: PropsWithChildren) => (
  <ModalStackContainer m={motion}>
    {props.children}
    {/* <Demo /> */}
  </ModalStackContainer>
)

// export const Demo = () => {
//   const [open, setOpen] = useState(false)
//   return (
//     <ModalStackContainer m={m}>
//       <Button
//         onClick={() => {
//           setOpen(true)
//         }}
//       >
//         Open Modal2
//       </Button>
//       <Modal title="A declaratively modal" open={open} onOpenChange={setOpen}>
//         <p>
//           This is a modal. You can put anything you want in here. And It can be
//           nested.
//         </p>
//       </Modal>
//     </ModalStackContainer>
//   )
// }
