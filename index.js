const express = require('express');



const aplicativo = express();
aplicativo.use( express.json() );

// aplicativo.use( function( requisicao, resposta, proximo ){
//     console.log("Middleware 1");
//     proximo();
// });

aplicativo.get("/", function( requisicao, resposta ){
    resposta.send("<h1>Olá Mundo</h1>");
});

aplicativo.post("/contato", function( requisicao, resposta ){
    
    const nome = requisicao.body.usuario.nome;
    const email = requisicao.body.usuario.email;
    const filhos = requisicao.body.usuario.filhos;

    filhos.forEach( function(filho ){
        console.log( filho.nome , filho.email );
    });


    let respostaParaEnvio = {
        nome,
        email
    };

    resposta.json( respostaParaEnvio )

});

aplicativo.listen(3000, function(){
    console.log("Servidor escutando na porta 3000");
});

