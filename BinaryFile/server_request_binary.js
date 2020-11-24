var http = require('http');
var url = require('url');
var fs = require('fs');

var mime = require('mime');

var server = http.createServer((request, response)=>{
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;

    //요청한 자원의 주소가 '/image/' 문자열로 시작한다면
    if(resource.indexOf('/image/') == 0){   

        var imgPath = resource.substring(1);// 맨앞의 '/'를 제거
        console.log('imgPath=' + imgPath);

        var imgMime = mime.getType(imgPath);
        console.log('mime=' + imgMime);

        fs.readFile(imgPath, function(error, data){
            if(error){
                response.writeHead(500, {'Content-Type' : 'text/html'});
                response.end('500 Internal Server' + error);
            }else{
                response.writeHead(200, {'Content-Type' : imgMime});
                response.end(data);
            }
        });
    }else{
        response.writeHead(404, {'ContentType' : 'text/html'});
        response.end('404 Page Not Found');
    }
});

server.listen(80, ()=>{
    console.log('Server is running....');
})