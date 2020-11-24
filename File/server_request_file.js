var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer((request, response)=>{
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;

    if(resource == '/hello'){
        fs.readFile('hello.html', 'utf-8', (error, data)=>{
            if(error){
                response.writeHead(500, {'Content_Type' : 'text/html'});
                response.end('500 Internal Server Error');
            }else{
                response.writeHead(200, {'Content' : 'text/html'});
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