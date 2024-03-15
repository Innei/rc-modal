import { readFileSync } from "fs"
import { resolve } from "path"

import { extractFirstHeadingText, parseYamlFrontMatterSync } from "@/lib/remark"

import { LeftAsideLink } from "./LeftAsideLink"

interface Tree {
  to: string
  title: string
  order: number
}
const buildFsTree = () => {
  const filePaths = (
    require
      // @ts-expect-error
      .context("../../app/(mdx)/", true, /\.mdx$/)
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

export const LeftAside = async ({ asWeight }: { asWeight?: boolean }) => {
  const tree = buildFsTree()

  return (
    <aside className={asWeight ? "" : "sticky top-24 mt-24 min-h-[300px]"}>
      <ul>
        {tree.map((t) => {
          return (
            <li key={t.title} className="mt-3 font-semibold">
              <LeftAsideLink path={t.to} title={t.title} key={t.title} />
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
