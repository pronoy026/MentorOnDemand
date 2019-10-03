const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mentorcourse = mongoose.model('mentorcourse', new Schema({
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
    expYears : Number

}), 'mentorcourses')

module.exports = mentorcourse