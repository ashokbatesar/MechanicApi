const { getDate } = require('../helpers/common');
const ExpoToken = require('../models/expoToken');

exports.expoToken = async function (req, res) {

    console.log("new req");

    delete req.body.token

    let expoDet = await ExpoToken.getExpoTokenDetails(req.body.id, req.body.user_type)

    if (expoDet) {
        expToken = JSON.parse(expoDet.expo_token)

        let alreadyExist = false

        for (exp of expToken) {
            if (req.body.expo_token == exp) {
                alreadyExist = true
                break
            }
        }

        if (!alreadyExist) {
            expToken.push(req.body.expo_token)

            ExpoToken.updateExpoTokenDetails(req.body.id, { 'expo_token': JSON.stringify(expToken) }, req.body.user_type)
                .then(result => {
                    if (result.error) {
                        res.send({ status: "failure", message: result.error })
                    } else {
                        res.send({ status: "success", message: result })
                    }
                })

        } else {
            res.send({ status: "failure", message: "Already Exists" })
        }
    } else {
        let userId = req.body.id
        delete req.body.id

        req.body.user_id = userId

        let exppp = []
        exppp.push(req.body.expo_token)
        delete req.body.expo_token

        req.body.expo_token = JSON.stringify(exppp)

        ExpoToken.addExpoTokenDetails(req.body)
            .then(result => {
                if (result.error) {
                    res.send({ status: "failure", message: result.error })
                } else {
                    res.send({ status: "success", message: result.affectedRows })
                }
            })
    }

}
