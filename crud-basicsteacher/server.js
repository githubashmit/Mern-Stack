const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const studentRoutes = require('./routes/studentRoutes')

// Setup
dotenv.config()

// App
const app = express()
app.use(express.json())

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅Connected to Atlas'))
    .catch((err) => console.log("❌ DB connection error"))

//Routes
app.use('/students', studentRoutes)

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
