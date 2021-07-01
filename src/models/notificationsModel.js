var db = require('../helpers/dbConnection');

var Notifications = function (data) {

}

Notifications.getCount = params => {
    return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) FROM notifications WHERE user_id = ? AND user_type = ? AND is_read = 0 AND is_active = 1', [params.user_id, params.user_type], (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

Notifications.getNotifications = params => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM notifications WHERE user_id = ? AND user_type = ? AND is_active = 1', [params.user_id, params.user_type], (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

Notifications.addNotification = params => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO notifications SET ?', params, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

Notifications.updateNotification = params => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE notifications SET ? WHERE user_id = ? AND user_type = ?', [params.is_read, params.user_id, params.user_type], (error, result) => {
            if (error) {
                resolve({ error: "Error" })
            } else {
                resolve(result)
            }
        })
    })
}

Notifications.deleteNotification = params => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE notifications SET ? WHERE user_id = ? AND user_type = ?', [params.is_read, params.is_active, params.user_id, params.user_type], (error, result) => {
            if (error) {
                resolve({ error: "Error" })
            } else {
                resolve(result)
            }
        })
    })
}



module.exports = Notifications;