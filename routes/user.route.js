const express = require('express');
const { getAllUsersController, insertUserController } = require('../controllers/userController');
const router = express.Router();

router.get('/getAllUsers', getAllUsersController);
router.post('/insertUser', insertUserController);



module.exports = router;