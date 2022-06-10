

console.log("Ola Senac");

var client = 'Senac Campinas';

console.log(`client: ${client}`);

var valProduct = 100;
var valDiscount = 37;

var funcDiscount = require('./modules/calDiscount');
 
var finalvalue = funcDiscount(valProduct, valDiscount);

console.log(`Valor do produto com desconto: R$ ${finalvalue}`);



























