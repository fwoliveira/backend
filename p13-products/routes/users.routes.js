const userRoutes = require('express').Router();
const User = require('../controllers/user.controller');
const { validarToken } = require('../middlewares/Auth');


userRoutes.get("/validaToken", User.validaToken);

userRoutes.get("/all", User.findAll);

// userRoutes.get("/show:id",validarToken,User.findOne);

userRoutes.post("/create",User.create);

userRoutes.post("/login",User.login);

userRoutes.put("/update",User.update);

userRoutes.delete("/delete/:id",User.delete);





module.exports = userRoutes;