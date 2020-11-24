var fs = require('fs');

var data = "My First data...\r\nhello there!";

//비동식 방식으로 파일을 생성.
fs.writeFile('file01_async.txt', data, 'utf-8', function(error){
    if(error){
        //파일생성중에 에러가 발생하면 출력.
        console.log(error);
    }else{
        console.log('01 Write Done!');
    }
});

//동기식 방식으로 파일을 생성, 
//동기식은 callback함수를 통한 오류처리를 할 수 없기에 함수전체에 예외처리를 함.
try{
    fs.writeFileSync('file02_sync.txt', data, 'utf-8');
    console.log('02 Write Done');
}catch(error){
    console.log(error);
}