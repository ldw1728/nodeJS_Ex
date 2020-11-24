var fs = require('fs'); //파일 시스템 모듈사용

// 비동기식 파일읽기
fs.readFile('home.js', 'utf-8', function(error, data){
    console.log('01 readAsync: %s', data);
});

//동기식 파일 읽기, 파일을 읽은 후 data변수에 저장.
var data = fs.readFileSync('home.js', 'utf-8');
console.log('02 readSync: %s', data);



