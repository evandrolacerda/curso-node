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

        resposta.json(erro).statusCode(400);
    }
};

const recuperarTarefa = async function( requisicao, resposta ){
    const id = requisicao.params.id;
    
    try{
        const tarefa = await Tarefa.findByPk( id );
        
        if( !tarefa ){

            resposta.status(404).json({
                mensagem : "erro aconteceu"
            });

            return;
        }
        
        resposta.status(200).json( tarefa );
    

    }catch(erro){
        console.log(erro);

        resposta.status(500).json(erro);
    }

};

module.exports = {
    criarTarefa : criarTarefa,
    recuperarTarefa : recuperarTarefa
};