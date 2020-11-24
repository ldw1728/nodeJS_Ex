//몽구스 모듈사용
var mongoose = require('mongoose');
//몽구스 셋
mongoose.connect('mongodb://localhost:27017/testDB');

var db = mongoose.connection;

db.on('error', ()=>{
    console.log('COnnection Failed');
});

db.once('open', ()=>{
    console.log('Connected');
});

//스키마 생성
var student = mongoose.Schema({
    name : 'string',
    address : 'string',
    age : 'number'
});

//정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일.
var Student = mongoose.model('Schema', student);

var newStudent = new Student({name : 'Lee Dong Wook', address : '인천광역시 부평동', age : '27'});

newStudent.save((error,data)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Saved');
    }
});

Student.find((error, students)=>{
    console.log(' --- Read All --- ');
    if(error){
        console.log(error);
    }
    else{
        console.log(students);
    }
});

Student.findOne({_id : '5fb116075115dd4469982aa6'}, (error, student)=>{
    console.log(' --- Read one --- ');

    if(error){
        console.log(error);
    }else{
        console.log(student);
    }
});

Student.findById({_id : '5fb116075115dd4469982aa6'}, (error, student)=>{
    console.log(' --- Update(PUT) --- ');
    if(error){
        console.log(error);
    }else{
        student.name = '--modified--';
        student.save((error, modified_student)=>{
            if(error){
                console.log(error);
            }else{
                console.log(modified_student);
            }
        });
    }
});

Student.remove({_id : '585b7c4371110029b0f584a2'}, (error, output)=>{
    console.log(' --- Delete --- ');
    if(error){
        console.log(error);
    }

    console.log(' --- deleted --- ');
});



