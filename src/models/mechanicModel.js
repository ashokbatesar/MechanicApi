var db = require('../helpers/dbConnection');
const common = require('../helpers/common');

var Mechanic = function (data) {
    this.user = data.user_id
}

Mechanic.getMechanicDetails = id => {
    return new Promise((resolve, reject) => {
        db.query('SELECT name, email, mobile, gender, aadhar_number, pan_number, driving_licence FROM mechanic WHERE id = ?', id, (error, result) => {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}

Mechanic.getAllMechanicDetails = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name, email, mobile, gender, aadhar_number, pan_number, driving_licence FROM mechanic', (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

Mechanic.addMechanicDetails = params => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO mechanic SET ?', params, (error, result) => {
            if (error) {
                if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('email')) {
                    resolve({ error: "Email already registered" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('mobile')) {
                    resolve({ error: "Mobile No already registered" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('aadhar_number')) {
                    resolve({ error: "AADHAR No already registered" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('pan_number')) {
                    resolve({ error: "PAN No already registered" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('driving_licence')) {
                    resolve({ error: "DL already registered" })
                }
            } else {
                resolve(result)
            }
        })
    })
}

Mechanic.updateMechanicDetails = (id, params) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE mechanic SET ? WHERE id = ?', [params, id], (error, result) => {
            if (error) {
                if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('email')) {
                    resolve({ error: "Invalid Email" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('mobile')) {
                    resolve({ error: "Invalid Mobile Number" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('aadhar_number')) {
                    resolve({ error: "Invalid AADHAR Number" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('pan_number')) {
                    resolve({ error: "Invalid PAN Number" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('driving_licence')) {
                    resolve({ error: "Invalid DL" })
                }
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = Mechanic;