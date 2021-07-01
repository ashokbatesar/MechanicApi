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
            body('id', 'User Id is properly required').trim().escape().notEmpty(),
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
    },
    raiseRequest: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('current_mobile', 'Mobile is properly required').trim().escape().notEmpty(),
            body('latitude', 'Location is properly required').trim().escape().notEmpty(),
            body('longitude', 'Location is properly required').trim().escape().notEmpty(),
            body('veh_cat', 'Vehicle Category is properly required').trim().escape().notEmpty(),
            body('veh_modal', 'Vehicle Modal is properly required').trim().escape().notEmpty(),
            // body('veh_modal_year', 'Vehicle Modal Year is properly required').trim().escape().notEmpty(),
            // body('veh_number', 'Vehicle Number is properly required').trim().escape().notEmpty(),
            body('problem', 'Problem is properly required').trim().escape().notEmpty()
        ]
    },
    getRaiseRequest: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty()
        ]
    },
    getRaiseRequestById: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('request_id', 'Request ID is properly required').trim().escape().notEmpty()
        ]
    },
    getAllRaiseRequests: function () {
        return [
            body('action_taken_by', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty()
        ]
    },
    updateRaiseRequest: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('request_id', 'Request is properly required').trim().escape().notEmpty(),
            body('current_mobile', 'Mobile is properly required').trim().escape().optional(),
            body('status', 'Status is properly required').trim().escape().optional(),
            body('service_rating', 'Rating is properly required').trim().escape().optional(),
            body('mechanic_id', 'Mechanic is properly required').trim().escape().optional(),
        ]
    },
    expoToken: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('expo_token', 'Request is properly required').trim().escape().notEmpty(),
            body('user_type', 'User Type is properly required').trim().escape().notEmpty()
        ]
    },
    feedback: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('feedback', 'Feedback is properly required').trim().escape().notEmpty()
        ]
    },
    changePassword: function () {
        return [
            body('id', 'User ID is properly required').trim().escape().notEmpty(),
            body('token', 'Token is properly required').trim().escape().notEmpty(),
            body('current_password', 'Current Password is properly required').trim().escape().notEmpty(),
            body('new_password', 'New Password is properly required').trim().escape().notEmpty(),
            body('user_type', 'User Type is properly required').trim().escape().notEmpty()
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