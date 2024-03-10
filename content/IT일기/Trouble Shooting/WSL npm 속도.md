---
title: WSL npm 속도 문제
draft: false
tags:
  - Trouble-Shooting
date: 2022-10-24
---
## 🌟 문제 직면

WSL(Window Subsystem for Linux)를 사용하여 개발하고 있는데 프로젝트 실행하는데 걸리는 시간이 너무 길었습니다. 처음에는 당연한 건 줄 알았지만 WSL을 사용하지 않는 다른 친구의 실행 시간을 보게 되었고, 제 환경이 비정상적이라는 것을 알게 됐습니다. 

## 🌟 문제 해결

`/mnt/c` 라는 곳에서 프로젝트를 개발했는데 이곳은 window의 C드라이브 입니다. WSL은 Window 드라이브에 액세스하는 것이 매우 느리다고 합니다. 

![[Pasted image 20240309154748.png]]


프로젝트 폴더를 `~/src`로 옮겨서 실행했더니 속도가 굉장히 빨라졌습니다. 

## 🌟 참고 링크
- https://github.com/microsoft/WSL/issues/9555
- https://learn.microsoft.com/en-us/windows/wsl/setup/environment#file-storage