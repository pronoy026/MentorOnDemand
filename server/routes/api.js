const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
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
            res.status(200).send(registeredStudent)
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
                res.status(400).send('Invalid Email')
            } else {
                if (student.password !== studentData.password) {
                    res.status(400).send('Invalid Password')
                } else {
                    res.status(200).send(student)
                }
            }

        }
    })
})

module.exports = router