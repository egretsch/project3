const router = require("express").Router();
const userController = require("../../controllers/userController");

// routes user info to server
router.route("/")
  .get(userController.currentUser)
  .post(userController.create);
router.route("/update")
  .post(userController.updateUser);


// routes login info to server
router.route("/login")
  .post(userController.findOne);

module.exports = router;
