const express = require('express');
const router = express.Router(); 
const fs = require('fs');
const userController = require('../controller/authendication.controller');
const jsonFile = 'username.json';
let users = [];


router.post('/login', userController.loginUser); 

router.get('/books/:userId', userController.getUserBooks);

module.exports = router;

