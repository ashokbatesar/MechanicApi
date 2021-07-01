var db = require('../helpers/dbConnection');
const common = require('../helpers/common');

var RequestControl = function (data) {
    this.user = data.user_id
}

RequestControl.getRequestControl = id => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM request_control WHERE request_id = ?', id, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

RequestControl.getRequestControlById = id => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM request_control WHERE id = ?', id, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}


RequestControl.getAllRequestControls = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM request_control', (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

RequestControl.addRequestControl = params => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO request_control SET ?', params, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

RequestControl.updateRequestControl = (request_id, params) => {
    console.log(request_id, params);
    return new Promise((resolve, reject) => {
        db.query('UPDATE request_control SET ? WHERE request_id = ?', [params, request_id], (error, result) => {
            if (error) {
                resolve({ error: "Invalid params" })
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = RequestControl;