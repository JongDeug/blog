---
title: Part 3. 블로글 설정 및 디자인
draft: false
tags:
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

디자인은 입맛대로 변경하시면 되는데 주로 `프로젝트폴더/quartz/components/`, `프로젝트폴더/quartz/styles/`, `프로젝트폴더/quartz/quartz.layout.ts` 에서 이뤄집니다. 여러분들은 더 이쁘게 구성하실 거라 생각합니다. 👍 혹시나 문제가 해결되지 않으면 댓글로 문의하시길 바랍니다. 제가 최대한 아는 선에서 답변 드리겠습니다!

### Step 3 라우팅

quartz에서 `build`를 하고 나면 `content` 내용물이 `html` 파일로 변환되어 `public`에 저장됩니다. (파일이 아닌 폴더의 경우 `index.html`이 추가로 생성됩니다.) 따라서 폴더 및 파일 경로에 따라 `url`이 생성되고, `slug` 변수를 통해 경로를 다룰 수 있습니다.

> [!info] 참고
> 파일이 아닌 폴더의 경우 `index.html`이 추가로 생성됩니다. 하지만 폴더 안에 파일이 없고 폴더만 있는 경우 `index.html`을 생성하지 않습니다. 그래서 자동으로 `Index.md` 파일을 생성해주는 Longform 플러그인을 사용하는 것입니다. 꼭! 프로젝트를 생성하고 나면 `Index` => `index` 이름을 변경해주시길 바랍니다.

### Step 4 댓글 기능

제가 댓글 기능에서 막힌 부분이 있어 도움을 드리고자 작성했습니다.

우선 제가 사용한 댓글 오픈 소스는 [giscus](https://giscus.app/ko)입니다. 이 링크를 들어가셔서 해당 절차에 맞게 설정하시길 바랍니다.

**먼저 SPA 설정을 `false`로 변경해야 합니다. `true`로 설정하면 페이지 로드가 한 번만 되기 때문에 댓글 기능이 작동하지 않습니다.**

`프로젝트폴더/quartz.config.ts`

```javascript
enableSPA: false
```

giscus 설정을 다하셨다면 `<script>` 태그를 얻으셨을 겁니다. 이를 아래와 같이 `Content.tsx` 파일에 넣어줍니다.

`프로젝트폴더/quartz/components/pages/Content.tsx` 변경

```typescript
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { simplifySlug } from "../../util/path"

function Content({ fileData, tree }: QuartzComponentProps) {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  const url = simplifySlug(fileData.slug!)

  return (
    <div>      <article class={classString}>{content}</article>
      {/*댓글 기능*/}
      {url !== "/" && url !== "About-Me" && url !== "Projects" && (
        <>
          <div className="giscus"></div>
          <script
	        src="https://giscus.app/client.js"
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
            async
          />
        </>
      )}
    </div>  )}

export default (() => Content) satisfies QuartzComponentConstructor
```

다음 : [[Part 4. 블로그 검색 노출]]
