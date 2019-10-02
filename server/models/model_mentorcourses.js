const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mentorcourse = mongoose.model('mentorcourse', new Schema({
    name: String,
    description: String,
    fee: String,
    mentorEmail: String,
    mentorName: String,
    duration: String,
    imageUrl: String,
    nooftrainings: Number,
    commision: Number,

}), 'mentorcourses')

module.exports = mentorcourse