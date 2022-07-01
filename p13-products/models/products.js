const Sequelize = require('sequelize');
const db = require('../database/db');
const categories = require('./categories');

const products = db.define('william_products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: false,
    }
})

products.belongsTo(categories, {
    constraint: true,
    foreignKey: 'categorieId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

//Criar a tabela com sequelize
// products.sync();

//Excluir a tabela e criar novamente
//Products.sync({ force: true});

//Verificar se há alguma diferença na tabela, realiza alteração
// Products.sync({ alter: true});

module.exports = products;