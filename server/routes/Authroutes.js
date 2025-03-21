const express = require('express');
const router = express.Router();
const registerAdmin = require('../controller/Auth.signup.js');
const loginAdmin = require('../controller/Auth.login.js');
const {isAdmin} = require('../middleware/Admin.auth.js');
const checkAuth = require('../middleware/Check.auth.js');

router.post('/signup', registerAdmin);

router.post('/login', loginAdmin);

router.get('/check-auth', checkAuth);

router.get('/dashboard',isAdmin,(req,res) =>{
    res.json({message: 'Admin dashboard'})
})

module.exports = router;