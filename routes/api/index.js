const router = require("express").Router();
const productRoutes = require('./products');
const ingredientRoutes = require('./ingredients');

// routes
router.use('/products', productRoutes);
router.use('/ingredients', ingredientRoutes);


module.exports = router;
