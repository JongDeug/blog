---
title: Part 2. 블로그 생성
draft: false
tags:
  - 블로그
  - blog
date: 2024-02-21
---
## 들어가기에 앞서

==Obsidian을 사용하는 분들에게 권장드립니다.==
## 참조 링크

- [유튜브](https://www.youtube.com/watch?v=6s6DT1yN4dw)
- [quartz 공식 문서](https://quartz.jzhao.xyz/)

## 블로그 생성

**위 두 링크만 참조해도 블로그를 만드는데 어려움이 없을 것입니다.**

그럼에도 혹시 모르니 공유하겠습니다.

### Step 1 프로젝트 생성

```
git clone https://github.com/jackyzha0/quartz.git <원하는 폴더 이름>

cd <원하는 폴더 이름>

npm i

npx quartz create
```

![[Pasted image 20240221220740.png]]
Empty Quartz -> Treat links as shortest path 순으로 선택합니다.

### Step 2 Github 연동

이제 Github Repository를 생성하고 해당 프로젝트와 연결할 것입니다. 혹시 Github Repository 생성 방법을 모르신다면 구글링 해보시길 바랍니다.

```
git remote remove origin
git remote add origin <레포지토리 HTTPS or SSH>
```

`git remote -v` 명령어를 통해 `origin`이 변경됐는지 확인합니다.
![[Pasted image 20240221225711.png]]

마지막으로 `npx quartz sync --no-pull`를 명령어를 이용해 저장소에 파일을 올립니다.

### Step 3 Obisidian 설정 및 게시글 올리기

Obisidian 앱에서 해당 프로젝트 폴더로 이동합니다. 

Longform 플러그인 설치
![[Screenshot from 2024-02-21 22-16-43.png]]

Templater 설치
![[Screenshot from 2024-02-21 22-16-53.png]]

프로젝트 폴더에 `templates` 폴더 생성 => 새 노트
![[Pasted image 20240221222812.png]]

`templates` 새 노트 상단에 해당 텍스트 추가
```
---
title: <% tp.file.title %>
draft: false
tags:
  - example-tag
---
```
참고로 `draft`를 체크하면 블로그에 올라가지 않습니다.

설정 => Longform => New scene template => templates/템플릿이름.md
![[Pasted image 20240221223304.png]]

`content` 폴더를 우클릭 => Create Longform Project 클릭
![[Pasted image 20240221222128.png]]

Create
![[Pasted image 20240221222204.png]]

상단 Longform 메뉴 이동 => New Scene에 원하는 게시글 제목 입력
![[Pasted image 20240221223729.png]]

원하는 게시글을 작성하고 `npx quartz build --serve` 명령어를 통해 현 상태를 잠시 확인해봅시다.

짜잔! 😆 게시글이 잘 올라간 것을 볼 수 있습니다.
![[Pasted image 20240221230644.png]]

### Step 4 Github 페이지 생성

`quartz/.github/workflows/deploy.yml` 생성

```
name: Deploy Quartz site to GitHub Pages
 
on:
  push:
    branches:
      - v4
 
permissions:
  contents: read
  pages: write
  id-token: write
 
concurrency:
  group: "pages"
  cancel-in-progress: false
 
jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Fetch all history for git info
      - uses: actions/setup-node@v3
        with:
          node-version: 18.14
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: public
 
  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

Repository => Settings => Pages => Source => Gihub Actions 선택
![[Pasted image 20240221232018.png]]

설정을 모두 하고 `npx quartz sync` 명령어를 통해 저장소에 파일을 올리면 Actions 탭에서 상태를 확인 할 수 있습니다.
![[Pasted image 20240221232355.png]]

deploy가 다 됐다면 해당 페이지 링크로 이동해봅시다.
![[Pasted image 20240221232459.png]]

잘 올라간 것을 확인했습니다!
![[Pasted image 20240221232546.png]]
