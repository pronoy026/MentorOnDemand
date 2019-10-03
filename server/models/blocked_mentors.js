const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blockedmentor = mongoose.model('blockedmentor', new Schema({
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

}), 'blockedmentors')

module.exports = blockedmentor