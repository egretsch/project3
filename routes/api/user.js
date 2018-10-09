const router = require("express").Router();
const bookmarkedProductsController = require("../../controllers/bookmarkedProductsController");
const userController = require("../../controllers/userController");
const ingredientsController = require("../../controllers/ingredientsController");

// routes user info to server
router.route("/")
  .get(userController.currentUser)
  .post(userController.create);

// routes login info to server
router.route("/login")
  .post(userController.findOne);


router
  .route('/products')
  .post(bookmarkedProductsController.bookmarkProduct)
  .get(bookmarkedProductsController.getBookmarkedProducts)
  .post(bookmarkedProductsController.deleteBookmarkedProduct)
  

router
  .route('/ingredients')
  .post(ingredientsController.saveIngredient)
  .get(ingredientsController.getSavedIngredients)
  .post(ingredientsController.deleteSavedIngredient)

module.exports = router;
