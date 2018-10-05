const router = require("express").Router();
const bookmarkedProductsController = require("../../controllers/bookmarkedProductsController");

// Matches with "/api/products"
router.route("/")
  .get(bookmarkedProductsController.findAll)
  .post(bookmarkedProductsController.create);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .get(bookmarkedProductsController.findById)
  .put(bookmarkedProductsController.update)
  .delete(bookmarkedProductsController.remove);

module.exports = router;
