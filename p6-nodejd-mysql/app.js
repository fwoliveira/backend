
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'senac'
});

connection.connect(function(err) {
    console.log("Conexao ao banco de dados realizada com sucesso");
    console.log(`Conexao${connection.thredId}`);
    if(err){
        console.log(`Erro: ${err}`);
    }
} );

connection.query('SELECT * FROM users', function(err, rows, fields) {
    if(!err){
        console.log('Resulado: ', rows);

    }else{
        console.log(`Erro consulta: ${err}`);
    }
});


//Cadastra novo registrono banco de dados 
connection.query("INSERT INTO users (name,email,gender) values ('aluna','email@email.com','f')", function(err, result) {
    if(!err){
        console.log('Usuario cadastrado com sucesso');
    }else{
        console.log(`Erro cadastrado de usuario: ${err}`);
    }
});
