---
title: 리눅스 패키지 의존성(Linux Package Dependencies)
draft: false
tags:
  - 리눅스-관련-지식
date: 2024-03-09
---
## 🌟 궁금증

리눅스 배포판을 사용하면서 **의존성(Dependencies)** 이란 단어를 자주 봤습니다. 처음에는 패키지 사이의 연관이 있겠거니~ 하며 넘겼지만, 이제는 정리가 필요할 것 같아 공부하게 됐습니다. 

### 들어가기에 앞서

데비안 계열 명령어로만 예시를 들 것입니다. 양해 바랍니다!

## 🌟 리눅스 패키지(Linux Package)

### 리눅스 패키지란?

먼저 의존성을 이해하기 위해서는 리눅스 패키지(Linux Package)에 대한 이해가 필요합니다. 

리눅스 패키지란 **실행 가능한 소프트웨어에 포함된 모든 파일을 포함하는 압축된 아카이브 파일(Archive file)을 말합니다.** 프로그램 설치 프로세스는 윈도우와 별반 다를 것이 없습니다.

### 리눅스 패키지 종류

소프트웨어가 배포될 때, 소스 코드 형태로 배포되는 **소스 패키지** 방식과 이미 컴파일된 파일이 들어있는 **바이너리 패키지** 방식이 있습니다.

#### 소스 패키지

소스 패키지는 소프트웨어를 이루고 있는 **소스 코드만을 포함**하는 단순한 패키지(일반적으로 `tar.gz`)입니다.  **따라서 사용자가 직접 컴파일하고 설치해야 합니다.**

**Ubuntu에서 소스 패키지 설치 예시**
```
wget http://nginx.org/download/nginx-<version>.tar.gz // 소스코드 설치
tar -zxvf nginx-1.20.2.tar.gz // 압축 해제
cd nginx-1.20.2 // 파일 이동
생략 // 환경 설정
make && make install // 빌드 및 설치
```

#### 바이너리 패키지 

**바이너리 패키지**는 소스 패키지와 달리 **이미 모든 것이 구축(컴파일)되어 있어 설치만 진행**하면 됩니다. 바이너리 패키지에는 프로그램을 설치하는데 필요한 파일, **메타데이터(버전 정보, 의존성)** 등이 포함되어 있습니다. 

**Ubuntu에서 바이너리 패키지 설치 예시**
```
sudo apt update
sudo apt install nginx
```

> [!note] 아하!
> 처음 Ubuntu를 접하고 프로그램을 설치했을 때, 무작정 복붙만해서 `wget`, `apt` 명령어 차이를 명확히 알지 못했는데, 패키지 종류에 따른 차이였음을 깨닫게 되었습니다.

### 다양한 패키지 포맷

#### Debian 패키지
Debian Linux 배포판에서 설계 및 개발되었습니다. `dpkg`, `apt` 등 여러 패키지 관리자가 있으며, 확장자는 `.deb` 입니다.

#### RPM 패키지
Red Hat Linux 배포판에서 설계 및 개발되었습니다. RPM(Red Hat Package Manager)을 사용하며, 
확장자는 `.rpm` 입니다.

#### TAR 아카이브
여러 파일과 폴더들을 모아 파일 하나로 만든 것입니다. 단, 압축은 하지 않습니다. `.tar` 확장자를 사용합니다. 
#### TGZ 아카이브
Tar 아카이브이지만, GNU Zip 압축 기술을 사용하여 압축한 것입니다. `.tgz` 확장자를 사용합니다.

#### GZip 아카이브
GZip 유틸리티를 사용하여 직접 압축하면 `.gz` 확장자가 생성됩니다.

## 🌟 리눅스 패키지 관리자(Linux Package Manager)

리눅스 패키지는 리눅스 패키지 관리자(Linux Package Manager)에 의해 설치됩니다. 

리눅스 패키지 관리자란 **패키지의 설치, 제거 및 업데이트를 관리하는데 사용되는 소프트웨어 도구**입니다. 데비안 계열에서 `dpkg`, `apt`와 같은 것들이 리눅스 패키지 관리자이며, **바이너리 패키지**를 관리해주는 도구입니다.

### 리눅스 패키지 관리자 구분

**Low-level Package management tools**는 주로 설치, 삭제, 업그레이드에 사용됩니다. 데비안 계열에서 `dpkg`가 바로 저수준 패키지 관리자 도구입니다. `dpkg`를 사용하면 **의존성을 수동으로 관리**해야 합니다.

**High-level Package management tools**는 저수준 역할을 수행할 뿐만 아니라 **의존성 문제를 자동으로 해결**해줍니다. 데비안 계열에서 `apt`가 바로 고수준 패키지 관리 도구입니다.

## 🌟 리눅스 패키지 의존성(Linux Package Dependencies)

**패키지가 다른 소프트웨어나 리소스를 필요로 할 수 있는데 이를 의존성**이라고 합니다. 

### 의존성 문제

Python 버전 3.1이 필요한 소프트웨어가 이미 설치되어 있다고 가정해봅시다. 버전 3.3이 필요한 다른 소프트웨어를 설치하려고 하는데 이때 충돌이 발생합니다. 바이너리 패키지에는 의존성이 담겨있는 메타데이터가 포함돼 있기 때문에 고수준 패키지 관리자는 이를 보고 의존성 문제를 자동으로 해결해줍니다.

==패키지 관리의 핵심은 이러한 의존성 문제를 해결하는 것입니다.==

### 데비안 계열 의존성 확인법

```
apt show <package-name>
```

## 🌟 명령어에 따른 패키지 관리자 동작 방식

![[Pasted image 20240309211036.png]]
출처 : https://itsfoss.com/package-manager/

### 저장소(Repository)
저장소(Repository)는 패키지 이름, 버전 정보, 의존성 등과 같은 **메타데이터 파일들을** 가지고 있는 공간입니다. **먼저 패키지 관리자는 메타데이터와 상호작용하여 리눅스 시스템에 메타데이터의 로컬 캐시를 생성합니다.**
### apt show 
`apt show` 는 패키지의 메타데이터 파일들을 확인할 수 있는 명령어입니다.

### apt update
`apt update` 명령어를 실행하면 **저장소의 메타데이터를 참조해서 리눅스 시스템에 생성된 로컬 캐시를 업데이트**합니다. 

### apt install
`apt install` 명령어를 실행하면 **먼저 로컬 캐시를 참고하여 패키지 정보를 찾습니다. 그 후 인터넷에 접속해 적절한 저장소를 찾아 연결 후 해당 패키지를 다운로드합니다.** 패키지에 의존성이 있을 수 있는데 `apt`는 설치 중인 패키지와 함께 의존성을 알아서 설치해줍니다.

이 외에도 패키지 관리자가 처리하는 일이 많습니다!

## 🌟 참고 링크

- https://itfriends.tistory.com/1
- https://itsfoss.com/package-manager/
- https://bradbury.tistory.com/227
- https://www.scaler.com/topics/cyber-security/package-management-in-linux/
- https://linuxsimply.com/linux-basics/package-management/dependencies/

틀린 부분 있으면 피드백 부탁드립니다.

감사합니다. 좋은 하루 보내세요 ~