const express = require('express');
const { conexao, Tarefa } = require('./src/banco_de_dados/connection')
const { criarTarefa, recuperarTarefa, listarTarefas, atualizarTarefa, deletarTarefa } = require('./src/controllers/tarefas')
const contato = require('./src/controllers/contato')
const config = require('./config/app')
const upload = require('./src/controllers/upload')
const multer = require('multer');
const usuario = require('./src/controllers/usuario')

const jwt = require('jsonwebtoken');

const aplicativo = express();
aplicativo.use( express.json() );


aplicativo.get("/", function( requisicao, resposta ){
    resposta.send("<h1>Olá Mundo</h1>");
});

const middlewareAutenticacao = function( requisicao, resposta, proximo ){
    const token = requisicao.headers.authorization;

    if( !token ){
        return resposta.status(401).json({ mensagem : "Token Ausente" });
    }

    const senhaToken = config.jwt_secret;
 
    jwt.verify( token, senhaToken, ( err, decodado )=>{
        if( err ){
            return resposta.status(401).json({ mensagem : "Token Inválido" });
        }else{

            console.log( decodado );
            return proximo();
        }
    });

}



aplicativo.post("/login", usuario.login );
aplicativo.post("/contato", contato.contato );

aplicativo.post('/tarefas', middlewareAutenticacao, criarTarefa );
aplicativo.put('/tarefas/:id', middlewareAutenticacao,atualizarTarefa );
aplicativo.get('/tarefas', middlewareAutenticacao, listarTarefas );
aplicativo.get('/tarefas/:id',middlewareAutenticacao, recuperarTarefa );
aplicativo.delete('/tarefas/:id', middlewareAutenticacao, deletarTarefa );
aplicativo.post('/usuario', usuario.criar );

multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    }
  })


const multerConfig = {
    storage: multerStorage,
    fileFilter: function( req, file, cb ){
        const mimeTypesPermitidos = ['image/jpeg', 'image/png', 'image/gif'];

        if( !mimeTypesPermitidos.includes( file.mimetype ) ){
            let mensagemDeError = `Tipo de Arquivo não permitido. Tipos permitidos: ${mimeTypesPermitidos.join(", ")}`;
            return cb( new Error( mensagemDeError ) )
        }

        return cb( null, true );
    }
}


const uploadHandler = multer( multerConfig).single('avatar')

aplicativo.post('/uploads', middlewareAutenticacao, (requisicao, resposta) => {
    
    uploadHandler( requisicao, resposta, (err) => {
        
        if (err) {
            
            return resposta.status(400).json({ mensagem : "Erro ao fazer upload " + err.message });
        }

        const file = requisicao.file;
    
    
        const data = requisicao.body.data;

        console.log( data );

        resposta.send(file);
    });
       
});

const serverPort = config.server_port;

aplicativo.listen( serverPort , function(){
    console.log("Servidor escutando na porta " + serverPort );
});

