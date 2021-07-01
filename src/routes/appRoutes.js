var express = require('express');
var router = express.Router();
var { validationRules, validate } = require('../middlewares/validator');
var auth = require("../middlewares/auth");

const userController = require('../controllers/userController');
const mechanicController = require('../controllers/mechanicController');
const requestController = require('../controllers/requestController')
const notificationController = require('../controllers/notificationController')
const expoController = require('../controllers/expoTokenController');
const getGeneralDetails = require('../controllers/getGeneralController');

router.post('/addUser', validationRules.addUserDetails(), validate, userController.addUserDetails)
router.post('/getUser', validationRules.getUserDetails(), validate, userController.getUserDetails)
router.post('/getUsers', validationRules.getAllUserDetails(), validate, userController.getAllUserDetails)
router.post('/updateUser', validationRules.updateUserDetails(), validate, auth, userController.updateUserDetails)
router.post('/changePassword', validationRules.changePassword(), validate, auth, userController.changePassword)

router.post('/userLoginByMobile', validationRules.userLoginByMobile(), validate, userController.userLoginByMobile)
router.post('/userLoginByEmail', validationRules.userLoginByEmail(), validate, userController.userLoginByEmail)

router.post('/addMechanic', validationRules.addMechanicDetails(), validate, auth, mechanicController.addMechanicDetails)
router.post('/getMechanic', validationRules.getMechanicDetails(), validate, auth, mechanicController.getMechanicDetails)
router.post('/getMechanics', validationRules.getAllMechanicDetails(), validate, auth, mechanicController.getAllMechanicDetails)
router.post('/updateMechanic', validationRules.updateMechanicDetails(), validate, auth, mechanicController.updateMechanicDetails)

router.post('/raiseRequest', validationRules.raiseRequest(), validate, auth, requestController.addRaiseRequest)
router.post('/getRaiseRequest', validationRules.getRaiseRequest(), validate, auth, requestController.getRaiseRequest)
router.post('/getRaiseRequestById', validationRules.getRaiseRequestById(), validate, auth, requestController.getRaiseRequestById)
router.post('/getAllRaiseRequests', validationRules.getAllRaiseRequests(), validate, auth, requestController.getAllRaiseRequests)
router.post('/updateRaiseRequest', validationRules.updateRaiseRequest(), validate, auth, requestController.updateRaiseRequest)

router.post('/feedback', validationRules.feedback(), validate, auth, userController.addFeedback)

router.post('/sendNotification', notificationController.sendNotification)

router.post('/expoToken', validationRules.expoToken(), validate, auth, expoController.expoToken)

router.post('/getGeneral', getGeneralDetails.getGeneralDetails)

module.exports = router;