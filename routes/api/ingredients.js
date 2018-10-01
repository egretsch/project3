const router = require("express").Router();
const ingredientsController = require("../../controllers/ingredientsController");

// Matches with "/api/ingredients"
router.route("/")
  .get(ingredientsController.findAll)
  .post(ingredientsController.create);

// Matches with "/api/ingredients/:id"
router
  .route("/:id")
  .get(ingredientsController.findById)
  .put(ingredientsController.update)
  .delete(ingredientsController.remove);

module.exports = router;
