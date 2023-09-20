const express = require('express');
const router = express.Router(); 
const userController = require('../controller/authendication.controller');




router.post('/login', userController.loginUser); 
router.get('/books/:username', userController.getUserBooks);
router.post('/signin',userController.signup)

module.exports = router;
