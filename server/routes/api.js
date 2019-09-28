const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Student = require('../models/model_student')


mongoose.connect(config.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log('Error :' + err)
    } else {
        console.log('connected to mongodb')
    }
})

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/studentSignup', (req, res) => {
    let studentData = req.body;
    console.log("Post Method Data : " + req.body);
    let student = new Student(studentData)
    student.save((err, registeredStudent) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredStudent._id }
            let token = jwt.sign( payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/studentLogin', (req, res) => {
    let studentData = req.body
    Student.findOne({ email: studentData.email }, (err, student) => {
        if (err) {
            console.log(err)
        } else {
            if (!student) {
                res.status(400).send('Sorry! Invalid Email. Please try again.')
            } else {
                if (student.password !== studentData.password) {
                    res.status(400).send('Sorry! Invalid Password. Please try again.')
                } else {
                    let payload = { subject: student._id }
                    let token = jwt.sign( payload, 'secretKey')
                    res.status(200).send({token})
                }
            }

        }
    })
})

module.exports = router