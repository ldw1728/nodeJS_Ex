const bodyParser = require('body-parser');
const session = require('express-session');
var express = require('express');
var app = express();
var fs = require('fs');


app.set('views', __dirname + '/views'); //서버가 읽을 수 있도록 HTML의 위치를 정의
app.set('view engine', 'ejs'); //서버가 HTML렌더링을 할 때, EJS엔진을 사용하도록 설정.
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, ()=>{
    console.log('Express server has started on port 3000');
});

app.use(express.static('public')); //정적 파일(js, css, img파일들..)사용.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret : '@#@$MYSIGN#@$#$', //쿠키를 임의로 변조하는 것을 방지하기 위한 sign값, 원하는 값을 넣으면됨.
    resave : false, //세션을 언제나 저장할 지 정하는 값, false를 권장하고 필요 시 true
    saveUninitialized : true, //새로 생겼지만 변경되지 않은 세션. true를 권장.
}));

var router = require('./router/main')(app, fs); //라우터 모듈을 불러 app에 전달.