var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

function startServer(route, handle) {
    var onRequest = function (request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request received ' + pathname);
        var data = [];
        request.on("error", function (err) {
            console.error(err);
        }).on("data", function (chunk) {
            data.push(chunk);
        }).on('end', function () {
            if (request.method === "POST") {
                if (data.length > 1e6) {
                    request.connection.destroy();
                }
                data = Buffer.concat(data).toString();
                route(handle, pathname, response, querystring.parse(data));
            } else {
                var params = url.parse(request.url, true).query;
                route(handle, pathname, response, params);
            }
        });
    }

    var server = http.createServer(onRequest);

    server.listen(3001, '127.0.0.1');
    console.log('Server started on localhost port 3000');
}

module.exports.startServer = startServer;



//var writeData = "hello world";
//myWriteStream.write(writeData);
//myWriteStream.end();
//myWriteStream.on('finish', function () {
   // console.log('finished');

//})



//myReadStream.setEncoding('utf8');

//var data=""

//myReadStream.on('data',function (chunk) {
    //myWriteStream.write(chunk);
    
//})

//myReadStream.on('end',function () {
    //console.log(data);
    
//})

//var myEmitter=new events.EventEmitter();

//myEmitter.on('someEvent',function (message) {
  //  console.log(message);
    
//})

//myEmitter.emit('someEvent','the event was emitted');