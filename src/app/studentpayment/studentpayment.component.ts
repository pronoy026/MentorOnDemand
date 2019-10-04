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
          this._datashare.userName = res.name.split(' ')[0]
          if (res.accType !== "student") {
            this.notStudent = true
            // this._router.navigate(['/signin'])
          } else {
            this.notStudent = false
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
    this.paymentSuccess = true
    this._datashare.appliedCourse(course)
      .subscribe(
        res => console.log('course applied successfully'),
        err => console.log(err)
      )
  }

}
