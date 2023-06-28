const manipuladorHttp = ( request, response )=>{

   if( request.url === '/'){
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    response.write("<h1>Olá Mundo</h1>");

    return response.end();
   }

    
    if( request.method === 'GET' && request.url === "/contato"){
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        response.write("<html>");
        response.write("<head><title>Contato</title></head>");
        response.write("<head><title>Contato</title></head>");
        response.write("<body>");
        response.write("<h1>Contato</h1>");
        response.write("<ul>");
        response.write("<li><a href='/'>Home</a></li>");
        response.write("<li><a href='/contato'>Contato</a></li>");
        response.write("<li><a href='/produtos'>Produtos</a></li>");
        response.write("</ul>");
        response.write("<form method='POST'>");
        response.write("<input type='text' name='nome' placeholder='Nome' /><br>");
        response.write("<input type='email' name='email' placeholder='E-mail' /><br>");
        response.write("<textarea name='mensagem' placeholder='Mensagem'></textarea><br>");
        response.write("<input type='submit' value='Enviar' />");
        response.write("</body>");
        response.write("</html>");
        return response.end();
        
    }


    if( request.method === 'POST' && request.url === "/contato"){
        
        let body = [];
        let parteDoCorpo = function( chunk ){
            body.push( chunk );
        }

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        
        request.on('data', parteDoCorpo ).on('end', function(){
            const corpoCru = Buffer.concat( body ).toString();
            
            const corpo = {}

            const partes = corpoCru.split('&');

            partes.forEach( function( item ){
                
                const arrayChaveValor = item.split('=');

                const chave = arrayChaveValor[0];
                const valor = decodeURIComponent( arrayChaveValor[1] );

                corpo[chave] = valor;               

            });            

            response.write( JSON.stringify( corpo ) );

            return response.end();
        });

    }
}
const digaOla =  function(){
    console.log('Olá');
}
module.exports = {
    manipuladorHttp: manipuladorHttp,
    digaOla: digaOla
};