const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config')
mongoose.set('useFindAndModify', false);

//models
const Student = require('../models/model_student')
const BlockedStudent = require('../models/blocked_students')
const Course = require('../models/model_courses')
const Admin = require('../models/model_admin')
const Mentor = require('../models/model_mentor')
const BlockedMentor = require('../models/blocked_mentors')
const MentorCourse = require('../models/model_mentorcourses')
const BlockedCourse = require('../models/blocked_courses')

const AppliedCourse = require('../models/applied_courses')
const RegisteredCourse = require('../models/registered_courses')
const CompletedCourse = require('../models/completed_courses')


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

// blocked cases student

router.post('/blockstudent', async(req, res) => {
    let studentData = req.body;
    let blockedstudent = new BlockedStudent(studentData)
    await blockedstudent.save((err, student) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(student)
        }
    })
    await Student.deleteOne({ email: studentData.email }, (err, data) => {
        if (err) console.log(err)
        else {
            console.log("deleted successfully")
        }
    })
})

router.post('/unblockstudent', async(req, res) => {
    let studentData = req.body;
    let student = new Student(studentData)
    await student.save((err, regstudent) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(regstudent)
        }
    })
    await BlockedStudent.deleteOne({ email: studentData.email }, (err, data) => {
        if (err) console.log(err)
        else {
            console.log("unblocked successfully")
        }
    })
})

router.get('/allblockedstudents', (req, res) => {
    BlockedStudent.find({}, (err, students) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(students)
        }
    })
})

// blocked cases mentor

router.post('/blockmentor', async(req, res) => {
    let mentorData = req.body;
    let blockedmentor = new BlockedMentor(mentorData)

    await blockedmentor.save((err, mentor) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(mentor)
        }
    })
    await Mentor.deleteOne({ email: mentorData.email }, (err, data) => {
        if (err) console.log(err)
        else {
            console.log("deleted successfully")
        }
    })

    //find related course using mentor email
    //add it to blocked courses
    //delete course data

})

router.post('/blockcourse', async(req, res) => {
    let courseData = req.body;
    let blockedcourse = new BlockedCourse(courseData)

    await blockedcourse.save((err, course) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(course)
        }
    })

    await MentorCourse.deleteOne({ mentorEmail: courseData.mentorEmail }, (err, data) => {
        if (err) console.log(err)
        else {
            console.log("course deleted successfully")
        }
    })
})



router.post('/unblockmentor', async(req, res) => {
    let mentorData = req.body;
    let mentor = new Mentor(mentorData)

    await mentor.save((err, regmentor) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(regmentor)
        }
    })
    await BlockedMentor.deleteOne({ email: mentorData.email }, (err, data) => {
        if (err) console.log(err)
        else {
            console.log("unblocked successfully")
        }
    })

    //find related course using mentor email from blocked course
    //add it to courses
    //delete blocked course data
})

router.post('/unblockcourse', async(req, res) => {
    let courseData = req.body
    let mentorcourse = new MentorCourse(courseData)

    await mentorcourse.save((err, course) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(course)
        }
    })

    await BlockedCourse.deleteOne({ mentorEmail: courseData.mentorEmail }, (err, data) => {
        if (err) console.log(err)
        else {
            console.log("blocked course deleted successfully")
        }
    })
})

router.get('/allblockedmentors', (req, res) => {
    BlockedMentor.find({}, (err, mentors) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(mentors)
        }
    })
})




//for courses

router.get('/onecourse', async(req, res) => {
    let data = req.body
    MentorCourse.findOne({ mentorEmail: data.mentorEmail }, (err, course) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(course)
        }
    })
})

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
        rating: 4,
        expYears: req.body.experience
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// for course request

router.post('/appliedcourse', async(req, res) => {
    let courseData = req.body;
    let appliedcourse = new AppliedCourse(courseData)
    await appliedcourse.save((err, appliedcourse) => {
        if (err) {
            console.log(err)
        } else {
            console.log('course applied successfully')
            res.status(200).send(appliedcourse)
        }
    })
})

