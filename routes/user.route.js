const express = require('express');
const { getAllUsersController } = require('../controllers/userController');
const router = express.Router();

router.get('/getAllUsers', getAllUsersController);


module.exports = router;