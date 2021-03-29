const 스크린 = document.querySelector('#screen');
const text = document.querySelector('.text');
let 시작시간;
let 끝시간;
let 타임아웃;
const 기록 = [];
// 비동기의 특성
// 함수가 사라지면서 변수를 다 날려버림(call stack에서 제거됨) 시작시간, 끝시간이 없어짐 -> 이 때 스코프가 등장!

스크린.addEventListener('click',function(){
    //contains로 클래스의 유무파악 가능
    if(스크린.classList.contains('waiting')){//현재 준비 상태인지 파악
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요!';
        타임아웃 = setTimeout(function(){
            시작시간 = new Date();//버그 잡을시 console.time , console.timeEnd도 있다.
            // const 시작시간 = performance.now(); 정밀한 시간을 사용할 때 사용
            스크린.click();
        },Math.floor(Math.random() * 1000) + 2000);//2000~3000사이 수
    }else if(스크린.classList.contains('ready')){//준비 상태
        if(!시작시간){//부정 클릭 undefined,0,NaN,null,false,''
            clearTimeout(타임아웃);
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
            스크린.textContent = '너무 성급하시군요! 다시 클릭해주세요';
        }else{
            스크린.classList.remove('ready');
            스크린.classList.add('now');
            스크린.textContent = '클릭하세요!';
        }
    }else if(스크린.classList.contains('now')){
        끝시간 = new Date();
        기록.push(끝시간 - 시작시간);
        시작시간 = null;
        끝시간 = null;
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요.!';

        const result = 기록.reduce((sum,currentValue)=>{
            return sum + currentValue;
        },0)
        const average = result / 기록.length;
        text.textContent = `평균 기록은 ${average}`;
    }
});
