import { buildFsTree } from "@/lib/fs"

import { LeftAsideLink } from "./LeftAsideLink"

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
