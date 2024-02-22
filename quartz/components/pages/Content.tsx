import { htmlToJsx } from "../../util/jsx"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { simplifySlug } from "../../util/path"

function Content({ fileData, tree }: QuartzComponentProps) {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  const url = simplifySlug(fileData.slug!)

  return (
    <div>
      <article class={classString}>{content}</article>
      {/*댓글 기능*/}
      {url !== "/" && url !== "About-Me" && url !== "Projects" && (
        <>
          <div className="giscus"></div>
          <script
            src="https://giscus.app/client.js"
            data-repo="JongDeug/blog"
            data-repo-id="R_kgDOLUUAwA"
            data-category="General"
            data-category-id="DIC_kwDOLUUAwM4CdV1Q"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="light"
            data-lang="ko"
            crossOrigin="anonymous"
            async
          />
        </>
      )}
    </div>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor
