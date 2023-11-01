const express = require('express');
const { getAllUsersController, insertUserController, updateUserController, authenticateController } = require('../controllers/userController');
const { insertUserValidation, updateUserValidation } = require('../validations/users-validator');
const router = express.Router();

router.get('/getAllUsers', getAllUsersController);
router.post('/insertUser', insertUserValidation, insertUserController);
router.put('/updateUser', updateUserValidation, updateUserController);

router.post('/authenticate', authenticateController);




module.exports = router;