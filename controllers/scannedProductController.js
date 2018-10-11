const db = require("../models/");

module.exports = {
    getScannedProduct: function (req, res) {
        console.log(req)
        const code = req.params.code
        db.Product
            .findOne({
                upcCode: code
            })
            .then(dbModel => {
                // console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err))
    },

    saveScannedProduct: function (req, res) {
        console.log(req)
        const brandName = req.body.brandName
        const code = req.body.code
        db.Product
            .create({
                brandName: brandName,
                upcCode: code
            })
            .then(dbModel => {
                res.json(dbModel)
            }).catch(err => res.status(422).json(err))
    },
};
