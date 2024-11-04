const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router()

router.get('/alladmin', adminController.allAdmin) //http://localhost:3523/admin/alladmin
router.post('/register', adminController.registerAdmin) //http://localhost:3523/admin/register
router.post('/login', adminController.loginAdmin) //http://localhost:3523/admin/login
module.exports = router;