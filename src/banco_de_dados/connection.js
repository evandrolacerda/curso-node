const { Sequelize, DataTypes, Model } = require('sequelize');


const conexao = new Sequelize('master', 'sa', 'DockerIsTheBest!', {
    host: 'localhost',
    dialect: 'mssql',
    server: 'localhost',
    port: 1433,
    dialectOptions: {
    }
});

class Tarefa extends Model { }

Tarefa.init({
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            allowNull : false
        },
        descricao : {
            type : DataTypes.STRING,
            allowNull : false
        },
        executada : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false

        }
    }, 
    {
        sequelize: conexao,
        tableName: 'tarefas', 
        modelName: 'Tarefa'
    }
);

/**
 * conexao.sync({force : false }).then(()=>{
    console.log('Conectado a la base de dados');
}).catch((error)=>{
    console.log(error);
});
 * 
 */

//iif imediate invoked function
( async ()=>{
    
    try{
        
        await Tarefa.sync({ force : false });

    }catch(erro){
        console.log(erro);
    }

})();


module.exports = { conexao : conexao, Tarefa : Tarefa };