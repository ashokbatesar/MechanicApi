var db = require('../helpers/dbConnection');

const jwt = require('jsonwebtoken');

var User = function (data) {
    this.user = data.user_id
}

User.getUserDetails = id => {
    return new Promise((resolve, reject) => {
        db.query('SELECT name, email, mobile, gender FROM users WHERE id = ?', id, (error, result) => {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}

User.getAllUserDetails = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name, email, mobile, gender FROM users', (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

User.addUserDetails = params => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users SET ?', params, (error, result) => {
            if (error) {
                if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('email')) {
                    resolve({ error: "Email already registered" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('mobile')) {
                    resolve({ error: "Mobile No already registered" })
                }
            } else {
                resolve(result)
            }
        })
    })
}

User.updateUserDetails = (id, params) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET ? WHERE id = ?', [params, id], (error, result) => {

            if (error) {
                if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('email')) {
                    resolve({ error: "Invalid Email" })
                } else if (error.sqlMessage.includes('Duplicate') && error.sqlMessage.includes('mobile')) {
                    resolve({ error: "Invalid Mobile Number" })
                }
            } else {
                resolve(result)
            }
        })
    })
}

User.userLogin = (type, value, password) => {

    return new Promise((resolve, reject) => {

        query = 'SELECT id FROM users WHERE ' + type + ' = ? AND password = ?'

        db.query(query, [value, password], (error, result) => {

            if (!error) {
                if (result.length != 0) {
                    result = result[0]
                    const token = jwt.sign(result.id, process.env.SECRET);
                    resolve({id: result.id, token: token })
                } else {
                    resolve({ error: "Invalid UserName/Password" })
                }
            } else {
                resolve({ error: "Invalid UserName/Password" })
            }
        })
    })
}

module.exports = User;