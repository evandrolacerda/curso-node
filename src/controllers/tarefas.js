const { conexao, Tarefa } = require('../banco_de_dados/connection')
const { Op } = require('sequelize');

const criarTarefa = async function( requisicao, resposta ){
    
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
};

const recuperarTarefa = async function( requisicao, resposta ){
    const id = requisicao.params.id;
    
    try{
        const tarefa = await Tarefa.findByPk( id );

        resposta.json( tarefa ).status(200);


    }catch(erro){
        console.log(erro);

        resposta.json(erro).status(500);
    }

};

module.exports = {
    criarTarefa : criarTarefa
};