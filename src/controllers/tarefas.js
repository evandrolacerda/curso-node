const { conexao, Tarefa } = require('../banco_de_dados/connection');

const criarTarefa = async function( requisicao, resposta ){
    
    try{
        
        const [novaTarefa, meta] = await conexao.query("EXEC [dbo].[inserir_tarefa] @descricao = :descricao, @executada = :executada", 
        {
            replacements: {
                descricao: requisicao.body.descricao,
                executada: requisicao.body.executada
        }});

        console.log( meta, novaTarefa );

        
        resposta.status(201).json( {
            mensagem : "Tarefa criada com sucesso",
        } );
    
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

const listarTarefas = async function( requisicao, resposta ){

    let parametroExecutada = 0;

    if( requisicao.query.executada ){
        parametroExecutada = requisicao.query.executada
    }

    try{

        [ resultado, meta ] = await conexao.query("EXEC listar_tarefas_por_status @status = :status", {
            replacements: {
                status: parametroExecutada
            }
        } );

        console.log( resultado );
        console.log( meta );

        resposta.status(200).json( resultado );

    }catch(erro){
        console.log(erro);

        resposta.status(500).json(erro);
    }

}

module.exports = {
    criarTarefa : criarTarefa,
    recuperarTarefa : recuperarTarefa,
    listarTarefas : listarTarefas
};