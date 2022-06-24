const Sequelize= require('sequelize')


const sequelize = new Sequelize('senac', 'root', '',{
    host: process.env.DB_HOST,
    dialect: 'mysql'
});


sequelize.authenticate().then( function() {
    console.log('Conexâo com banco de dados realizado com sucesso!');
}).catch( function(err){
    console.log(`Erro de Conexâo: ${err}` );
})

module.exports = sequelize;