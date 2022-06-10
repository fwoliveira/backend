const express = require('express');

const app = express();
const port = 6000;

app.use(express.json());

const contatos = ['Andre', 'Willy', 'Samuel', 'Richard'];

app.get("/", (req, res) => {
    res.send("Aplicativo Iniciado !");
})

app.get("/contatos", (req, res) => {
    return res.json(contatos);
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const {sit,vacinado} = req.query;

    return res.json({
        id:id,
        nome:"Theo",
        email:"theo@sp.senac.br",
        sit,
        vacinado,

    });
});



app.post("/contatos", (req, res) => {
    const {nome} = req.body;
    contatos.push(nome);
    return res.json(contatos);
});



 app.delete("/users/:id", (req, res) =>{
     contatos.pop();
     return res.json(contatos);
 });


app.listen(port, () =>{
    console.log(`Servidor iniciado na porta ${port}`)
})