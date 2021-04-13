var express = require('express');
var router = express.Router();
var {validationRules, validate} = require('../middlewares/validator');
var auth = require("../middlewares/auth");

const userController = require('../controllers/userController');
const mechanicController = require('../controllers/mechanicController');

router.post('/addUser', validationRules.addUserDetails(), validate, userController.addUserDetails)
router.post('/getUser', validationRules.getUserDetails(), validate, userController.getUserDetails)
router.post('/getUsers', validationRules.getAllUserDetails(), validate, userController.getAllUserDetails)
router.post('/updateUser', validationRules.updateUserDetails(), validate, auth, userController.updateUserDetails)

router.post('/userLoginByMobile', validationRules.userLoginByMobile(), validate, userController.userLoginByMobile)
router.post('/userLoginByEmail', validationRules.userLoginByEmail(), validate, userController.userLoginByEmail)


router.post('/addMechanic', validationRules.addMechanicDetails(), validate, auth, mechanicController.addMechanicDetails)
router.post('/getMechanic', validationRules.getMechanicDetails(), validate, auth, mechanicController.getMechanicDetails)
router.post('/getMechanics', validationRules.getAllMechanicDetails(), validate, auth, mechanicController.getAllMechanicDetails)
router.post('/updateMechanic', validationRules.updateMechanicDetails(), validate, auth, mechanicController.updateMechanicDetails)


module.exports = router;