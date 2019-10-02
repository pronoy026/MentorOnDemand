const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mentor = mongoose.model('mentor', new Schema({
    name: String,
    email: String,
    phone: String,
    experience: String,
    startdate: Date,
    enddate: Date,
    technology: String,
    fees: Number,
    commision: Number,
    nooftrainings: Number,
    linkedin: String,
    password: String,

}), 'mentors')

module.exports = mentor