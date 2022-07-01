const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/index');
const categories = require('./models/categories');
const products = require('./models/products');
const User = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)


app.get('/', function (request, response) {
    response.send('Serviço API Rest iniciada...');
});

app.listen(process.env.PORT,() => {
    console.log(`Servico eniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});

app.listen(6333);
