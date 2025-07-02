const Student = require("../models/Student")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

// Hepler Function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


const createStudent = async (req, res) => {
    try {
        const { name, email, password, age, course } = req.body;
        const existing = await Student.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already registered" });
        const student = await Student.create({ name, email, password, age, course })
        res.status(201).json({ message: "Student registered successfully!" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ error: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, student.password)
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" })

        const token = createToken(student._id);
        res.json({ message: 'Login Successful', token })
    } catch (error) {
        res.status(400).json({ error: error.message })
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

const getProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json({ message: "Student Profile", student });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    loginStudent, getProfile
}