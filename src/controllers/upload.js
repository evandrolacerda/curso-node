



const uploadHandler = async ( requisicao, resposta )=>{


    return resposta.json({ mensagem : "Upload realizado com sucesso" });
}


module.exports = {
    upload : uploadHandler
}