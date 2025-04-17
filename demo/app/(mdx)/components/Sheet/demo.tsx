"use client"

import { useState } from "react"
import { PresentSheet } from "rc-modal-sheet"

import { Button } from "@/components/ui/button"

export const MySheet = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open Sheet
      </Button>
      <PresentSheet
        open={open}
        onOpenChange={setOpen}
        content={<div>Sheet Content</div>}
      />
    </>
  )
}
