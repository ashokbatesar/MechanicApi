var db = require('../helpers/dbConnection');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var User = function (data) {
    this.user = data.user_id
}

User.getUserDetails = id => {
    return new Promise((resolve, reject) => {
        db.query('SELECT name, email, mobile FROM users WHERE id = ?', id, (error, result) => {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}

User.getAllUserDetails = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name, email, mobile FROM users', (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

User.addUserDetails = params => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(params.password, salt, function (err, hash) {

                delete params.password
                params.password = hash

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
            });
        });
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
        query = 'SELECT id, password FROM users WHERE ' + type + ' = ?'
        db.query(query, value, (error, result) => {
            if (!error) {
                if (result.length != 0) {
                    result = result[0]

                    bcrypt.compare(password, result.password, function (err, result) {
                        if (result) {
                            const token = jwt.sign(result.id + 2, process.env.SECRET);
                            resolve({ id: result.id, token: token })
                        } else {
                            resolve({ error: "Invalid UserName/Password" })
                        }
                    });
                } else {
                    resolve({ error: "Invalid UserName/Password" })
                }
            } else {
                resolve({ error: "Invalid UserName/Password" })
            }
        })
    })
}

User.addFeedback = params => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO feedback SET ?', params, (error, result) => {
            if (error) {
                resolve({ error: error })
            } else {
                resolve(result)
            }
        })
    })
}

User.changePassword = params => {

    return new Promise((resolve, reject) => {
        query = 'SELECT password FROM users WHERE id = ?'
        db.query(query, params.id, (error, result) => {
            if (!error) {
                if (result.length != 0) {
                    result = result[0]

                    bcrypt.compare(params.current_password, result.password, function (err, result) {
                        if (result) {

                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(params.new_password, salt, function (err, hash) {

                                    param = {
                                        password: hash,
                                        updated_at: params.updated_at
                                    }

                                    db.query('UPDATE users SET ? WHERE id = ?', [param, params.id], (error, result) => {
                                        if (error) {
                                            resolve({ error: "something went wrong" })
                                        } else {
                                            resolve(result.affectedRows)
                                        }
                                    })
                                });
                            });
                        } else {
                            resolve({ error: "Invalid Password" })
                        }
                    });
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