import { randomUUID } from "crypto"
import { JSX } from "preact/jsx-runtime"

export type JSResource = {
  loadTime: "beforeDOMReady" | "afterDOMReady"
  moduleType?: "module"
  spaPreserve?: boolean
} & (
  | {
      src: string
      contentType: "external"
    }
  | {
      script: string
      contentType: "inline"
    }
)

export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {
  const scriptType = resource.moduleType ?? "application/javascript"
  const spaPreserve = preserve ?? resource.spaPreserve
  if (resource.contentType === "external") {
    if (resource.src === "https://giscus.app/client.js") {
      return (
        <script
          key={resource.src}
          src={resource.src}
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
      )
    }

    return (
      <script key={resource.src} src={resource.src} type={scriptType} spa-preserve={spaPreserve} />
    )
  } else {
    const content = resource.script
    return (
      <script
        key={randomUUID()}
        type={scriptType}
        spa-preserve={spaPreserve}
        dangerouslySetInnerHTML={{ __html: content }}
      ></script>
    )
  }
}

export interface StaticResources {
  css: string[]
  js: JSResource[]
}
