import { htmlToJsx } from "../../util/jsx"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"

function Content({ fileData, tree }: QuartzComponentProps) {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return (
    <article class={classString} google-site-verification="IdKNSYovLknLuzuPQg8ntuCHMCDHq_dB4ToYqaFJRts">
      {content}
    </article>
  )
}


export default (() => Content) satisfies QuartzComponentConstructor
