const Student = require("../models/Student")

const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        const saved = await student.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(400).json({ error: err.message })
    }
}

const getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students)
}

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            return res.status(404).json({ message: 'Not found ' })
        res.json(student)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateStudent = async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated)
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student Deleted' })
    } catch (error) {
        res.status(500).json({ error: err.message })

    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}