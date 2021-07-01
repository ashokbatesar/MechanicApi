const { getDate } = require('../helpers/common');
const User = require('../models/userModel');

exports.userLoginByMobile = async function (req, res) {

    User.userLogin("mobile", req.body.mobile, req.body.password)
        .then(result => {
            if (result.token) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "failure", message: result.error })
            }
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

    password = req.body.password

    User.addUserDetails(req.body)
        .then(result => {
            if (result.error) {
                res.send({ status: "failure", message: result.error })
            } else {
                User.userLogin("email", req.body.email, password)
                    .then(result => {
                        if (result.token) {
                            res.send({ status: "success", message: result })
                        } else {
                            res.send({ status: "failure", message: result.error })
                        }
                    })
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

exports.addFeedback = function (req, res) {

    req.body.user_id = req.body.id
    delete req.body.id
    delete req.body.token

    req.body.created_at = getDate('timestamp')

    User.addFeedback(req.body)
        .then(result => {
            if (result.error) {
                res.send({ status: "failure", message: result.error })
            } else {
                res.send({ status: "success", message: result.affectedRows })
            }
        })
}


exports.changePassword = async function (req, res) {
    
    req.body.updated_at = getDate('timestamp')

    User.changePassword(req.body)
        .then(result => {
            if (result.error) {
                res.send({ status: "failure", message: result.error })
            } else {
                res.send({ status: "success", message: result })
            }
        })
}