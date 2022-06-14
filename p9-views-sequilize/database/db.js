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

module.exports = sequelize;