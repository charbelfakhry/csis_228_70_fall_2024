const express = require('express');
const { getAllClientsController } = require('../controllers/clientController');
const authenticateToken = require('./middleware');
//const { insertUserValidation, updateUserValidation } = require('../validations/users-validator');
const router = express.Router();

router.get('/getAllClients', authenticateToken, getAllClientsController);
//router.post('/insertClient', insertUserValidation, insertUserController);
//router.put('/updateClient', updateUserValidation, updateUserController);




module.exports = router;