const { Usuario } = require('../banco_dados/connection');


const criar = async function( requisicao, resposta ){

    let email = requisicao.body.email;
    let senha = requisicao.body.senha;

    let novoUsuario = await Usuario.create({
        email : email,
        senha : senha
    });

    resposta.json( novoUsuario );

} 
