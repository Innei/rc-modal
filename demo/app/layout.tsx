import "@/styles/globals.css"
import { Metadata } from "next"
import { MobileDetector } from "rc-modal-sheet/src/helpers/mobile-detector"
import { ModalStackContainer } from "rc-modal-sheet/src/helpers/motion"
import { clsxm } from "~/lib/helper"

import "./index.css"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { LeftAside } from "@/components/layout/sidebar"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

import { Hero } from "./hero"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="UTF-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism-themes/1.9.0/prism-one-dark.css"
          />
          <link
            href="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.css"
            rel="stylesheet"
          />
          <Script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/components/prism-core.min.js" />
          <Script
            src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js"
            async
          />
          <Script
            src="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.js"
            async
          />
        </head>
        <body className={"bg-background min-h-screen font-sans antialiased"}>
          <ThemeProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <ModalStackContainer clickOutsideToDismiss>
                <MobileDetector />
                <div className="flex-1">
                  <Hero />
                  <div className="m-auto mt-24">
                    <div
                      className={clsxm(
                        "relative mx-auto grid min-h-[calc(100vh-3rem-10rem)] max-w-full",
                        "gap-4 md:grid-cols-1 xl:max-w-[calc(60rem+400px)] xl:grid-cols-[1fr_minmax(auto,60rem)_1fr]",
                        "mt-12",
                        "md:mt-6 print:!block print:!max-w-full"
                      )}
                    >
                      <div
                        className="relative mr-4 hidden min-w-0 xl:block"
                        data-hide-print
                      >
                        <LeftAside />
                      </div>

                      <main className="min-w-0 px-4 py-14 lg:px-2">
                        {children}
                      </main>
                    </div>
                  </div>
                </div>
              </ModalStackContainer>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
