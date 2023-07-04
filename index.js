const express = require('express');
const { conexao, Tarefa } = require('./src/banco_de_dados/connection')



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

aplicativo.post('/tarefas',async function( requisicao, resposta ){
    
    try{
        const tarefa = await Tarefa.create({
            descricao : requisicao.body.descricao
        });

        // const [resultado, meta ] = conexao.query("INSERT INTO tarefas (descricao) VALUES ( :descricao )", {
        //     replacements : {
        //         descricao : requisicao.body.descricao
        //     }
        // });

        resposta.json( tarefa ).status(201);
    
    }catch(erro){
        console.log(erro);

        resposta.json(erro).status(400);
    }
});



aplicativo.listen(3000, function(){
    console.log("Servidor escutando na porta 3000");
});

