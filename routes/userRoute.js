const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.get('/get', userController.allUser) //http://localhost:3523/user/get
router.post('/register', userController.registerUser) //http://localhost:3523/user/register
router.post('/login', userController.loginUser) //http://localhost:3523/user/login
router.post('/logout', userController.logoutUser) //http://localhost:3523/user/logout
router.get('/get/:id', userController.getUserById) //http://localhost:3523/user/get/:id 
router.put('/update/:id', userController.updateUser) //http://localhost:3523/user/update/:id    
router.delete('/delete/:id', userController.deleteUser) //http://localhost:3523/user/delete/:id 

module.exports = router;