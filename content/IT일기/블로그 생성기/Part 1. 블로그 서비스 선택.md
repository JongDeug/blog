---
title: Part 1. 블로그 서비스 선택
draft: false
tags:
  - blog
  - quartz
  - obsidian
date: 2024-02-20
---

## 블로그 선택

결론부터 말씀드리자면 저는 [quartz](https://github.com/jackyzha0/quartz) 정적 사이트 생성기를 활용해 블로그를 만들었습니다. Tistory, Velog, Jekyll, Hugo 등 여러 서비스가 존재하지만, Obsidian을 CMS로 꼭 사용하고 싶었습니다. (Jekyll의 Obsidian 지원 여부를 방금 알게 됐습니다. 😅 하지만 quartz가 더 완벽하게 호환됩니다.)

**이후 내용부터 제가 고민했던 것들에 대한 내용이니 blog를 빨리 만들고 싶으신 분들은 [[Part 2. 블로그 생성]] 으로 넘어가시면 됩니다!**

## 고민

사실 처음부터 quartz를 사용하려 했던 것은 아닙니다. 예전에 Jekyll을 활용해 블로그를 한 번 만들어 본 적이 있습니다. 당시 md 파일을 사용해서 블로그 게시글을 작성했는데 매우 귀찮아서 접었었습니다. 시간이 지나고 Obsidian을 알게 됐고 너무 편리해서 이걸로 제 블로그를 만들어보고 싶어졌습니다.

## 문제

Obsidian을 CMS로 사용하기 위해 md 파일을 html로 변환하는 소프트웨어를 만들어야 했습니다. 하지만 개발해 나갈수록 처리할 것이 너무 많았습니다. 게다가 취준생이라 불필요한 곳에 시간을 잡아먹고 있다는 생각이 들었습니다. 그래서 다른 방법을 찾아야 했습니다.

## 해결

구글, Reddit, Obsidian 커뮤니티에서 Obsidian을 CMS로 사용하는 blog가 없는지 찾아봤습니다.
이때 quartz를 찾았고, 딱 제가 원하던 기능을 구현해 준 오픈소스였습니다.
