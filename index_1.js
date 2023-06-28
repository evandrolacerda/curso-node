const http = require("http");

const manipuladorHttp = require('./src/manipuladorHttp')

console.log( manipuladorHttp.digaOla() );


// const httpHandle = function( request, response ){
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("<h1>Hello World</h1>");
//     response.end();
// };

//const server = http.createServer( httpHandle );

const server = http.createServer( manipuladorHttp.manipuladorHttp );


server.listen( 3000, function(){
    console.log("Servidor Escutando na porta 3000");
} );
