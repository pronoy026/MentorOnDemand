const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config')

//models
const Student = require('../models/model_student')
const Course = require('../models/model_courses')
const Admin = require('../models/model_admin')
const Mentor = require('../models/model_mentor')
const MentorCourse = require('../models/model_mentorcourses')


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

///////////////////////////////////////////////////////////////for student
router.post('/studentSignup', async(req, res) => {
    let studentData = req.body;
    // console.log("Post Method Data : " + req.body);
    let student = new Student(studentData)
    await student.save((err, registeredStudent) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredStudent.email, accType: 'student', name: registeredStudent.name }
            let token = jwt.sign(payload, 'secretKey')
                // let userEmail = registeredStudent.email
            res.status(200).send({ token })
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
                    let payload = { subject: student.email, accType: 'student', name: student.name }
                    let token = jwt.sign(payload, 'secretKey')
                        //
                        // let userEmail = student.email
                    res.status(200).send({ token })
                }
            }

        }
    })
})

//for courses

router.post('/saveCourse', async(req, res) => {
    let courseData = req.body;
    // console.log("Post Method Data : " + req.body);
    let course = new Course(courseData)
    await course.save((err, registeredCourse) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredCourse)
        }
    })
})

router.get('/courseAll', (req, res) => {
    Course.find({}, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})

router.get('/allMentorCourses', (req, res) => {
    MentorCourse.find({}, (err, mentorcourses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(mentorcourses)
        }
    })
})

//for mentor
router.post('/mentorSignup', async(req, res) => {
    let mentorData = req.body;
    let MentorCourseData = {
        name: req.body.technology,
        description: "description",
        fee: req.body.fees,
        mentorEmail: req.body.email,
        mentorName: req.body.name,
        duration: 5,
        imageUrl: "imageurl",
        nooftrainings: req.body.nooftrainings,
        commision: req.body.commision,
        rating : 4,
        expYears : req.body.experience
    }

    let mentor = new Mentor(mentorData)
    let mentorCourse = new MentorCourse(MentorCourseData)

    await mentor.save((err, registeredMentor) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredMentor.email, accType: 'mentor', name: registeredMentor.name }
            let token = jwt.sign(payload, 'secretKey')
                // let userEmail = registeredStudent.email
            res.status(200).send({ token })
        }
    })
    mentorCourse.save((err, registeredCourse) => {
        if (err) {
            console.log(err)
        } else {
            console.log(registeredCourse)
            console.log("Course Saved Successfully!")
        }
    })

})

router.post('/mentorLogin', (req, res) => {
    let mentorData = req.body
    Mentor.findOne({ email: mentorData.email }, (err, mentor) => {
        if (err) {
            console.log(err)
        } else {
            if (!mentor) {
                res.status(400).send('Sorry! Invalid Email. Please try again.')
            } else {
                if (mentor.password !== mentorData.password) {
                    res.status(400).send('Sorry! Invalid Password. Please try again.')
                } else {
                    let payload = { subject: mentor.email, accType: 'mentor', name: mentor.name }
                    let token = jwt.sign(payload, 'secretKey')
                        //
                        // let userEmail = student.email
                    res.status(200).send({ token })
                }
            }

        }
    })
})



//for admin

router.post('/adminLogin', (req, res) => {
    let adminData = req.body
    Admin.findOne({ email: adminData.email }, (err, admin) => {
        if (err) {
            console.log(err)
        } else {
            if (!admin) {
                console.log('yes')
                res.status(400).send('Sorry! Invalid Email. Please try again.')
            } else {
                if (admin.password !== adminData.password) {
                    res.status(400).send('Sorry! Invalid Password. Please try again.')
                } else {
                    let payload = { subject: admin.email, accType: 'admin', name: admin.name }
                    let token = jwt.sign(payload, 'secretKey')
                        //
                        // let userEmail = student.email
                    res.status(200).send({ token })
                }
            }

        }
    })
})

router.get('/allMentors', (req, res) => {
    Mentor.find({}, (err, mentors) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(mentors)
        }
    })
})

router.get('/allStudents', (req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(students)
        }
    })
})

router.get('/allCourses', (req, res) => {
    MentorCourse.find({}, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})





router.get('/specialTokenRequest', verifyToken, (req, res) => {
    let userEmail = req.userEmail
    let accType = req.accType
    let name = req.name
    res.send({ userEmail, accType, name })
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request!')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request!')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request!')
    }
    req.userEmail = payload.subject
    req.accType = payload.accType
    req.name = payload.name
        // console.log(req.userId) 
    next()
}

module.exports = router