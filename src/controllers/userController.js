const { getDate } = require('../helpers/common');
const User = require('../models/userModel');

exports.userLoginByMobile = async function (req, res) {

    User.userLogin("mobile", req.body.mobile, req.body.password)
        .then(result => {
            res.send({ status: "success", message: result })
        })
}
exports.userLoginByEmail = async function (req, res) {

    User.userLogin("email", req.body.email, req.body.password)
        .then(result => {
            if (result.token) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "failure", message: result.error })
            }
        })
}

exports.getUserDetails = async function (req, res) {

    User.getUserDetails(req.body.id)
        .then(result => {

            if (result) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "success", message: "No Data Found" })
            }
        })
}

exports.getAllUserDetails = async function (req, res) {
    User.getAllUserDetails()
        .then(result => {
            res.send({ status: "success", message: result })

        })
}

exports.addUserDetails = async function (req, res) {
    delete req.body.action_taken_by
    delete req.body.token

    User.addUserDetails(req.body)
        .then(result => {
            if (result.error) {
                res.send({ status: "failure", message: result.error })
            } else {

                User.userLogin("email", req.body.email, req.body.password)
                    .then(result => {
                        if (result.token) {
                            res.send({ status: "success", message: result })
                        } else {
                            res.send({ status: "failure", message: result.error })
                        }
                    })
                //      res.send({ status: "success", message: result.insertId })


            }
        })
}

exports.updateUserDetails = function (req, res) {

    var id = req.body.id
    delete req.body.id
    delete req.body.token

    req.body.updated_at = getDate('timestamp')

    User.updateUserDetails(id, req.body)
        .then(result => {
            if (result.error) {
                res.send({ status: "failure", message: result.error })
            } else {
                res.send({ status: "success", message: result.affectedRows })
            }
        })
}