const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


//simple schema
const studentSchema = new mongoose.Schema({
    name: {
    type:String,
    required:[true, 'Name is required'],
    minlength: [3, 'Name must be at least 4 characters']
 },
course: String,
age: {
        type: Number,
        min: [1, 'Age must be at least 1'],
        max: [100, 'Age must be less than or equal to 100']
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required :[true,'Password is required'],
        minlength:[6,'Minimum password length is 6 digit']
    }
 });

 //npm i bcrypt.js
 studentSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
 })

//model
module.exports = mongoose.model('Student', studentSchema)