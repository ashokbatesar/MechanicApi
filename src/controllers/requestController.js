const { getDate, getDistance } = require('../helpers/common');
const Mechanic = require('../models/mechanicModel');
const RaiseRequest = require('../models/raiseRequestModel');
const RequestControl = require('../models/requestControlModel')
const ExpoToken = require('../models/expoToken')
const Notifications = require('../libraries/notifications');

const { status, userType } = require('../configs/config');

exports.getRaiseRequest = async function (req, res) {

    RaiseRequest.getRaiseRequest(req.body.id)
        .then(result => {
            if (result) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "success", message: "No Data Found" })
            }
        })
}

exports.getRaiseRequestById = async function (req, res) {

    RaiseRequest.getRaiseRequestById(req.body.request_id)
        .then(result => {
            if (result) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "success", message: "No Data Found" })
            }
        })
}

exports.getAllRaiseRequests = async function (req, res) {
    RaiseRequest.getAllRaiseRequests()
        .then(result => {
            res.send({ status: "success", message: result })
        })
}

exports.addRaiseRequest = async function (req, res) {

    let user_id = req.body.id
    delete req.body.id
    delete req.body.token

    req.body.date = getDate()

    req.body.user_id = user_id

    let rqstResp = await RaiseRequest.addRaiseRequest(req.body);

    if (rqstResp.insertId) {
        let allMechs = await Mechanic.getAllMechanicDetails()

        let arr = Array()

        for (mech of allMechs) {
            let param = {
                lat1: req.body.latitude,
                lon1: req.body.longitude,
                lat2: mech.latitude,
                lon2: mech.longitude
            }

            let res = await getDistance(param)
            let press = {
                id: mech.id,
                distance: res
            }
            arr.push(press)
        }

        arr.sort((a, b) => (a.distance > b.distance ? 1 : -1))

        let paramForControl = {
            request_id: rqstResp.insertId,
            avl_mechanics: JSON.stringify(arr)
        }

        await RequestControl.addRequestControl(paramForControl)

        res.send({ status: "success", message: rqstResp.insertId })
    } else {
        res.send({ status: "failure", message: rqstResp.error })
    }
}

exports.updateRaiseRequest = async function (req, res) {

    var id = req.body.request_id
    delete req.body.id
    delete req.body.token
    delete req.body.request_id

    let placingRequest = false
    if (req.body.status && req.body.status == status.PLACED) {
        console.log("order placing");
        placingRequest = true
    }

    req.body.updated_at = getDate('timestamp')


    let updateResp = await RaiseRequest.updateRaiseRequest(id, req.body)

    if (updateResp.error) {
        res.send({ status: "failure", message: updateResp.error })
    } else {
        if (placingRequest) {
            let userDet = await RaiseRequest.getRaiseRequestById(id)

            console.log(userDet.user_id);
            let expos = await ExpoToken.getExpoTokenDetails(userDet.user_id, userType.CUSTOMER)

            if (expos) {
                console.log("yes exp");
                for (var exp of JSON.parse(expos.expo_token)) {
                    let params = {
                        expoPushToken: exp,
                        title: "Wohoo Mechanic Found",
                        body: "You got an mechanic. now please complete your payment to proceed further",
                        someData: id,
                        user_id: userDet.user_id,
                        user_type: userType.CUSTOMER
                    }
                    await Notifications.sendNotification(params)
                }
            }
        }
        res.send({ status: "success", message: updateResp.affectedRows })
    }
}