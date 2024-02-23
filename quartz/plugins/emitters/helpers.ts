import path from "path"
import fs from "fs"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import matter from "gray-matter"

type WriteOptions = {
  ctx: BuildCtx
  slug: FullSlug
  ext: `.${string}` | ""
  content: string | Buffer
}

export const write = async ({ ctx, slug, ext, content }: WriteOptions): Promise<FilePath> => {
  const pathToPage = joinSegments(ctx.argv.output, slug + ext) as FilePath
  const dir = path.dirname(pathToPage)
  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.writeFile(pathToPage, content)
  return pathToPage
}

// Edit Longform Index.md
export const EditLongform = async () => {
  const contentItems = await fs.promises.readdir("content", {
    encoding: "utf-8",
    recursive: true,
    withFileTypes: true,
  })
  for (let item of contentItems) {
    if (item.isFile() && item.name.toLowerCase() === "index.md" && item.path !== "content") {
      const itemFilePath = path.join(item.path, item.name)
      const file = await fs.promises.readFile(itemFilePath)

      // title property 추가
      const frontMatter = matter(file)
      frontMatter.data["title"] = frontMatter.data.longform.title
      await fs.promises.writeFile(itemFilePath, frontMatter.stringify(""))

      // Index -> index 변경
      const oldPath = path.join(item.path, item.name)
      const newPath = path.join(item.path, "index.md")
      await fs.promises.rename(oldPath, newPath)
    }
  }
}
