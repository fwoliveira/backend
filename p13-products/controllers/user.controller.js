const User = require('../models/user');
const bcrypt = require('bcryptjs');
const sendMail = require('../providers/mailProvider');
const jwt = require('jsonwebtoken');
exports.findAll = async (req, res) => {
    await User.findAll({
        attributes: ['id','name', 'email','gender','password'],
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
};






exports.login = async (req, res) => {
  //   await sleep(3000);
  // function sleep(ms) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // }
  // console.log(req.body);
  const user = await User.findOne({
    attributes: ["id", "name", "email", "gender", "password"],
    where: {
      email: req.body.email,
    },
  });
  if (user === null) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Email ou senha incorreta!!!",
    });
  }
  // console.log(user);
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Email ou senha incorreta!!!",
    });
  }

  var token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 900, //10min
  });

  return res.json({
    erro: false,
    mensagem: "Login realizado com sucesso!!!",
    token,
    // name: user.name,
    // email: user.email,
    // gender: user.gender
  });
};

exports.create = async (req, res) => {

    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    let email = dados.email;
    let name = dados.name;
    let gender = dados.gender;

    await User.create(dados)
    .then( ()=>{
        /* enviar e-mail */
        let to = email;
        let cc = '';
        var htmlbody = "";
        htmlbody += '<div style="background-color:#000; margin-bottom:150px;">';
        htmlbody += '<div style="margin-top:150px;">';
        htmlbody += '<p style="color:#fff; font-weight:bold;margin-top:50px;">';
        htmlbody += 'Olá {name},';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff; font-style:italic;margin-top:50px;">';
        htmlbody += 'Sua conta foi criada com sucesso!';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff;margin-top:50px;">';
        htmlbody += 'Seu login é o seu email: {email}';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff;margin-top:50px;">';
        htmlbody += 'Sexo: {gender}';
        htmlbody += '</p>';
        htmlbody += '</div>';
        htmlbody += '</div>';
        htmlbody = htmlbody.replace('{name}', name);
        htmlbody = htmlbody.replace('{email}', email);
        htmlbody = htmlbody.replace('{gender}', gender);
        /* ************* */
        sendMail(to, cc, 'Sua conta foi criada com sucesso!', htmlbody);

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
};

exports.update = async (req, res) => {
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
};

exports.delete = async (req, res)=>{
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
 };

 exports.validaToken = async (req, res) => {
    await User.findByPk(req.userId, {
      attributes: ["id", "name", "email"],
    })
      .then((user) => {
        return res.status(200).json({
          erro: false,
          user,
        });
      })
      .catch(() => {
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Necessário realizar o login!!!",
        });
      });
  };