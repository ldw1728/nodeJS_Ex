var http = require('http');

var url = require('url');


var server = http.createServer((request, response)=>{

    console.log(request.url);

    var parsedUrl = url.parse(request.url);

    var resource = parsedUrl.pathname; //객체로 변환한 url의 여러 속성중 pathname을 가져옴

    console.log("resource path=%s", resource);
    
    if(resource == '/address'){

        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end('인천광역시');

    }else if(resource == '/phone'){

        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end('01012345678');

    }else if(resource == '/name'){

        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end('wooklee');

    }else{  
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.end('404 Page Not Found');
    }

});

server.listen(9999, function(){
    console.log('Server is runing ......');
});