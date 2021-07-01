var db = require('../helpers/dbConnection');

var GetGeneral = function (data) {
 
}

GetGeneral.getGeneralDetails = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT app_name, phone_no, email, version, android_link, ios_link FROM general_details', (error, result) => {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}


module.exports = GetGeneral;