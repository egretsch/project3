const router = require("express").Router();
const bookmarkedProductRoutes = require('./bookmarkedproducts.js');
const ingredientRoutes = require('./ingredients');
const userRoutes = require("./user");

// routes
router.use('/bookmarkedproducts', bookmarkedProductRoutes);
router.use('/ingredients', ingredientRoutes);
// User routes
router.use("/user", userRoutes);



module.exports = router;
