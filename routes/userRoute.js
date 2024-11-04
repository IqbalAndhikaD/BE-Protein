const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.get('/alluser', userController.allUser) //http://localhost:3523/user/alluser
router.post('/register', userController.registerUser) //http://localhost:3523/user/register
router.post('/login', userController.loginUser) //http://localhost:3523/user/login
module.exports = router;