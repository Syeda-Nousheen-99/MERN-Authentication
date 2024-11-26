const express = require('express');
const { signupValidation, loginValidation } = require('../Middlerwares/AuthMiddleware');
const router = express.Router(); 
const {signup, login} = require('../Controllers/AuthController')

router.post('/login',loginValidation, login)

router.post('/signup', signupValidation, signup )

module.exports = router;
