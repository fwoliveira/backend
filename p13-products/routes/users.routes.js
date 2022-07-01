const userRoutes = require('express').Router();
const User = require('../controllers/user.controller');

userRoutes.get("/all",User.findAll);

userRoutes.get("/show:id",User.findOne);

userRoutes.post("/create",User.create);

userRoutes.put("/update",User.update);

userRoutes.delete("/delete/:id",User.delete);

module.exports = userRoutes;