const videoController = require('../controllers/videoController');
const express = require('express');
const router = express.Router();

router.get('/get', videoController.getVideos); // http://localhost:3523/video/get
router.post('/create', videoController.addVideo); // http://localhost:3523/video/create

module.exports = router;