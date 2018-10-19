const db = require("../models/");

module.exports = {
    getScannedProduct: function (req, res) {
        
        console.log("HEY TEST THIS OUT!")

        console.log("params", req.params.code);
        
        db.Product
            .findOne({
                upcCode: req.params.code
            })
            .then(dbModel => {
                // console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err))
    },

    saveScannedProduct: function (req, res) {
        console.log("REQ BODY", req.body)
        const brandName = req.body.brandName
        const code = req.body.upcCode

        console.log(
                    '\nbrand name: ', brandName,
                    '\nthe code: ', code);
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
