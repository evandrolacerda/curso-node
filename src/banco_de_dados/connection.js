const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('../../config/app');

const conexao = new Sequelize(config.db_name, config.db_user,config.db_password, {
    host: config.db_server,
    dialect: 'mssql',
    server: config.db_server,
    port: 1433,
    dialectOptions: {
    }
});
class Usuario extends Model{}
class Tarefa extends Model { }

Usuario.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha:{
        type: DataTypes.STRING(64),
        allowNull: false
    }
}, {
    sequelize: conexao,
    tableName: 'usuarios', 
    modelName: 'Usuario'
});

// conexao.define('Usuario', {
//     id : {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     senha:{
//         type: DataTypes.STRING(64),
//         allowNull: false
//     }
// });


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
        await Usuario.sync({ force : false });

    }catch(erro){
        console.log(erro);
    }

})();


module.exports = { conexao : conexao, Tarefa : Tarefa, Usuario : Usuario };