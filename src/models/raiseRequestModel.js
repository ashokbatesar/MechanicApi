var db = require('../helpers/dbConnection');
const common = require('../helpers/common');

var RaiseRequest = function (data) {
    this.user = data.user_id
}

RaiseRequest.getRaiseRequest = id => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, mechanic_id, current_mobile, latitude, longitude, veh_cat, problem, status, service_rating, created_at FROM requests WHERE user_id = ?', id, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

RaiseRequest.getRaiseRequestById = id => {
    return new Promise((resolve, reject) => {
        db.query('SELECT requests.id, requests.user_id, requests.mechanic_id,users.name, users.email, mechanic.name mname, mechanic.mobile mmobile, requests.current_mobile, requests.latitude, requests.longitude, requests.veh_cat, requests.veh_modal, requests.problem, requests.status, requests.service_rating, requests.created_at FROM requests LEFT JOIN users ON requests.user_id = users.id LEFT JOIN mechanic ON requests.mechanic_id = mechanic.id  WHERE requests.id = ?', id, (error, result) => {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}


RaiseRequest.getAllRaiseRequests = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, mechanic_id, current_mobile, latitude, longitude, veh_cat, veh_modal, veh_modal_year, veh_number, problem, status, service_rating, created_at FROM requests', (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

RaiseRequest.addRaiseRequest = params => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO requests SET ?', params, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

RaiseRequest.updateRaiseRequest = (id, params) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE requests SET ? WHERE id = ?', [params, id], (error, result) => {
            if (error) {
                resolve({ error: "Error" })
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = RaiseRequest;