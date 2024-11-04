const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.get('/getAllUser', userController.getAllUser)
router.post('/postUser', userController.postUser)
module.exports = router;