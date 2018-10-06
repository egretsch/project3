const router = require("express").Router();
const bookmarkedProductsController = require("../../controllers/bookmarkedProductsController");
const userController = require("../../controllers/userController");

// routes user info to server
router.route("/")
  .post(userController.create);
// routes login info to server
router.route("/login")
  .post(userController.findOne);

// router.post('/products', function (req, res) {
  // console.log(req.body);
  // console.log(req.session.user);
// })

router.route('/products')
  .post(bookmarkedProductsController.saveProduct);


module.exports = router;
