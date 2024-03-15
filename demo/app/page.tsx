import { redirect } from "next/navigation"

import { buildFsTree } from "@/lib/fs"

export default function IndexPage() {
  redirect(buildFsTree().at(0)!.to)
}
