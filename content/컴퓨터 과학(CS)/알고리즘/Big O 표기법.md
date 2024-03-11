---
title: Big O 표기법
draft: false
tags:
  - 알고리즘
date: 2024-02-26
---
## 좀 더 나은 코드란?

좀 더 나은 코드란 이러한 특징을 가지고 있습니다.

- 실행 속도가 더 빠르다. ✔️
- 메모리를 덜 사용한다.
- 좀 더 가독성이 있다.

실행 속도에 초점을 맞춰 코드의 성능을 분석하려면 어떻게 해야 할까요? 

바로 **코드의 실행 시간을 직접 재보면 됩니다.**

## 문제

하지만 실행 시간을 직접 측정하는 것은 비효율적일 수 있습니다.

- 기기마다 시간을 측정하는 방법이 다릅니다.
- 슈퍼 컴퓨터와 일반 컴퓨터는 성능 자체가 다르기 때문에 실행 시간으로 코드의 성능을 측정하는 것이 무의미할 수 있습니다.
- 약 1시간 동안 실행하는 코드를 직접 실행하여 시간을 측정하는 것은 매우 귀찮은 일입니다.

## 해결 : Big O 표기법

Big O 표기법을 통해 이러한 문제를 해결할 수 있습니다. Big O 표기법은 알고리즘의 효율성을 표기해 주는 표기법입니다. Big O 표기법에서 ==연산의 개수를 측정하는 것보다 Input에 따라 코드가 몇 번 실행됐는지가 더 중요합니다. 따라서 최고차항과 전체적인 추세만 신경 쓰면 됩니다.==

```js
function subtotals(arr) {
	let subtotalArr = Array(arr.length);
	for (let i = 0; i< arr.length; i++){
		subtotal = 0;
		for (let j = 0; j <= i; j++){
			subtotal += arr[j]
		}
		subtotalArr[i] = subtotal;
	}
	return subtotalArr;
}
```

연산의 개수를 모두 측정하는 것이 아니라 Input에 따라 코드가 몇 번 실행했는지 측정하면 됩니다.  => ==O(n^2)==

![[Pasted image 20240311173651.png]]
출처 : https://www.researchgate.net/figure/Big-O-time-complexity-chart-based-feature-selection-a-Big-O-complexity-chart-b-Time_fig3_371457259

## 요약

- Big O 표기법을 사용하면 알고리즘의 성능을 분석할 수 있습니다.
- Big O 표기법을 활용하면 시간과 공간 복잡도에 대한 이해를 높일 수 있습니다.
- Big O 표기법은 전체적인 추세에만 관심이 있고 정밀도에 대해서는 크게 신경 쓰지 않습니다.
- 공간 복잡도와 시간 복잡도는 알고리즘에만 의존하며, 알고리즘을 실행하는 데 사용된 하드웨어에는 의존하지 않습니다.

---

**참고 자료(강의)**

[Colt Steele](https://www.udemy.com/user/coltsteele/), [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/), Udemy
