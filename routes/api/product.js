const router = require("express").Router();
const scannedProductController = require("../../controllers/scannedProductController");

router.route('/')
    .post(scannedProductController.saveScannedProduct);

router.route('/:code')
    .get(scannedProductController.getScannedProduct);
    
module.exports = router;