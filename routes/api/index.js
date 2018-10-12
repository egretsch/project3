const router = require("express").Router();
const userRoutes = require("./user");
const productRoutes = require('./product');

// User routes
router.use("/user", userRoutes);
router.use('/products', productRoutes);


module.exports = router;
