const { getDate } = require('../helpers/common');
const Mechanic = require('../models/mechanicModel');


exports.getMechanicDetails = async function (req, res) {

    Mechanic.getMechanicDetails(req.body.id)
        .then(result => {
            if (result) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "success", message: "No Data Found" })
            }
        })
}

exports.getAllMechanicDetails = async function (req, res) {
    Mechanic.getAllMechanicDetails()
        .then(result => {
            res.send({ status: "success", message: result })
        })
}

exports.addMechanicDetails = async function (req, res) {

    delete req.body.token

    Mechanic.addMechanicDetails(req.body)
        .then(result => {
            if (result.error) {
                res.send({ status: "failure", message: result.error })
            } else {
                res.send({ status: "success", message: result.insertId })
            }
        })
}

exports.updateMechanicDetails = function (req, res) {

    var id = req.body.id
    delete req.body.id
    delete req.body.token

    req.body.updated_at = getDate('timestamp')

    Mechanic.updateMechanicDetails(id, req.body)
        .then(result => {
            if (result.error) {
                res.send({ status: "failure", message: result.error })
            } else {
                res.send({ status: "success", message: result.affectedRows })
            }
        })
}