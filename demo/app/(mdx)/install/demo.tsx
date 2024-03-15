"use client"

import { useModalStack } from "rc-modal-sheet"

import { Button } from "@/components/ui/button"

export const Basic = () => {
  const { present } = useModalStack()
  return (
    <Button
      onClick={() => {
        present({
          title: "Modal",
          content: () => (
            <>
              <p>
                This is a modal. You can put anything you want in here. And It
                can be nested.
              </p>
            </>
          ),
        })
      }}
    >
      Open a modal
    </Button>
  )
}
