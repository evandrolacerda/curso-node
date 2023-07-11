const express = require('express');
const { conexao, Tarefa } = require('./src/banco_de_dados/connection')
const { criarTarefa, recuperarTarefa, listarTarefas, atualizarTarefa } = require('./src/controllers/tarefas')
const contato = require('./src/controllers/contato')

const usuario = require('./src/controllers/usuario')

const aplicativo = express();
aplicativo.use( express.json() );


aplicativo.get("/", function( requisicao, resposta ){
    resposta.send("<h1>Olá Mundo</h1>");
});

aplicativo.post("/login", usuario.login );
aplicativo.post("/contato", contato.contato );

aplicativo.post('/tarefas', criarTarefa );
aplicativo.put('/tarefas/:id', atualizarTarefa );
aplicativo.get('/tarefas', listarTarefas );
aplicativo.get('/tarefas/:id', recuperarTarefa );
aplicativo.post('/usuario', usuario.criar );



aplicativo.listen(3000, function(){
    console.log("Servidor escutando na porta 3000");
});

