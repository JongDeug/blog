import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function AboutMe(props: QuartzComponentProps) {

  return (
    <div>안녕하세요</div>
  )
}

export default (() => AboutMe) satisfies QuartzComponentConstructor