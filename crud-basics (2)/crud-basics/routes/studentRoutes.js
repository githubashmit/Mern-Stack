const express = require('express')
const router = express.Router();
const protect = require('../middleware/auth')

const { createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent, loginStudent, getProfile }
    = require('../controllers/studentController');

router.post('/', createStudent)
router.get('/', getAllStudents)
router.get('/profile', protect, getProfile)
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)
router.post('/login', loginStudent)

module.exports = router;
