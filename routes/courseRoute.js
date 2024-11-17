const courseController = require('../controllers/courseController');
const express = require('express');
const router = express.Router();

router.get('/all', courseController.getAllCourses);// http://localhost:3523/course/all
router.get('/get/:id', courseController.getCourse); // http://localhost:3523/course/get/:id
router.post('/create', courseController.createCourse); // http://localhost:3523/course/create
router.put('/update/:id', courseController.updateCourse); // http://localhost:3523/course/update/:id
router.delete('/delete/:id', courseController.deleteCourse);// http://localhost:3523/course/delete/:id

module.exports = router;