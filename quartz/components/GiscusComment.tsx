import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const GiscusComment: QuartzComponent = () => {
  return <div class="giscus"></div>
}

export default (() => GiscusComment) satisfies QuartzComponentConstructor
