"use client"

import { useState } from "react"
import { m } from "framer-motion"
import { Modal, ModalStackContainer, useModalStack } from "rc-modal-sheet"

import { Button } from "@/components/ui/button"

export const App = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open Modal
      </Button>
      <Modal title="A declaratively modal" open={open} onOpenChange={setOpen}>
        <p>
          This is a modal. You can put anything you want in here. And It can be
          nested.
        </p>
      </Modal>
    </>
  )
}

export const NestedModal = () => {
  const { present, dismissAll } = useModalStack()
  return (
    <>
      <Button
        onClick={() => {
          present({
            title: "Nested Modal",

            content: () => (
              <div>
                <p>Modal 1</p>
                <Button
                  onClick={() => {
                    present({
                      title: "Nested Modal 2",
                      content: () => (
                        <div>
                          Modal 2
                          <p>
                            <Button onClick={dismissAll}>Dismiss All</Button>
                          </p>
                        </div>
                      ),
                    })
                  }}
                >
                  Open Modal 2
                </Button>
              </div>
            ),
          })
        }}
      >
        Open Nested Modal
      </Button>
    </>
  )
}
