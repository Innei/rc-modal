"use client"

import { useModalStack } from "rc-modal-sheet"

import { Button, buttonVariants } from "@/components/ui/button"

import IndexPage from "./page"

export const Hero = () => {
  const { present } = useModalStack()
  return (
    <section className="container mt-32 flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Beautifully designed Modal Component{" "}
            <br className="hidden sm:inline" />
            built with Radix UI and Tailwind CSS.
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            Click the button below to present a modal. You can also click
            outside the modal to dismiss it.
          </p>
        </div>
      </div>
      <div className="mt-12 flex gap-4">
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

                  <p className="mt-6">
                    This modal will display on a small screen is not the same as
                    on a large screen, and is converted to a sheet style in
                    order to better render the content on a small screen. Now
                    you can try reducing the width of your browser window
                  </p>
                </>
              ),
            })
          }}
          className={buttonVariants()}
        >
          Try a Demo
        </Button>
      </div>
    </section>
  )
}
