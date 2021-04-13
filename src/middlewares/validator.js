const { query, body, validationResult } = require('express-validator');
//const config = require('../configs/config');

const validationRules = {
    userLoginByMobile: function () {
        return [
            body('mobile', 'Mobile No is properly required').trim().escape().notEmpty(),
            body('password', 'Password is properly required').trim().escape().notEmpty()
        ]
    },
    userLoginByEmail: function () {
        return [
            body('email', 'Email is properly required').trim().escape().notEmpty(),
            body('password', 'Password is properly required').trim().escape().notEmpty()
        ]
    },
    getUserDetails: function () {
        return [
            body('action_taken_by', 'User Id is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty()
        ]
    },
    getAllUserDetails: function () {
        return [
            body('action_taken_by', 'User Id is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty()
        ]
    },
    addUserDetails: function () {
        return [
            body('name', 'Name is properly required').trim().escape().notEmpty(),
            body('mobile', 'Mobile is properly required').trim().escape().notEmpty(),
            body('email', 'Email is properly required').trim().escape().optional(),
            //body('gender', 'gender is properly required').trim().escape().notEmpty(),
            body('password', 'Password is properly required').trim().escape().notEmpty()
        ]
    },
    updateUserDetails: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('name', 'Name is properly required').trim().escape().optional(),
            body('mobile', 'Mobile is properly required').trim().escape().optional(),
            body('email', 'Email is properly required').trim().escape().optional(),
            body('gender', 'Gender is properly required').trim().escape().optional(),
            body('password', 'Password is properly required').trim().escape().optional()
        ]
    },
    getMechanicDetails: function () {
        return [
            body('action_taken_by', 'User Id is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('id', 'Mechanic ID is properly required').trim().escape().notEmpty(),
        ]
    },
    getAllMechanicDetails: function () {
        return [
            body('action_taken_by', 'User Id is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty()
        ]
    },
    addMechanicDetails: function () {
        return [
            body('action_taken_by', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('name', 'Name is properly required').trim().escape().notEmpty(),
            body('mobile', 'Mobile is properly required').trim().escape().notEmpty(),
            body('email', 'Email is properly required').trim().escape().optional(),
            body('gender', 'gender is properly required').trim().escape().notEmpty(),
            body('aadhar_number', 'AADHAR Number is properly required').trim().escape().optional(),
            body('pan_number', 'PAN Number is properly required').trim().escape().optional(),
            body('driving_licence', 'DL is properly required').trim().escape().optional()
        ]
    },
    updateMechanicDetails: function () {
        return [
            body('action_taken_by', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('id', 'Mechanic ID is properly required').trim().escape().notEmpty(),
            body('name', 'Name is properly required').trim().escape().optional(),
            body('mobile', 'Mobile is properly required').trim().escape().optional(),
            body('email', 'Email is properly required').trim().escape().optional(),
            body('gender', 'Gender is properly required').trim().escape().optional(),
            body('aadhar_number', 'AADHAR Number is properly required').trim().escape().optional(),
            body('pan_number', 'PAN Number is properly required').trim().escape().optional(),
            body('driving_licence', 'DL is properly required').trim().escape().optional()
        ]
    }
}


const validate = (req, res, next) => {

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    let extractedErrors = []
    // console.log(errors);
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(200).json({
        status: 'failure',
        code: 422,
        data: {
            description: 'Uproccesable Entity',
            errors: extractedErrors,
        }
    })
}

module.exports = {
    validationRules,
    validate,
}