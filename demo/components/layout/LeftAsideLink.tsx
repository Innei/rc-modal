"use client"

import { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsxm } from "~/lib/helper"

export const LeftAsideLink = memo(
  ({ title, path }: { title: string; path: string }) => {
    const pathname = usePathname()

    return (
      <span
        className={clsxm(
          "font-medium opacity-40 duration-200 hover:opacity-90 text-black dark:text-white",

          pathname === path && "opacity-100"
        )}
        key={path}
      >
        <Link href={path}>{title}</Link>
      </span>
    )
  }
)

LeftAsideLink.displayName = "LeftAsideLink"
