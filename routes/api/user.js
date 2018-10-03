const router = require("express").Router();
const uesrController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  // .get(uesrController.findAll)
  .post(uesrController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(uesrController.findById)
//   .put(uesrController.update)
//   .delete(uesrController.remove);

module.exports = router;
