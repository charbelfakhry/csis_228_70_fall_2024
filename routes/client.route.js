const express = require('express');
const { getAllClientsController } = require('../controllers/clientController');
//const { insertUserValidation, updateUserValidation } = require('../validations/users-validator');
const router = express.Router();

router.get('/getAllClients', getAllClientsController);
//router.post('/insertClient', insertUserValidation, insertUserController);
//router.put('/updateClient', updateUserValidation, updateUserController);




module.exports = router;