const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router()

router.get('/getAllAdmin', adminController.getAllAdmin)
router.post('/postAdmin', adminController.postAdmin)
module.exports = router;