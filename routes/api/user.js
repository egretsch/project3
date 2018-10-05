const router = require("express").Router();
<<<<<<< HEAD
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
=======
const userController = require("../../controllers/userController");

// routes user info to server
router.route("/")
  .post(userController.create);
// routes login info to server
router.route("/login")
  .post(userController.findOne);


>>>>>>> 1d727a190d7199bc84841cb9bc9bb5eb13da50f6

module.exports = router;
