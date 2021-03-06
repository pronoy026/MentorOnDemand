const mongoose = require('mongoose')
const Schema = mongoose.Schema

let mentorcourseSchema = new Schema({
    name: String,
    description: String,
    fee: Number,
    mentorEmail: String,
    mentorName: String,
    duration: String,
    imageUrl: String,
    nooftrainings: Number,
    commision: Number,
    rating: Number,
    expYears: Number
})

// mentorcourseSchema.index({ name: 'text', mentorName: 'text' });

let mentorcourse = mongoose.model('mentorcourse', mentorcourseSchema, 'mentorcourses')

module.exports = mentorcourse