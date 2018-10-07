const router = require("express").Router();
const bookmarkedProductsController = require("../../controllers/bookmarkedProductsController");
const userController = require("../../controllers/userController");
const ingredientsController = require("../../controllers/ingredientsController");

// routes user info to server
router.route("/")
  .post(userController.create);
// routes login info to server
router.route("/login")
  .post(userController.findOne);


router.route('/products')
  .post(bookmarkedProductsController.saveProduct);

router.route('/ingredients')
  .post(ingredientsController.saveIngredient);

module.exports = router;
