const express = require('express');
const { conexao, Tarefa } = require('./src/banco_de_dados/connection')
const { criarTarefa, recuperarTarefa, listarTarefas } = require('./src/controllers/tarefas')


const aplicativo = express();
aplicativo.use( express.json() );


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

aplicativo.post('/tarefas', criarTarefa );
aplicativo.get('/tarefas', listarTarefas );

aplicativo.get('/tarefas/:id', recuperarTarefa);

aplicativo.listen(3000, function(){
    console.log("Servidor escutando na porta 3000");
});

