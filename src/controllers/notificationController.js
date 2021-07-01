const { getDate } = require('../helpers/common');
const Notifications = require('../libraries/notifications');


exports.sendNotification = async function (req, res) {

    let params = {
        expoPushToken: req.body.expoPushToken,
        title: req.body.title,
        body: req.body.notifcationBody,
        someData: req.body.someData
    }

    Notifications.sendNotification(params)
        .then(result => {
            if (result) {
                res.send({ status: "success", message: result })
            } else {
                res.send({ status: "success", message: "Failed" })
            }
        })
}
