const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student = mongoose.model('student', new Schema({
    name : String,
    email : String,
    phone : String,
    password : String
}), 'students')

module.exports = student