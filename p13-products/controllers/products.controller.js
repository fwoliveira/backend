const products = require('../models/products');
const categories = require('../models/categories');

exports.findAll = async (req, res) => {
    await products.findAll({
        attributes: ['id','name', 'description',],
        order:[['name','ASC']],
        include:[categories]
    })
    .then( (users) => {
        return res.json({
            erro:false,
            users
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nehum categoria encontrado!!!`
        });
    });
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        // await products.findAll({ where: { id: id }})
        // const users = await products.findByPk(id);

        const products = await products.findAll({
            where: {id: id},
            include: [categories]
        })
        if(!users) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro Nehum categoria encontrado!"
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
};

exports.create = async (req, res) => {
    var dados = req.body;
    await products.create(dados)
    .then(() =>{

        return res.json({
            erro: false,
            mensgem: 'Produto cadastrado com sucesso!'
        });
    }).catch(err => {
        return res.status(400).json({
            erro: true,
            mensgem: `Erro: Produto não cadastrado...${err}`
        })
    })
};

exports.update =async (req, res) => {
    const{ id} = req.body;

    await products.update(req.body,{ where: { id}})
    .then(()=>{
        return res.json({
            erro:false,
            mensagem: " categoria alterado com sucesso"
        })
    }).catch((err) => {
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: categoria não alterado ...${err}`
        })
    })
};

exports.delete = async (req, res)=>{
     const {id} = req.params;
     await products.destroy({where: { id}})
     .then(()=>{
         return res.json({
             erro:false,
             mensagem: " categoria apagado com sucesso"
         });

     }).catch(() => {
         return res.status(400).json({
             erro:true,
             mensagem: `Erro: ${err} categoria  não apagado...`
         });
     });
 };