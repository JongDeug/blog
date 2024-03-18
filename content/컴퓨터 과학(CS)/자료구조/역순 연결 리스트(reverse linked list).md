---
title: 역순 연결 리스트(reverse linked list)
draft: false
tags:
  - 자료구조
  - C
  - 역순연결리스트
  - migration
date: 2020-06-01
---

## 들어가기에 앞서

c언어로 작성된 코드입니다.

## 역순 연결 리스트

역순 연결 리스트(reverse linked list)는 단순 연결 리스트(singly linked list)를 역순으로 바꾼 연결 리스트입니다.

## 소스 코드

```c
ListNode *reverse(ListNode *head)
{
    ListNode *p,*q,*r;
    p = head;
    q = NULL;

    while (p != NULL)
    {
        r = q;
        q = p;
        p = p->link;
        q->link = r;
    }
    return q;
}
```

## 그림

1. 포인터 p,q,r 을 선언하고 `while( p! = NULL)` 이전까지의 변화를 그림으로 나타냈습니다. 코드 순으로 그림에 1, 2와 같이 표기하였습니다.
![[Pasted image 20240318151529.png]]
2. while문 scope을 **첫 번째**로 실행한 후의 모습입니다.
![[Pasted image 20240318151542.png]]

3. while문 scope을 **두 번째**로 실행한 후의 모습입니다.
![[Pasted image 20240318151552.png]]

4. while문 scope을 **세 번째**로 실행한 후의 모습입니다.
![[Pasted image 20240318151601.png]]

5. while문 scope을 **마지막**으로 실행한 후의 모습입니다.
![[Pasted image 20240318151613.png]]
결국 `ListNode *q`가 가리키는 연결 리스트는  40 -> 30 -> 20 -> 10 -> NULL으로 바뀌게 되었고, 매개변수인 `ListNode *head`의 역순이 되었습니다!

## 느낀 점

처음에는 책을 봐도 이해되지 않았는데, 코드 순서대로 그림을 그려보며 공부해보니 이해가 됐습니다.

틀린 부분 있으면 피드백 부탁드립니다.

감사합니다. 좋은 하루 보내세요.
