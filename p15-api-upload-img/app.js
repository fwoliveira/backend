const express = require('express');
var cors = require('cors')
const app = express();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
/////////************middleware********************** */
const { validarToken } = require('./middlewares/Auth');
const upload = require('./middlewares/uploadImgUser')
///////////////****************************** */
const jwt = require('jsonwebtoken');
/*** trabalha com arquivos  */
const fs = require('fs');
/***** caminho pasta  */
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname,"public","upload")));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "content-type, Authorization");
    app.use(cors());
    next();
});

app.get('/', function (request, response) {
    response.send('Serviço API Rest iniciada...');
});


app.get("/users", validarToken, async (req, res) => {
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

app.get('/users/:id',validarToken, async (req, res) => {
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
        var endImage="http://localhost:4500/files/users/"+ users.image;
        res.status(200).json({
            erro: false,
            users,
            endImage
        })
    }catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
});

app.post("/user", async (req, res) => {

    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    await User.create(dados)
    .then( ()=>{
        /* enviar e-mail */
        // let to = email;
        // let cc = '';
        // let subject = 'Sua conta foi criada com sucesso!'
        // let mailBody = userCreateMailTemplate({
        //     name: dados.name,
        //     email: dados.email,
        //     gender: dados.gender
        // })
        // sendMail(to, cc, subject, mailBody);
        return res.json({
            erro: false,
            mensagem: 'Usuário cadastrado com sucesso!'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Usuário não cadastrado... ${err}`
        })
    })
});

app.put("/user",validarToken,async (req, res) => {
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
 app.delete("/user/:id",async (req, res)=>{
     const {id} = req.params;
     await User.destroy({where: { id}})
     .then(()=>{
         return res.json({
             erro:false,
             mensagem: "Usuario apagado com sucesso"
         });

     }).catch(() => {
         return res.status(400).json({
             erro:true,
             mensagem: `Erro: ${err} Usuário não apagado...`
         });
     });
 });


app.post("/login", async (req, res)=>{
     await sleep(3000)
     function sleep(ms){
        return new Promise((resolve) =>{
            setTimeout(resolve, ms)
        })
     }

    const user = await User.findOne({
        attributes: ['id','name', 'email','gender','password'],
        where: {
            email: req.body.email
        }
})
if(user === null){
    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuário ou senha incontrado"
    })
}
if(!(await bcrypt.compare(req.body.password, user.password))){
    return res.status(400).json({
        erro: true,
        mensagem:"Erro: Usuário ou senha incorreta!!!"
    })
}

 var token = jwt.sign({id: user.id}, process.env.SECRET,{
    expiresIn: 600//10min, '7d' 7dias
 });


return res.json({
    erro:false,
    mensagem: "Login realizado com sucesso",
    token
})
});



app.put('/user-senha', async (req, res) => {
    const {id, password} = req.body;
    var senhaCrypt= await bcrypt.hash(password, 8);

    await User.update({password: senhaCrypt}, {where: {id: id}})
    .then(()=> {
        return res.json({
            erro: false,
            mensagem:"Senha edita com sucesso!"
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem:`Erro: ${err}... A senha não foi alterada`
        })
    })
})

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

app.put('/edit-profile-image',validarToken,upload.single('image'),async (req, res) => {
   if (req.file){
    console.log(req.file)
    
    await User.findByPk(req.userId)
    .then(user =>{
        console.log(user);
        const imgOld = './public/upload/users/'+ user.dataValues.image

        fs.access(imgOld,(err)=>{
            if(!err){
                fs.unlink(imgOld,()=>{})
            }
        })
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro : perfil nao encontrado"
        })
    })


    await User.update({image: req.file.filename},{where: {id: req.userId}})
    .then(()=>{
         return res.json({
        erro: false,
        mensagem: "Imagem editada com sucesso"
    })
    }).catch ((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: imagem nao editada ...${err}`
        })
    })  
}else {
    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Selecione uma imagem valida (.png, .jpg) !" 
    })
}

})

app.listen(process.env.PORT,() => {
    console.log(`Servico eniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});

