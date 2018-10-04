const router = require("express").Router();
const uesrController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  .post(uesrController.create);
router.route("/login")
  .post(uesrController.findOne);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(uesrController.findById)
//   .put(uesrController.update)
//   .delete(uesrController.remove);

module.exports = router;
