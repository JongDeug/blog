---
title: Part 3. 블로글 설정 및 디자인
draft: false
tags:
  - 블로그
  - blog
  - quartz
  - obsidian
date: 2024-02-21
---
## 들어가기에 앞서

저는 `html`, `css`, `javascript`를 다룰 줄 알기에 조금은 수월하게 원하는 디자인을 구성했습니다. 기본 설정(컴포넌트 배치, 색상, `baseUrl` ...)을 제외하고 원하는 디자인을 구성하려면 적어도 `html`, `css`를 다룰 줄 알아야 합니다.

## 참고 링크

==공식 문서를 꼭 활용하시길 바랍니다.==
- [quartz 공식 문서](https://quartz.jzhao.xyz/)

## 블로그 설정 및 디자인 

### Step 1 기본 설정

공식 문서를 보면서 `프로젝트폴더/quartz.config.ts` 와 `프로젝트폴더/quartz.layout.ts` 파일을 변경하시면 됩니다. 

### Step 2 디자인

디자인은 원하시는 대로 변경하시면 되는데 주로 `프로젝트폴더/quartz/components/`, `프로젝트폴더/quartz/styles/`, `프로젝트폴더/quartz/quartz.layout.ts` 에서 이뤄집니다.

제가 프론트 개발자 지망생이 아니기 때문에 대충 입맛대로 바꿨습니다. 여러분들은 더 이쁘게 구성하실거라 생각합니다. 👍 혹시나 문제가 해결되지 않으면 댓글로 문의하시길 바랍니다. 제가 아는 선에서 최대한 답변드리겠습니다.

### Step 3 라우팅

quartz에서 `build`를 하고나면 `content`폴더 안의 파일들이 `html` 파일로 변경됩니다. 이들의 경로를 `slug`라고 합니다. 이를 활용해서 원하는 경로를 생성 하시면 됩니다.

> [!info] 추가로
> `index.md` 파일은 탐색기에서 보이지 않습니다.
> 제가 겪었던 문제인데 `Index` 파일을 탐색기에서 지우고 싶었습니다. 하지만 `Index` 파일을 지우게 되면 폴더 경로를 지우는 것과 마찬가지이므로 `Index` => `index` 로 변경했고 title property를 추가해 문제를 해결했습니다.

### Step 4 댓글 기능

제가 댓글 기능에서 막힌 부분이 있어 도움을 드리고자 작성했습니다. 

우선 제가 사용한 댓글 오픈 소스는 [giscus](https://giscus.app/ko)입니다. 이 링크를 들어가셔서 해당 절차에 맞게 설정하시길 바랍니다. 

설정을 다하셨다면 `<script>` 태그를 얻으셨을 겁니다.

`프로젝트폴더/quartz.config.ts`
```javascript
enableSPA: false
```
**SPA를 `true`로 설정하면 리로드가 되지 않기 때문에 링크를 타고 들어간다면 댓글 기능이 보이지 않는 문제가 생깁니다.**

`프로젝트폴더/quartz/components/GiscusComment.tsx` 추가
```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"  
  
const GiscusComment: QuartzComponent = () => {  
  return <div class="giscus"></div>  
}  
  
export default (() => GiscusComment) satisfies QuartzComponentConstructor
```

`프로젝트폴더/quartz/components/renderPage.tsx` 변경
```typescript
import GiscusCommentConstructor from "./GiscusComment"

...

export function pageResources(  
  baseDir: FullSlug | RelativeURL,  
  staticResources: StaticResources,  
): StaticResources {  
  ... 
  
  return {  
    css: [joinSegments(baseDir, "index.css"), ...staticResources.css],  
    js: [  
      ...
      // 추가 반드시 beforeDOMReady로 giscus 추가 
      {  
        src: "https://giscus.app/client.js",  
        loadTime: "beforeDOMReady",  
        contentType: "external",  
      },  
    ],  
  }  
}

...

// url 경로에 따른 giscus 컨트롤
const GiscusComment = GiscusCommentConstructor()  
const param = slug.split("/")  
const lastParam = param[param.length - 1]  
const firstParam = param[0]

...

const lang = componentData.frontmatter?.lang ?? cfg.locale?.split("-")[0] ?? "en"  
const doc = (  
  <html lang={lang}>  
  <Head {...componentData} />  
  <body data-slug={slug}>  
    <Body {...componentData}>  
	  ...
	  
        {/*Giscus 제어 추가*/}  
        {lastParam !== "index" && firstParam !== "About-Me" && firstParam !== "Projects" && firstParam !== "index" && firstParam !== "404" && firstParam !== "tags" &&  
          (<GiscusComment {...componentData} />)  
        }  
      
      ...
    </Body>  
  </body>

  {/*giscus script 태그는 JSResourceToScriptElement 참고*/}  
  {pageResources.js  
    .filter((resource) => resource.loadTime === "afterDOMReady")  
    .map((res) => JSResourceToScriptElement(res))}  
  </html>
)  

...
```

`프로젝트폴더/quartz/util/resources.tsx` 변경, 얻은 `<script>` 태그 추가
```typescript
export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {  
  const scriptType = resource.moduleType ?? "application/javascript"  
  const spaPreserve = preserve ?? resource.spaPreserve  
  if (resource.contentType === "external") {  
	
	// giscus script 태그 추가
    if (resource.src === "https://giscus.app/client.js") {  
      return (  
        <script  
          key={resource.src}  
          src={resource.src}  
          data-repo="JongDeug/blog"  
          data-repo-id=[추가]  
          data-category=[추가]  
          data-category-id=[추가]  
          data-mapping="pathname"  
          data-strict="0"  
          data-reactions-enabled="1"  
          data-emit-metadata="0"  
          data-input-position="bottom"  
          data-theme="light"  
          data-lang="ko"  
          crossOrigin="anonymous"  
          async />  
      )  
    } else {  
      return (  
        <script key={resource.src} src={resource.src} type={scriptType} spa-preserve={spaPreserve} />  
      )  
    }
  ...    
}
```

저와 `url`경로가 다를 테니 적절하게 변경하시길 바랍니다. 다 하셨다면 잘 작동하실 겁니다. 

> [!info] 참고로
> 제가 프론트 개발자 지망생이 아니다 보니 깔끔하지 않을 수 있습니다. 보다 나은 코드가 있으면 댓글로 공유 부탁드립니다!

다음 : [[Part 4. 블로그 검색 노출]]

