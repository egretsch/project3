const router = require("express").Router();
<<<<<<< HEAD
const productRoutes = require('./products');
const ingredientRoutes = require('./ingredients');

// routes
router.use('/products', productRoutes);
router.use('/ingredients', ingredientRoutes);

=======
const userRoutes = require("./user");

// User routes
router.use("/user", userRoutes);
>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6

module.exports = router;
