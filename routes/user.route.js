const express = require('express');
const { getAllUsersController, insertUserController, updateUserController, authenticateController, deleteUserController, loadUserForm, loadUserFormController } = require('../controllers/userController');
const { insertUserValidation, updateUserValidation } = require('../validations/users-validator');
const router = express.Router();

router.get('/getAllUsers', getAllUsersController);
//router.get('/getUserById:id', getUserByIdValidator getUserById)
router.post('/insertUser', insertUserValidation, insertUserController);
router.put('/updateUser', updateUserValidation, updateUserController);

router.post('/authenticate', authenticateController);
router.get('/deleteUser/:user_id', deleteUserController)

router.get('/loadUserForm', loadUserFormController);




module.exports = router;