var express = require('express');

var app = express();

app.use((req,res,next)=>{
    res.write('this is the middleware1\r');
    next();
});

app.use((req,res,next)=>{
    res.write('this is the middleware2');
    res.end();
    next();
});

app.listen('9090', ()=>{
    console.log('Server is running');
});