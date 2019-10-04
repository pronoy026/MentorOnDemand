const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appliedcourse = mongoose.model('appliedcourse', new Schema({
    name: String,
    description: String,
    fee: Number,
    mentorEmail: String,
    mentorName: String,
    duration: Number,
    imageUrl: String,
    nooftrainings: Number,
    commision: Number,
    rating: Number,
    expYears : Number,
    studentEmail : String,
    studentName : String

}), 'appliedcourses')

module.exports = appliedcourse