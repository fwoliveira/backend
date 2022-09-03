const express = require('express');
const app = express();
var cors = require('cors')
require('dotenv').config();
const router = require('./routes/index');
const categories = require('./models/categories');
const products = require('./models/products');
const User = require('./models/user');
const { validarToken } = require('./middlewares/Auth');
const jwt = require('jsonwebtoken');





app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors());
    next();
});











// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "*");
    
//     app.use(cors());
//     next();
//     // res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
// });



app.get('/', function (request, response) {
    response.send('Serviço API Rest iniciada...');
});

app.get("/validarToken", validarToken, async (req, res) => {
    await User.findByPk(req.userId,{ attributes: ['id', 'name','email']
}).then( (user) => {
    return res.status(200).json({
        erro: false,
        user
    });
}).catch(() =>{
    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Necessário realizar o login!"
    })
})

})

app.use(router);



app.listen(process.env.PORT,() => {
    console.log(`Servico eniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});

app.listen(6333);
