const contato = function( requisicao, resposta ){
    
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

}


module.exports = {
    contato
}