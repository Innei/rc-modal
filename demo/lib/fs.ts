import { readFileSync } from "fs"
import { resolve } from "path"

import { extractFirstHeadingText, parseYamlFrontMatterSync } from "@/lib/remark"

interface Tree {
  to: string
  title: string
  order: number
}

export const buildFsTree = () => {
  const filePaths = (
    require
      // @ts-expect-error
      .context("../app/(mdx)/", true, /\.mdx$/)
      .keys() as string[]
  ).filter((path) => path.startsWith("./"))

  // [ './guide/install/page.mdx', 'app/(mdx)/guide/install/page.mdx' ]

  const tree = [] as Tree[]
  for (let filePath of filePaths) {
    const path = filePath
      .split("/")
      .slice(1, -1)
      .join("/")
      .replace(/\.mdx$/, "")
    // const depth = path.split("/").length

    const fileContent = readFileSync(
      resolve(process.cwd(), `app/(mdx)/${filePath}`),
      "utf-8"
    )
    const yaml = parseYamlFrontMatterSync(fileContent)
    const title = extractFirstHeadingText(fileContent)

    // console.log({ path: `/${path}`, title, depth })
    tree.push({ to: `/${path}`, title: title || "", order: yaml.order })
  }

  return tree.sort((a, b) => a.order - b.order)
}
