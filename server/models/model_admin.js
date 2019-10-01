const mongoose = require('mongoose')
const Schema = mongoose.Schema

const admin = mongoose.model('admin', new Schema({
    name: String,
    email: String,
    password: String
}), 'admins')

module.exports = admin