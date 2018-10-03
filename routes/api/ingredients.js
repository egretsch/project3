const router = require("express").Router();
const ingredientsController = require("../../controllers/ingredientsController");

// Matches with "/api/:user/ingredients"
router.route("/:user")
  .get(ingredientsController.findAll)
  .post(ingredientsController.create);

// Matches with "/api/user/ingredients/:id"
router
  .route("/:user/:id")
  .get(ingredientsController.findById)
  .put(ingredientsController.update)
  .delete(ingredientsController.remove);

module.exports = router;
