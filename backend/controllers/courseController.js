const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { title, description, level } = req.body;
    const course = new Course({
      title,
      description,
      level,
      createdBy: req.user.userId
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    // Only admin can delete
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await course.deleteOne();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 