const express = require('express');
const app = express();
const port = 4500;
const User = require('./models/User');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (request, response) {
    response.send('Serviço API Rest iniciada...');
});


app.get("/users", async (req, res) => {
    await User.findAll({
        attributes: ['id','name', 'email','gender'],
        order:[['name','ASC']]
    })
    .then( (users) => {
        return res.json({
            erro:false,
            users
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nehum Usuario encontrado!!!`
        });
    });
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // await User.findAll({ where: { id: id }})
        const users = await User.findByPk(id);
        if(!users) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro Nehum Usuario encontrado!"
            })
        }
        res.status(200).json({
            erro: false,
            users
        })
    }catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
});

app.post("/user", async (req, res) => {
    // const{ name, email, gender, password } = req.body;
    await User.create(req.body)
    .then(()=>{
        return res.json({
            erro: false,
            mensagem:'Usuario cadastrado com sucesso!'
        });
    }).catch((err) => {
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: Usuario não cadastrado...${err}`
        })
    })
});
app.put("/user",async (req, res) => {
    const{ id} = req.body;

    await User.update(req.body,{ where: { id}})
    .then(()=>{
        return res.json({
            erro:false,
            mensagem: "Usuario alterado com sucesso"
        })
    }).catch((err) => {
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: Usuario não alterado ...${err}`
        })
    })
});



app.listen(port,() => {
    console.log(`Servico eniciado na porta ${port} http://localhost:${port}`);
});

app.listen(6333);
