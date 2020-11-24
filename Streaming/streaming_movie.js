var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer((request, response)=>{
    
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource=' + resource);

    var resourcePath = '.'+resource;
    console.log('resourcePath=' + resourcePath);

    if(resource.indexOf('/html/') == 0){
        fs.readFile(resourcePath, 'utf-8', function(error, data) {
            if(error){
              response.writeHead(500, {'Content-Type':'text/html'});
              response.end('500 Internal Server '+error);
            }else{
              response.writeHead(200, {'Content-Type':'text/html'});
              response.end(data);
            }
          });
    }else if(resource.indexOf('/movie/') == 0){
        var stream = fs.createReadStream(resourcePath);

        var count = 0; //나뉘어진 스트림이 몇 번 전송되는지 확인

        //스트림과 관련된 이벤트 발생할 시 작동될 로직을 정의 
        stream.on('data', function(data){
            count = count + 1;
            console.log('data count=' + count);

            response.write(data);
        });

        stream.on('end', function () {
            console.log('end streaming');
            
            response.end();
          });
          stream.on('error', function(err) {
            console.log(err);
            
            response.end('500 Internal Server '+err);
          });
    }else{
        response.writeHead(404, {'Content-Type':'text/html'});
        response.end('404 Page Not Found');  
    }
});

server.listen(80, function(){
    console.log('Server is running...');
});