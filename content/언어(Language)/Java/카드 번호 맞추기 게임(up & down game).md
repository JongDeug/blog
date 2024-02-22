---
title: 카드 번호 맞추기 게임(up & down game)
draft: false
tags:
  - Java
  - migration
date: 2020-04-09
---

## 추가된 게임 룰

- 카드 값의 범위를 99 이하에서 랜덤하게 결정하시오.  
  단, 최소값과 최대값의 범위가 50이상 차이나도록 제한하시오.

- 정답을 추정할 수 있는 횟수를 5회로 제한하시오.

## 문제해결에 있어서 어려웠던 점

입력 값(input)을 넣고 up & down을 알려주게끔 하는 코드에서 최댓값(max)과 최솟값(min) 범위 값을 다시 설정해야 했을 때 문제 해결에 어려움을 직면했습니다.

## 해결 과정

min이나 max에 이전 입력 값을 다시 넣어주어 해결했습니다.

```java
min = input;  //min에 입력값을 넣어주어 범위를 다시 설정한다.
System.out.println("더 높게");
System.out.print(min + " ~ " + max);
```

## 전체 코드

```java
import java.util.Scanner;
import java.util.Random;

public class OpenChallenge {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        Random randomNumber = new Random(); // Random 클래스 사용
        int max, min; // 최댓값, 최솟값을 저장하는 변수
        int cardNumber; // 컴퓨터가 숨기는 임의의 수를 저장하는 변수
        int count = 1; // 제한 횟수에 이용되는 변수
        int input = 0; // 입력값을 저장하는 변수

        while (true) {
            max = randomNumber.nextInt(100); // 0~99까지의 임의의 수를 max에 저장
            min = randomNumber.nextInt(100); // 0~99까지의 임의의 수를 min에 저장

            // (max > min)인 경우와 최댓값과 최솟값의 차이가 50이상인 경우
            if (max > min && (max - min >= 50)) {
                cardNumber = randomNumber.nextInt(100); // cardNumber에 임의의 수 저장

                // (min <= cardNumber <= max)인 경우
                if ((cardNumber >= min) && (cardNumber <= max)) {
                    System.out.println("수를 결정하였습니다. 맞추어 보세요.(5번 제한)");
                    System.out.println(min + " ~ " + max); // 임의의 수가 어느 범위에 있는지 알려주기 위해 작성.

                    // 일단 한 번 시작하고 count가 6이 아닐 동안 계속 실행.
                    do {
                        System.out.print(count + ">>"); // 제한 횟수와 입력 커서를 나타내주기 위한 코드.
                        input = scanner.nextInt();

                        // (min <= input(입력값) <= max)인 경우
                        if (input >= min && input <= max) {

                            // 입력값이 임의의 수보다 작을 경우
                            if (input < cardNumber) {
                                min = input; // min에 입력값을 넣어주어 범위를 다시 설정한다.
                                System.out.println("더 높게");
                                System.out.print(min + " ~ " + max);
                            }
                            // 입력값이 임의의 수보다 클 경우
                            else if (input > cardNumber) {
                                max = input; // max에 입력값을 넣어주어 범위를 다시 설정한다.
                                System.out.println("더 낮게");
                                System.out.print(min + " ~ " + max);

                            }
                            // 입력값이 임의의 수랑 같을 경우
                            else {
                                System.out.println("정답입니다!!");
                                break;
                            }

                            // 남은 횟수를 출력하고 count를 1증가 시킨다.
                            System.out.println("(남은 횟수 : " + (5 - count) + ")");
                            count++;
                        }

                        // 그렇지 않으면 다시 입력하라는 문구를 출력.
                        else
                            System.out.println("잘못 입력하셨습니다. 다시 입력해주세요");

                    } while (count != 6);

                    count = 1; // count를 1로 초기화
                    System.out.println("다시하시겠습니까?? (y/n)");
                    String text = scanner.next();

                    // 입력값이 y가 아니면 종료.
                    if (!text.equals("y"))
                        break;
                }
                // continue가 굳이 필요하지 않지만 읽기 편하기(?)위해 써봤습니다. 그렇지 않으면 다시 위로.
                else
                    continue;
            }
            // continue가 굳이 필요하지 않지만 읽기 편하기(?)위해 써봤습니다. 그렇지 않으면 다시 위로.
            else
                continue;
        }
        scanner.close();
    }
}
```

틀린 점이나 보완할 점 있으면 피드백 부탁드립니다.

좋은 하루 보내세요.
