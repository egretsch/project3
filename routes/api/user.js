const router = require("express").Router();
const bookmarkedProductsController = require("../../controllers/bookmarkedProductsController");
const userController = require("../../controllers/userController");
const ingredientsController = require("../../controllers/ingredientsController");

// routes user info to server
router.route("/")
  .get(userController.currentUser)
  .post(userController.create);

router.route("/update")
  .post(userController.updateUser);

router.route("/logout")
  .post(userController.logoutUser);

// routes login info to server
router.route("/login")
  .post(userController.findOne);


router
  .route('/products')
  .post(bookmarkedProductsController.bookmarkProduct)
  .get(bookmarkedProductsController.getBookmarkedProducts)


router
  .route('/ingredients')
  .post(ingredientsController.saveIngredient)
  .get(ingredientsController.getSavedIngredients)


//delete route because we can't use the same routes for two posts
router
  .route('/ingredients/delete')
  .post(ingredientsController.deleteSavedIngredient)

router
  .route('/products/delete')
  .post(bookmarkedProductsController.deleteBookmarkedProduct)
module.exports = router;
