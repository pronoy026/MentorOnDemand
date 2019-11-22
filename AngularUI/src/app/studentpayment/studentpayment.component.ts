import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-studentpayment',
  templateUrl: './studentpayment.component.html',
  styleUrls: ['./studentpayment.component.scss']
})
export class StudentpaymentComponent implements OnInit {

  courseData
  paymentSuccess: boolean
  notStudent: boolean
  eligibleStudent: boolean

  constructor(private _router: Router, private _datashare: DatashareService, private _auth: AuthService) { }

  ngOnInit() {
    this.courseData = this._datashare.selectedCourseForPayment
    console.log(this._datashare.selectedCourseForPayment)
    this.paymentSuccess = false
    this._auth.specialTokenRequest().
      subscribe(
        res => {
          this._datashare.userEmail = res.userEmail
          this._datashare.userTypeStudent = true
          this._datashare.userTypeMentor = false
          this._datashare.userTypeAdmin = false
          this._datashare.userName = res.name
          if (res.accType !== "student") {
            this.notStudent = true
            // this._router.navigate(['/signin'])
          } else {
            this.notStudent = false
            if (this.courseData !== undefined) {
              this.courseData.studentEmail = res.userEmail
              this._datashare.checkCourse(this.courseData)
                .subscribe(
                  res => {
                    this.eligibleStudent = res
                    console.log(this.eligibleStudent)
                  },
                  err => console.log(err)
                )
            }
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log("Yep works")
              this._router.navigate(['/signin'])
            }
          }
        }

      )

  }

  appliedCourse(course) {
    console.log('data came')
    console.log(course)
    this.paymentSuccess = true
    let record = {
      name: course.name,
      description: course.description,
      fee: course.fee,
      mentorEmail: course.mentorEmail,
      mentorName: course.mentorName,
      duration: course.duration,
      imageUrl: course.imageUrl,
      nooftrainings: course.nooftrainings,
      commision: course.commision,
      rating: course.rating,
      expYears: course.expYears,
      studentEmail: this._datashare.userEmail,
      studentName: this._datashare.userName
    }
    this._datashare.appliedCourse(record)
      .subscribe(
        res => console.log('course applied successfully'),
        err => console.log(err)
      )
  }

}
