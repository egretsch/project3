const router = require("express").Router();
const userController = require("../../controllers/userController");

// routes user info to server
router.route("/")
  .post(userController.create);
// routes login info to server
router.route("/login")
  .post(userController.findOne);



module.exports = router;
