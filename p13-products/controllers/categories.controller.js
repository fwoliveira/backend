const categories = require('../models/categories');




exports.findAll = async (req, res) => {
    await categories.findAll({
        attributes: ['id','name', 'description',],
        order:[['name','ASC']]
    })
    .then( (categories) => {
        return res.json({
            erro:false,
            categories
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
        // await categories.findAll({ where: { id: id }})
        const categories = await categories.findByPk(id);
        if(!categories) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro Nehum categoria encontrado!"
            })
        }
        res.status(200).json({
            erro: false,
            categories
        })
    }catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
};

exports.create = async (req, res) => {
    const{ name, description } = req.body;
    await categories.create(req.body,{name, description})
    .then(()=>{
        return res.json({
            erro: false,
            mensagem:'categoria cadastrado com sucesso!'
        });
    }).catch((err) => {
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: categoria  não cadastrado...${err}`
        })
    })
};

exports.update =async (req, res) => {
    const{ id} = req.body;

    await categories.update(req.body,{ where: {id}})
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
     await categories.destroy({where: {id}})
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
