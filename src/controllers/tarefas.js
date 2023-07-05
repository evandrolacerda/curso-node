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

module.exports = {
    criarTarefa : criarTarefa
};