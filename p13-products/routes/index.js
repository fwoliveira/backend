const router = require('express').Router();

const categoriesRoutes = require('./categories.routes')
router.use('/categories', categoriesRoutes);

const productsRoutes = require('./products.routes')
router.use('/products', productsRoutes);

const userRoutes = require('./users.routes')
router.use('/user', userRoutes);

module.exports = router;