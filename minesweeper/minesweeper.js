document.querySelector('#exec').addEventListener('click',function(){
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor,ver,mine);

    //지뢰 위치 뽑기 (0부터 99까지 수 중에서 20개의 지뢰를 심자)
    const 후보군 = Array(hor * ver)
    .fill()
    .map(function(요소,인덱스){
        return 인덱스 + 1;//첫번째 칸이 1부터 시작 할 수 있도록
    });
    const 셔플 = [];
    //몇 번 반복해야 할 지 모를 때 or 기준값이 변경 될 때 -> while 사용
    while(후보군.length > 80){
        //후보군으로 노출된 앞의 20개를 지뢰로 심는다.!!
        const 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
        셔플.push(이동값);
    }

    console.log(셔플);

    //지뢰 테이블 만들기
    var dataset = [];
    //세로 10,가로 10 이중 반복문이 될 것이다.
    var tbody = document.querySelector('#table tbody');
    //세로줄을 먼저 만든다.
    for(let i = 0;i < ver ; i+=1 ){
        var arr = [];
        dataset.push(arr);
        const tr = document.createElement('tr');
        for(let j = 0; j < hor; j+=1){
            arr.push(1);
            const td = document.createElement('td');
            tr.appendChild(td);
            // td.textContent = 1;
        }
        tbody.appendChild(tr);
    }


    //지뢰 심기
    for(let k = 0; k < 셔플.length; k++){ //예 59
        let 세로 = Math.floor(셔플[k] / 10); //6 -> 세로 5번째 줄 (0부터 시작)
        let 가로 = 셔플[k] % 10 - 1; //9 -> 세로 8번째 줄(0부터 시작), 이 값이 -1이 될 수도 있다.
        console.log(세로,가로);
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 'X';
        //배열의 index가 -1이 나오면 안돼서 그 부분을 수정중
    }

    console.log(dataset);
});