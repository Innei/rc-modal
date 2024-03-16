import "@/styles/globals.css"

import { Metadata } from "next"
import { clsxm } from "~/lib/helper"
import { MobileDetector } from "rc-modal-sheet/src/helpers/mobile-detector"
import { ModalStackContainer } from "rc-modal-sheet/src/helpers/motion"

import "./index.css"

import type { SVGProps } from "react"
import Script from "next/script"
import { PresentSheet } from "~/sheet"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

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
        <body
          className={`bg-background min-h-screen antialiased ${GeistSans.className}`}
        >
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

                      <main className="min-w-0 px-4 py-14 xl:px-2">
                        {children}
                      </main>

                      <PresentSheet content={<LeftAside asWeight />}>
                        <button className="fixed bottom-4 right-4 z-10 block rounded-full border border-zinc-200 bg-white p-2 text-black shadow xl:hidden dark:border-zinc-800 dark:bg-gray-950 dark:text-white">
                          <MaterialSymbolsMenuBookOutlineRounded />
                        </button>
                      </PresentSheet>
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

function MaterialSymbolsMenuBookOutlineRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.5 16q1.175 0 2.288.263T11 17.05V7.2q-1.025-.6-2.175-.9T6.5 6q-.9 0-1.788.175T3 6.7v9.9q.875-.3 1.738-.45T6.5 16m6.5 1.05q1.1-.525 2.213-.787T17.5 16q.9 0 1.763.15T21 16.6V6.7q-.825-.35-1.713-.525T17.5 6q-1.175 0-2.325.3T13 7.2zm-1 2.425q-.35 0-.663-.087t-.587-.238q-.975-.575-2.05-.862T6.5 18q-1.05 0-2.062.275T2.5 19.05q-.525.275-1.012-.025T1 18.15V6.1q0-.275.138-.525T1.55 5.2q1.15-.6 2.4-.9T6.5 4q1.45 0 2.838.375T12 5.5q1.275-.75 2.663-1.125T17.5 4q1.3 0 2.55.3t2.4.9q.275.125.413.375T23 6.1v12.05q0 .575-.487.875t-1.013.025q-.925-.5-1.937-.775T17.5 18q-1.125 0-2.2.288t-2.05.862q-.275.15-.587.238t-.663.087m2-10.7q0-.225.163-.462T14.525 8q.725-.25 1.45-.375T17.5 7.5q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.112T17.5 9q-.65 0-1.275.125t-1.2.325q-.45.175-.737-.025T14 8.775m0 5.5q0-.225.163-.462t.362-.313q.725-.25 1.45-.375T17.5 13q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.112T17.5 14.5q-.65 0-1.275.113t-1.2.312q-.45.175-.737-.012T14 14.275m0-2.75q0-.225.163-.462t.362-.313q.725-.25 1.45-.375t1.525-.125q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.112t-.788-.038q-.65 0-1.275.125t-1.2.325q-.45.175-.737-.025t-.288-.65"
      ></path>
    </svg>
  )
}
