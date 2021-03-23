const tbody = document.querySelector('#table tbody');
const dataset = [];//지뢰 테이블 만들기

document.querySelector('#exec').addEventListener('click',function(){
    tbody.innerHTML = '';//내부 초기화
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor,ver,mine);

    //지뢰 위치 뽑기 (0부터 99까지 수 중에서 20개의 지뢰를 심자)
    const 후보군 = Array(hor * ver)
    .fill()
    .map(function(요소,인덱스){
        return 인덱스;//첫번째 칸이 1부터 시작 할 수 있도록 -> +1을 지우고 0부터 99가 될 수 있도록 변경
    });
    const 셔플 = [];
    //몇 번 반복해야 할 지 모를 때 or 기준값이 변경 될 때 -> while 사용
    while(후보군.length > 80){
        //후보군으로 노출된 앞의 20개를 지뢰로 심는다.!!
        const 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
        셔플.push(이동값);
    }

    // console.log(셔플);

    //세로 10,가로 10 이중 반복문이 될 것이다.
    //세로줄을 먼저 만든다.
    for(let i = 0;i < ver ; i+=1 ){
        var arr = [];
        dataset.push(arr);
        const tr = document.createElement('tr');
        for(let j = 0; j < hor; j+=1){
            arr.push(1);
            const td = document.createElement('td');
            //[해결방안]존재하지 않는 태그에 이벤트를 달 수 없습니다.
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                const 부모tr = e.currentTarget.parentNode;
                const 부모tbody = e.currentTarget.parentNode.parentNode;
                //몇번째줄 몇번째칸 -> 틱택톡에서 수행했다.
                //indexOf는 배열에서 수행 children은 유사배열이기 때문에 indexOf가 수행되지않는다.
                // const 칸 = Array.prototype.indexOf.call(부모tr.children,td); //[해결방안]td가 정확한 위치에 찍히지 않는다. -> 클로저 문제/클로저 문제를 회피해서 td대신에 e.currentTarget을 써주자
                const 칸 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget);
                const 줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr);

                // console.log(칸,줄);
                // e.currentTarget.textContent = '!';
                // dataset[줄][칸] = '!';
                // console.log(dataset);
                //td가 정확한 위치에 찍히지 않는다. -> 클로저 문제

                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                }else if(e.currentTarget.textContent === '?'){
                    console.log(e.currentTarget.textContent);
                    e.currentTarget.textContent = '';
                    if(dataset[줄][칸] === 1){
                        e.currentTarget.textContent = '';
                    }else if(dataset[줄][칸] === 'X'){
                        e.currentTarget.textContent = 'X';
                    }
                }
            })
            td.addEventListener('click',function(e){
                e.preventDefault()
                //클릭했을 때 주변 지뢰 개수
                const 부모tr = e.currentTarget.parentNode;
                const 부모tbody = e.currentTarget.parentNode.parentNode;
                const 칸 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget);
                const 줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr);

                if(dataset[줄][칸] === 'X'){
                    e.currentTarget.textContent = '펑';
                }else{
                    let 주변 = [
                        dataset[줄][칸-1],dataset[줄][칸+1],
                    ];
                    if(dataset[줄-1]){
                        주변 = 주변.concat([dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]])
                    }
                    if(dataset[줄+1]){
                        주변 = 주변.concat([dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]])
                    }
                    e.currentTarget.textContent = 주변.filter(function(v){
                        return v === 'X';
                    }).length;
                }
            });
            tr.appendChild(td);
            // td.textContent = 1;
        }
        tbody.appendChild(tr);
    }


    //지뢰 심기
    //비동기인 코드는 동기인 코드보다 나중에 실행된다.
    for(let k = 0; k < 셔플.length; k++){ //예 60
        let 세로 = Math.floor(셔플[k] / 10); //예 7번째줄 -> 세로 6번째 줄 (0부터 시작)
        let 가로 = 셔플[k] % 10; //예 0 -> 세로 0번째 줄(0부터 시작), 이 값이 -1이 될 수도 있다. -> 배열의 index가 -1이 나오면 안된다.
        console.log(세로,가로);
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 'X';
    }

    // console.log(dataset);
});

//우클릭으로 깃발 꼽기
//존재하지 않는 태그에 이벤트를 달 수 없습니다.
console.log(tbody.querySelectorAll('td'));//빈배열이다.
tbody.querySelectorAll('td').forEach(function(td){
    td.addEventListener('contextmenu',function(){
        console.log('오른쪽 클릭');
    })
});


for(var i = 0; i < 100; i++){//var i를 써주면 100이 찍히는데 let i를 써주면 원하는대로 동작함
    (function 클로저(j){
        setTimeout(function(){
            console.log(i); // i는 11번째 i가 된다
        }, i*1000);
    })(i)
}

//[과제]- 첫번째 클릭 때는 절대로 x가 안나와야한다. (x는 그럼 어디로 가야할까 ?)