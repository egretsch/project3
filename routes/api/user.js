const router = require("express").Router();
const ingredientsController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .get(ingredientsController.findAll)
  .post(ingredientsController.create);

// Matches with "/api/:user"
router
  .route("/:username")
  .get(ingredientsController.findByUsername)
  .put(ingredientsController.update)
  .delete(ingredientsController.remove);

module.exports = router;
