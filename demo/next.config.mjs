// const withMDX = require("@next/mdx")()
import withMDX from "@next/mdx"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["rc-modal-sheet"],
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
}

export default withMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
  },
})(nextConfig)
