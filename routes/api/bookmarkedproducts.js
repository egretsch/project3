const router = require("express").Router();
const bookmarkedProductsController = require("../../controllers/bookmarkedProductsController");


//Thinking about what the controllers are doing, the data should be coming from user instead of products.
//So how do we fix this?


router.route("/")
  .get(bookmarkedProductsController.findAll)
  .post(bookmarkedProductsController.create);

// router
  // .route("/:id")
  // .get(bookmarkedProductsController.findById)
  // .put(bookmarkedProductsController.update)
  // .delete(bookmarkedProductsController.remove);

module.exports = router;
  