router.post('/studentallappliedcourses', (req, res) => {
    let courseData = req.body
    console.log(courseData)
    AppliedCourse.find({ studentEmail: courseData.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})

router.post('/mentorallappliedcourses', (req, res) => {
    AppliedCourse.find({ mentorEmail: req.body.mentorEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})


router.post('/deleteappliedcourse', (req, res) => {
    AppliedCourse.deleteOne({ mentorEmail: req.body.mentorEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})


//for registered courses


router.post('/registeredcourse', async(req, res) => {
    let courseData = req.body;
    let registeredcourse = new RegisteredCourse(courseData)
    await registeredcourse.save((err, registeredcourse) => {
        if (err) {
            console.log(err)
        } else {
            console.log('course registered successfully')
            res.status(200).send(registeredcourse)
        }
    })
    AppliedCourse.deleteOne({ mentorEmail: req.body.mentorEmail, studentEmail: req.body.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Applied Course deleted successfully')
        }
    })
})

router.post('/studentallregisteredcourses', (req, res) => {
    let courseData = req.body
    RegisteredCourse.find({ studentEmail: courseData.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})

router.post('/mentorallregisteredcourses', (req, res) => {
    RegisteredCourse.find({ mentorEmail: req.body.mentorEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})

router.put('/updateregisteredcourse', (req, res) => {
    RegisteredCourse.findOneAndUpdate({ studentEmail: req.body.studentEmail, mentorEmail: req.body.mentorEmail }, req.body, (err, course) => {
        if (err) console.log(err)
        else {
            res.send(course);
        }
    });
})

router.post('/completedcourse', async(req, res) => {
    let courseData = req.body;
    let completedcourse = new CompletedCourse(courseData)
    await completedcourse.save((err, completedcourse) => {
        if (err) {
            console.log(err)
        } else {
            console.log('course completed successfully')
            res.status(200).send(completedcourse)
        }
    })
    RegisteredCourse.deleteOne({ mentorEmail: req.body.mentorEmail, studentEmail: req.body.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            console.log('reg. Course deleted successfully')
        }
    })
})


router.post('/studentallcompletedcourses', (req, res) => {
    let courseData = req.body
    CompletedCourse.find({ studentEmail: courseData.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})

router.post('/mentorallcompletedcourses', (req, res) => {
    CompletedCourse.find({ mentorEmail: req.body.mentorEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(courses)
        }
    })
})


//check if course already reg, enrolledor completed

router.post('/checkcourse', async(req, res) => {
    let completed
    let reg
    let applied
    await CompletedCourse.find({ mentorEmail: req.body.mentorEmail, studentEmail: req.body.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            completed = courses
            console.log(completed)
        }
    })
    await RegisteredCourse.find({ mentorEmail: req.body.mentorEmail, studentEmail: req.body.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            reg = courses
            console.log(reg)
        }
    })
    await AppliedCourse.find({ mentorEmail: req.body.mentorEmail, studentEmail: req.body.studentEmail }, (err, courses) => {
        if (err) {
            console.log(err)
        } else {
            applied = courses
            console.log(applied)
        }
    })
    if (completed.length == 0 && reg.length == 0 && applied.length == 0) {
        res.send(true)
    } else {
        res.send(false)
    }

})

//search
router.post('/search', (req, res) => {
    // db.products.find( { sku: { $regex: /789$/ } } )
    // let pattern = `/${req.body.searchString}$/`
    // console.log(pattern)
    // iduration = parseInt(req.body.searchString, 10)

    MentorCourse.find({ $or: [{ name: req.body.searchString }, { mentorName: req.body.searchString }] }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

// router.post('/search', (req, res) => {
//     console.log('comes')
//     MentorCourse.find({ mentorEmail: req.body.searchString }, (err, courses) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.status(200).send(courses)
//         }
//     })
// })




module.exports = router