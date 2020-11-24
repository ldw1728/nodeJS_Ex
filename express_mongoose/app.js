// 필요 패키지들을 로드
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//라우터모듈 로드
var bookRouter = require('./routes');

//몽구스 세팅
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
    //몽고디비 서버에 연결 시 실행되는 함수
    console.log("Connected to mongod server");
});
//몽고디비 연결
mongoose.connect('mongodb://localhost/mongodb_tutorial');

//bodyParser를 사용하기 위한 설정.
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//라우터 설정
app.use('/wooklee', bookRouter);

//서버 포트 설정
var port = process.env.PORT || 8080;

//서버 구동
var server = app.listen(port, ()=>{
    console.log("Express server has startred on port 8080");
});
