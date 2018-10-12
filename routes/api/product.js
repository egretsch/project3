const router = require("express").Router();
const scannedProductController = require("../../controllers/scannedProductController");

router.route('/product/:code')
    .get(scannedProductController.getScannedProduct)
    .post(scannedProductController.saveScannedProduct);

module.exports = router;