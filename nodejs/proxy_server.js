var http = require("http");
var url = require("url");
var route = require("./proxy_route").route;
const port = 12888

function start(route) {
  function onRequest(request, response) {
    console.log(request)
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    route(pathname,request, response);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(port);
  console.log("Server has started at port " + port);
}
 
start(route);