const router = require("express").Router();
const productRoutes = require('./products');
const ingredientRoutes = require('./ingredients');
const userRoutes = require("./user");

// routes
router.use('/products', productRoutes);
router.use('/ingredients', ingredientRoutes);
// User routes
router.use("/user", userRoutes);



module.exports = router;
