---
title: Part 4. 블로그 검색 노출
draft: false
tags:
  - blog
  - quartz
  - obsidian
  - 블로그-생성기
date: 2024-02-22
---

## 🌟 들어가기에 앞서

먼저 sitemap과 rss를 활성화 시켜야 합니다. `프로젝트폴더/quartz.config.ts` 에서 `enableSiteMap: true`, `enableRSS: true`가 설정되어 있는지 확인합니다.

## Google에 sitemap 등록

[Google Search Console](https://search.google.com/search-console?hl=ko)으로 접속합니다.

![[Pasted image 20240222012136.png]]

태그를 통한 인증
![[Pasted image 20240222012231.png]]

`프로젝트폴더/quartz/components/Head.tsx`에 `<meta>` 태그를 추가하고 소유권을 인증합니다.

마지막으로 좌측 메뉴 Sitemaps에서 `/sitemap.xml`과 `/index.xml` 을 추가하면 됩니다.
![[Pasted image 20240222012419.png]]

## 🌟 색인 수동 생성

사이트맵을 등록했음에도 며칠간 색인이 생성되지 않았습니다. 결국 수동으로 색인을 생성해 문제를 해결했습니다. 다음은 색인을 수동으로 생성하는 방법입니다.

먼저 브라우저에 `블로그url/sitemap.xml` URL을 입력하면 해당 페이지가 나옵니다.

![[Pasted image 20240319185015.png]]


여기에 있는 URL들을 하나하나 복사해서 아래 사진과 같이 순서대로 진행했습니다. 하루에 색인 생성 요청 할당량이 정해져 있어 저는 며칠간 나눠서 진행했습니다.

![[Screenshot from 2024-03-19 18-47-27.png]]

색인이 완료되었는지 직접 확인하고 싶으시면 크롬에서 `site:https://블로그주소` URL을 입력하시면 생성된 색인 목록들이 나옵니다!

![[Pasted image 20240319185512.png]]


## 🌟 끝

이상으로 블로그 생성기를 마치겠습니다. 옛날에 Jeklly 블로그 생성 과정에 대해 글을 작성하신 분이 있었는데 많은 도움을 받았습니다. 저 또한 도움이 됐으면 좋겠습니다.

좋은 하루 보내세요.
