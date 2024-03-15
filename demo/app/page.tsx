"use client"

import { useModalStack } from "~/modal"

import { Button, buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const { present } = useModalStack()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed Modal Component{" "}
          <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          Click the button below to present a modal. You can also click outside
          the modal to dismiss it.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            present({
              title: "Modal",
              content: () => (
                <>
                  <IndexPage />

                  <p>
                    This is a modal. You can put anything you want in here. And
                    It can be nested.
                  </p>
                </>
              ),
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
