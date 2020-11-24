var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//스키마 정의
var bookSchema = new Schema({
    title : String,
    author : String,
    published_date : { type : Date, default : Date.now}
});

//정의한 스키마에 이름을 정하고 모델을 모듈화
module.exports = mongoose.model('book', bookSchema);