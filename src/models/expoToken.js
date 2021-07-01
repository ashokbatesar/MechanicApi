var db = require('../helpers/dbConnection');
const common = require('../helpers/common');

var ExpoToken = function (data) {
    this.user = data.user_id
}

ExpoToken.getExpoTokenDetails = (id, type) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM expo_tokens WHERE user_id = ? AND user_type = ?', [id, type], (error, result) => {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}

ExpoToken.getAllExpoTokenDetails = (type) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM expo_tokens WHERE user_type = ?', type, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

ExpoToken.addExpoTokenDetails = params => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO expo_tokens SET ?', params, (error, result) => {
            if (error) {
                resolve({ error: "Error" })
            } else {
                resolve(result)
            }
        })
    })
}

ExpoToken.updateExpoTokenDetails = (id, params, type) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE expo_tokens SET ? WHERE user_id = ? AND user_type = ?', [params, id, type], (error, result) => {
            if (error) {
                resolve({ error: "Error" })
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = ExpoToken;