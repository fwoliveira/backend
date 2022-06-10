const Sequelize = require('sequelize');

const sequelize = new Sequelize('senac','root','',{
    host: 'localhost',
    dialect:'mysql',
});

sequelize.authenticate().then(function() {
    console.log('Conexao com o banco de dados realizado com sucesso ');
}).catch(function(err){
    console.log(`Erro Conexao: ${err}`);
})

const User =sequelize.define('users',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,


    },
    name:{
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,

    },
    gender:{
        type: Sequelize.STRING(1),
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//criar tabela com sequelize_scope_error_default
// User.sync();
//excluir a tabela e criar novamente
//User.sync({force:true});
//verificar se algum diferença na tabela , realiza alteracao
//User.sync({alter: true});
//cadastrar registro no banco de dados
User.create({
    name:"aluno",
    email: "email@exemple.com",
    gender:"m",
    password:"123"
})

