const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');

//setup
dotenv.config();

//app
const app = express()
app.use(express.json())

//connect mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅Connected to Atlas"))
    .catch((err) => console.log("❌Error DB connection error"))

    //Routes
app.use('/students',studentRoutes)

// //simple schema
// const studentSchema = new mongoose.Schema({
//     name: {
//     type:String,
//     required:[true, 'Name is required'],
//     minlength: [3, 'Name must be at least 4 characters']
//  },
// course: String,
// age: {
//         type: Number,
//         min: [1, 'Age must be at least 1'],
//         max: [100, 'Age must be less than or equal to 100']
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }
//  });

// //model
// const Student = mongoose.model('Student', studentSchema)

// //create
// app.post('/student', async (req, res) => {
//     try {
//         const student = new Student(req.body);
//         const saved = await student.save()
//         res.status(201).json(saved)
//     } catch (error) {
//         res.status(400).json({ error: err.message })
//     }
// })

// //read
// app.get('/students', async(req, res) => {
//     const students = await Student.find();
//     res.json(students)
// })

// //Read By Id
// app.get('/students/:id', async(req, res) => {
//     try {
//         const student = await Student.findById(req.params.id);
//         if(!student)
//             return res.status(404).json({ message: 'Not found'})
//         res.json(student)
//     } catch (err) {
//         res.status(500).json({error: err.message})
//     }
// })

// app.put('/student/:id', async(req, res) => {
//     try {
//         const updated = await Student.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new: true}
//         );
//         res.json(updated)
//     } catch (error) {
//         res.status(500).json({ error: err.message})
//     }
// })



// app.delete('/student/:id', async(req, res) => {
//     try {
//         await Student.findByIdAndDelete(req.params.id);
//         res.json({message: 'Student Deleted'})
//     } catch (error) {
//         res.status(500).json({ error: err.message})
//     }
// })
//server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})