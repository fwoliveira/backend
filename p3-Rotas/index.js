const express = require('express');

const app = express();
const port = 4500;

app.get("/", function(req, res){
    res.send("Pagina inicial do Serviço");
});

app.get("/sobre-empresa", (req, res) => {
    res.send("Pagina sobre empresa do App");
});

app.get("/contato",(req, res) => {
    res.send("Pagina de contato do App");

});




app.listen(port, () =>{
    console.log(`Servidor iniciado na porta ${port}`)
})