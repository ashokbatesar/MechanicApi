const { getDate } = require('../helpers/common');
const { status, userType } = require('../configs/config')
const db = require('../helpers/dbConnection')

const Notifications = require('../libraries/notifications');
const ExpoToken = require('../models/expoToken')
const RaiseRequest = require('../models/raiseRequestModel');
const RequestControl = require('../models/requestControlModel')

exports.transactionStatus = () => {

    let date = getDate('date', -2);
    let query = `SELECT * from requests WHERE date > '${date}' AND status = '${status.PLACED}'`

    db.query(query, (err, rows) => {

        rows.forEach(row => {
            console.log(row);
        })
    })

    console.log('Cron Execution Done !!!')
}

exports.mechanicStatus = () => {
    let date = getDate('date');

    console.log("date", date);
    let query = `SELECT r.id, r.user_id, r.mechanic_id, r.service_code, r.date, r.status, rc.avl_mechanics, rc.notified_mechanics FROM requests r JOIN request_control rc ON (r.id = rc.request_id) WHERE r.date = '${date}' AND r.status = '${status.PENDING}' GROUP BY r.id`

    db.query(query, (err, rows) => {

        rows.forEach(row => {

            if (row.service_code == 0) {
                let avl_mechs = JSON.parse(row.avl_mechanics)

                ExpoToken.getExpoTokenDetails(avl_mechs[0].id, userType.MECHANIC).then(result => {

                    for (var exp of JSON.parse(result.expo_token)) {
                        let params = {
                            expoPushToken: exp,
                            title: "New Service Request",
                            body: "You Have An Request For Service, Please Reply This",
                            someData: row.id
                        }
                        Notifications.sendNotification(params)
                    }

                    RaiseRequest.updateRaiseRequest(row.id, { 'service_code': 1 })

                })
            } else {
                let avl_mechs = JSON.parse(row.avl_mechanics)

                let notified_mechs = []
                if (row.notified_mechanics != '') {
                    notified_mechs = JSON.parse(row.notified_mechanics)
                }
                notified_mechs.push(avl_mechs[0])
                
                avl_mechs.splice(0, 1);

                ExpoToken.getExpoTokenDetails(avl_mechs[0].id, userType.MECHANIC).then(result => {

                    for (var exp of JSON.parse(result.expo_token)) {
                        let params = {
                            expoPushToken: exp,
                            title: "New Service Request",
                            body: "You Have An Request For Service, Please Reply This",
                            someData: row.id
                        }
                        Notifications.sendNotification(params)
                    }
                    RequestControl.updateRequestControl(row.id, { avl_mechanics: JSON.stringify(avl_mechs), notified_mechanics: JSON.stringify(notified_mechs) })
                })
            }
        })
    })

    console.log('Cron Execution Done !!!')
}