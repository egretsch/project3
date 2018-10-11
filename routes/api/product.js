const router = require("express").Router();
const scannedProductController = require("../../controllers/scannedProductController");

router.route('/product')
    .get(scannedProductController.getScannedProduct)
    .post(scannedProductController.saveScannedProduct);

module.exports = router;