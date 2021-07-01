const GetGeneral = require('../models/getGeneralModel');

exports.getGeneralDetails = async function (req, res) {

    GetGeneral.getGeneralDetails()
        .then(result => {
            if (result) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "failure", message: "No Data Found" })
            }
        })
}

