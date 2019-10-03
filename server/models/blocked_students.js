const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blockedstudent = mongoose.model('blockedstudent', new Schema({
    name: String,
    email: String,
    phone: String,
    password: String
}), 'blockedstudents')

module.exports = blockedstudent