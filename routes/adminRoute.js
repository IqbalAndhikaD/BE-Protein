const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router()

router.get('/get', adminController.allAdmin) //http://localhost:3523/admin/get
router.post('/register', adminController.registerAdmin) //http://localhost:3523/admin/register
router.post('/login', adminController.loginAdmin) //http://localhost:3523/admin/login
router.post('/logout', adminController.logoutAdmin) //http://localhost:3523/admin/logout
router.get('/get/:id', adminController.getAdminById) //http://localhost:3523/admin/get/:id
router.put('/update/:id', adminController.updateAdmin) //http://localhost:3523/admin/update/:id
router.delete('/delete/:id', adminController.deleteAdmin) //http://localhost:3523/admin/delete/:id  

module.exports = router;