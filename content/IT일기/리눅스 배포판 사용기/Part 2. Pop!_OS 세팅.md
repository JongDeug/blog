---
title: Part 2. Pop!_OS 세팅
draft: false
tags:
  - 리눅스-배포판-사용기
date:
---
## 🌟 자주 사용하는 단축키 

### 간단한 단축키

**SUPER key는 Window key입니다.** [더 자세한 키보드 단축키](https://support.system76.com/articles/pop-keyboard-shortcuts/) 

| Shortcut  | Action   |
| --------- | -------- |
| SUPER     | 검색       |
| SUPER + T | 터미널 열기   |
| SUPER + F | Files 열기 |
| SUPER + Q | 창 닫기     |

### 화면, 워크스페이스

| Shortcut                    | Action           |
| --------------------------- | ---------------- |
| SUPER + Y                   | 타일링 켜기/끄기        |
| SUPER + Direction keys      | 창 초점 이동          |
| SUPER + Ctrl + 위/아래         | 워크스페이스 간 이동      |
| SUPER + Shift + 위/아래        | 워크스페이스 간 활성 창 이동 |
| SUPER + Enter => Ctrl + 왼/오 | 창 조정 모드 => 창 교체  |
## 🌟 터치 패드 설정

Pop!\_OS에서 터치 패드 스크롤 방향이 기존과 다르므로 설정에서 변경해줬습니다.

![[Screenshot from 2024-03-08 19-48-00.png]]

## 🌟 한글 입력 설정

사진을 따라 진행하시면 됩니다.

### 한국어 설치

![[Screenshot from 2024-03-09 13-13-51.png]]
![[Screenshot from 2024-03-09 13-15-35.png]]
![[Screenshot from 2024-03-09 13-16-45.png]]

### 입력 설정

사진과 달리 처음 설정에 들어가면 다른 Input Soruce들이 존재할 것입니다.  Korean(Hangul)을 추가하여 최상단에 올려주고 다른 Input Source들은 모두 삭제해줍니다.
![[Pasted image 20240309132114.png]]
이제 한/영 키와 한자 키를 설정하도록 하겠습니다.
![[Screenshot from 2024-03-09 13-25-00.png]]
저는 기존에 있는 단축키를 모두 삭제하고 Alt_R, Control_R 키로 한/영, 한자 키를 설정했습니다.

![[Screenshot from 2024-03-09 13-26-06.png]]
![[Screenshot from 2024-03-09 13-26-13.png]]

 ==혹시나 제대로 작동되지 않으면 재시작을 한 번 해보시길 바랍니다.==

## 🌟 테마 설치

제 테마는 MacOS 입니다. 만족스럽게 사용하고 있습니다. 👍

![[Pasted image 20240309111744.png]]

### Tweaks 설치

먼저 Gnome 테마를 관리해주는 tweaks를 설치해야 합니다.

```
sudo apt install gnome-tweaks
```

### 화면 조정

OS 설정에서 화면 스케일링을 변경하면 UI가 너무 커집니다. 따라서 저는 Tweaks Fonts 설정에서 화면 스케일링을 조정했습니다.
![[Screenshot from 2024-03-09 10-34-05.png]]

### 테마 설치 및 적용

[Gnome 테마 설치 사이트](https://www.gnome-look.org/browse/)에서 GTK3/4 Themes / Full Icon Themes / Cursor 목록에 들어가서 원하는 테마를 설치합니다. 

모두 설치하고 나면 Downloads 폴더에서 설치된 압축 파일들을 볼 수 있습니다. **먼저 Home/.themes, Home/.icons 폴더를 생성하고 여기에 설치된 파일들을 압축 해제해주시면 됩니다. 숨겨진 폴더 및 파일은 Ctrl + H 단축키로 확인할 수 있습니다.)** 참고로 Cursor 테마는 .icons 폴더에 넣으시면 됩니다.

![[Screenshot from 2024-03-09 10-57-53.png]]
Tweaks를 실행하고 Appearance 탭에서 설치한 테마를 적용하면 끝입니다.
![[Screenshot from 2024-03-09 11-08-10.png]]

## 🌟 Zsh

Zsh란 Bash의 확장 버전입니다. 예쁜 테마를 적용할 수 있고, 유용한 플러그인이 많아 Zsh를 사용하고 있습니다. 

### 설치

Zsh 설치
```
sudo apt install zsh
```

Bash에서 Zsh로 변경
```
chsh -s $(which zsh)
```

**Zsh를 사용하려면 로그아웃을 했다가 다시 로그인해야 합니다.**

### 테마 적용

[oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) 설치
```
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

[테마 살펴보기](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)에서 원하는 테마의 이름을 복사해둡니다.

테마 변경
```
vi ~/.zshrc
```

테마 적용
![[Screenshot from 2024-03-09 12-12-07.png]]
변경사항 적용
```
source ~/.zshrc
```

### 플러그인 적용

[zsh-syntax-highlighting, 구문 강조](https://github.com/zsh-users/zsh-syntax-highlighting), [zsh-autosuggestions, 명령어 자동 제안](https://github.com/zsh-users/zsh-autosuggestions) 플러그인을 적용해보도록 하겠습니다.

플러그인 설치
```
sudo apt install zsh-autosuggestions

sudo apt install zsh-syntax-highlighting
```

~/.zshrc 파일에 플러그인 주입
```
echo "source /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc

echo "source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

확인
![[Screenshot from 2024-03-09 12-48-06.png]]