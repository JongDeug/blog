---
title: Part 3. 블로글 설정 및 디자인
draft: false
tags:
  - blog
  - quartz
  - obsidian
  - 블로그-생성기
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

quartz에서 `build`를 하고 나면 `content` 내용물이 `html` 파일로 변환되어 `public`에 저장됩니다. 따라서 폴더 및 파일 경로에 따라 `url`이 생성되고, `slug` 변수를 통해 경로를 다룰 수 있습니다.

##### ⚠️ 문제 
quartz에서 폴더 안에 파일이 있는 경우 폴더 `index.html`이 자동으로 생성됩니다. 하지만 파일이 없는 폴더의 경우(+ 폴더만 있는 경우) `index.html`을 생성하지 않습니다. 

폴더 구조로 설명 드리자면, 


```
content/
├─ IT일기/
│  ├─ 블로그 생성기/
│  │  ├─ 게시글.md
├─ 회고/
```

`build` 를 거치면

```
public/
├─ IT일기/
│  ├─ 블로그 생성기/
│  │  ├─ index.html
│  │  ├─ 게시글.md

```

**IT일기, 회고 파일은 `index.html` 파일이 생성되지 않아 해당 경로로 들어가면 404 페이지가 뜰 것입니다.**
##### ✌ 해결 

공식 문서 참조

	You can override this by creating an `index.md` file in the folder with the `title` front- matter field.

> [!info] 첫 번째 방법
> 

 사실 제일 쉬운 방법은 모든 폴더에 직접 `title` property가진 `index.md`를 추가하면 됩니다. **하지만! 너무 귀찮습니다.**  


> [!info] 두 번째 방법
> 

 저는 첫 번째 방법을 자동화하는 방법을 선택했습니다.
 
 
```typescript title="프로젝트폴더/quartz/plugin/emitters/helpers.ts" {2-48}
...
// Create index.md  
export const createIndexMd = async () => {  
  const contentItems = await fs.promises.readdir("content", {  
    encoding: "utf-8",  
    recursive: true,  
    withFileTypes: true,  
  })  
  
  // index.md 생성  
  for (let item of contentItems) {  
    try {  
      if (!item.isFile() && item.name !== "image") {  
        const dir = path.join(item.path, item.name, "index.md")  
  
        // tag 처리 1차: 폴더이름, 2차: 상위 폴더이름  
        let tag: string[] = []  
  
        // 1차  
        let current = filterTag(item.name)  
        tag.push(current)  
  
        // 2차  
        const parentItem = item.path.split("/")  
        if (parentItem[parentItem.length - 1] !== "content") {  
          let parent = filterTag(parentItem[parentItem.length - 1])  
          tag.push(parent)  
        }  
  
        await fs.promises.writeFile(dir, `---\ntitle: ${item.name}\ntag: ${tag}\n---`)  
      }  
    } catch (e) {  
      console.log(e)  
    }  }  
}  
  
const filterTag = (item: string) => {  
  let result: string[] = []  
  
  item.split("").map(r => {  
    if (r !== "(" && r !== ")") {  
      if (r == " ") result.push("-")  
      else result.push(r)  
    }  
  })  
  
  return result.join('')  
}
```

```typescript title="프로젝트폴더/build.ts" {10-11}
...

async function buildQuartz(argv: Argv, mut: Mutex, clientRefresh: () => void) {  
  const ctx: BuildCtx = {  
    argv,  
    cfg,  
    allSlugs: [],  
  }  
  
  // Create index.md  
  await createIndexMd()

...
```

### Step 4 댓글 기능

제가 댓글 기능에서 막힌 부분이 있어 도움을 드리고자 작성했습니다.

우선 제가 사용한 댓글 오픈 소스는 [giscus](https://giscus.app/ko)입니다. 이 링크를 들어가셔서 해당 절차에 맞게 설정하시길 바랍니다.

**먼저 SPA 설정을 `false`로 변경해야 합니다. `true`로 설정하면 페이지 로드가 한 번만 되기 때문에 댓글 기능이 작동하지 않습니다.**



```javascript title="프로젝트폴더/quartz.config.ts"
enableSPA: false
```

giscus 설정을 다하셨다면 `<script>` 태그를 얻으셨을 겁니다. 이를 아래와 같이 `Content.tsx` 파일에 넣어줍니다.

```typescript title="프로젝트폴더/quartz/components/pages/Content.tsx" {3,9,14-35}
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
