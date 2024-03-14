"use client"

import { useModalStack } from "~/modal"

import { Button, buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const { present } = useModalStack()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            present({
              title: "Modal",
              content: () => <div>Modal</div>,
            })
          }}
          className={buttonVariants()}
        >
          Present
        </Button>
      </div>
    </section>
  )
}
