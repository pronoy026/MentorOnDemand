const mongoose = require('mongoose')
const Schema = mongoose.Schema

const course = mongoose.model('course', new Schema({
    name : String,
    description : String,
    fee : String,
    mentorEmail : String,
    mentorName : String,
    duration : String,
    imageUrl : String
}), 'courses')

module.exports = course