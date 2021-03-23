### e.target vs e.currentTarget
- currentTarget은 이벤트 리스너를 받는다.
- target은 이벤트가 발생한 요소

### 렉시컬 스코프
### 스코프

### 클로저
- 반복문과 비동기 함수가 만날 때 클로저 문제가 자주 발생한다.
```
    for(var i = 0; i < 100; i++){
        setTimeout(function(){
            console.log(i); // i는 11번째 i가 된다
        }, i*1000);
    }
```

- 실제 일어나는 처리
    - 비동기 안의 콜백 함수 안의 변수는 "실행"될 때 같이 결정 된다.
```
    setTimeout(function(){
        console.log(i); //100 -> 0초인데 왜 100으로 찍히는지 이것은 이벤트 루프시간에 알려준다.
    }, 0*1000);
    setTimeout(function(){
        console.log(i);
    }, 1*1000); //1초 뒤에 i를 찾는다.
    setTimeout(function(){
        console.log(i);
    }, 2*1000);
    ...
    setTimeout(function(){
        console.log(i);
    }, 99*1000);
```
### 클로저 문제 해결법
```
    for(var i = 0; i < 100; i++){
        function 클로저(j){//매개변수도 변수로 선언할 수 있다.
            //var j = 0;
            setTimeout(function(){
            console.log(j); // i는 11번째 i가 된다
            },j*1000);
        }
        클로저(i);
    }
```