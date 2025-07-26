const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');

router.get('/', courseController.getCourses);
router.post('/', auth, courseController.addCourse);
router.delete('/:id', auth, courseController.deleteCourse);

module.exports = router; 