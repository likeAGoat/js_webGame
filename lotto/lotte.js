// const 후보군 = Array(45); //너무 갯수가 많은 경우 Array를 사용
// const 필 = 후보군.fill(); //ie에서는 안됨
// console.log(필);

// 후보군.forEach(function(요소,인덱스){
//     console.log(요소,인덱스);
// })// empty의 특징 -> 반복문 불가! fill을 사용하여 반복문을 돌릴 수 있게 변경

// 필.forEach(function(요소,인덱스){
//     필[인덱스] = 인덱스 + 1;//이건 약간 어거지 느낌 -> 더 좋은 방법이 있다.
// })

// [undefined,undefined,undefined]
// [1,2,3];

//라인 1~2를 축약하여 표현
const 후보군 = Array(45).fill().map(function(요소,인덱스){
    return 인덱스 + 1;
});

console.log(후보군);

const 셔플 = [];
//몇 번 반복해야 할 지 모를 때 or 기준값이 변경 될 때 -> while 사용
while(후보군.length > 0){
    //실제로는 .. 라이브러리나 알고리즘 사용해야함
    const 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
    셔플.push(이동값);
}

console.log(셔플);

const 보너스 = 셔플[셔플.length - 1];
const 당첨숫자들 = 셔플.slice(0,6).sort(function(p,c){return p - c;});//merge sort,quick sort 등등 알고리즘 공부하기
console.log('당첨 숫자들',당첨숫자들,'보너스',보너스 )

const 결과창 = document.querySelector('#결과창');
// for(var i = 0; i<당첨숫자들.length; i+=1){
//     //클로저 관련된 문제 (반복문 안에 비동기 사용 시) 문제가 된다.
//     setTimeout(function 비동기콜벡(){
//         const 공 = document.createElement('div');
//         공.textContent = 당첨숫자들[i];
//         결과창.appendChild(공);
//     }, 1000) ;
// }

function 공색칠하기(숫자,결과창){
    const 공 = document.createElement('div');
    공.textContent = 숫자;
    공.className = '공아이디' + 숫자;
    공.classList.add('공');
    // 공.id = '공아이디' + 숫자;
    if(숫자 <= 10){
        배경색 = 'red';
    }else if(숫자 <= 20){
        배경색 = 'orange';
    }else if(숫자 <= 30){
        배경색 = 'yellow';
    }else if(숫자 <= 40){
        배경색 = 'blue';
    }else{
        배경색 = 'green';
    }
    공.style.background = 배경색;
    결과창.appendChild(공);
}

setTimeout(function 비동기콜벡(){
    공색칠하기(당첨숫자들[0],결과창)
}, 1000) ;
setTimeout(function 비동기콜벡(){
    공색칠하기(당첨숫자들[1],결과창)
}, 2000) ;
setTimeout(function 비동기콜벡(){
    공색칠하기(당첨숫자들[2],결과창)
}, 3000) ;
setTimeout(function 비동기콜벡(){
    공색칠하기(당첨숫자들[3],결과창)
}, 4000) ;
setTimeout(function 비동기콜벡(){
    공색칠하기(당첨숫자들[4],결과창)
}, 5000) ;
setTimeout(function 비동기콜벡(){
    공색칠하기(당첨숫자들[5],결과창)
}, 6000) ;

setTimeout(function 비동기콜벡(){
    const 보너스칸 = document.querySelector('.보너스');
    공색칠하기(보너스,보너스칸)
}, 7000) ;
//[과제]발전한 코드. 내가 로또 번호를 찍고 => 로또 1등이 되었는지 확인