import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-mentorrequestedcourses',
  templateUrl: './mentorrequestedcourses.component.html',
  styleUrls: ['./mentorrequestedcourses.component.scss']
})
export class MentorrequestedcoursesComponent implements OnInit {

  requestedCourses
  tabletoggler: boolean

  constructor(private _datashare: DatashareService, private _auth: AuthService) { }

  ngOnInit() {
    this._auth.specialTokenRequest()
      .subscribe(
        res => {
          let mentorEmail = res.userEmail
          this._datashare.getMentorAllAppliedCourses({ mentorEmail })
            .subscribe(
              res => {
                this.requestedCourses = res
                if (this.requestedCourses.length == 0) {
                  this.tabletoggler = false
                } else {
                  this.tabletoggler = true
                }
              },
              err => console.log(err)
            )

        },
        err => console.log(err)
      )
  }

  acceptStudent(course) {
    course.completion = 0
    this._datashare.registeredCourse(course)
      .subscribe(
        res => {
          console.log('course accepted successfully')
          //update view
          this._auth.specialTokenRequest()
            .subscribe(
              res => {
                let mentorEmail = res.userEmail
                this._datashare.getMentorAllAppliedCourses({ mentorEmail })
                  .subscribe(
                    res => {
                      this.requestedCourses = res
                      if (this.requestedCourses.length == 0) {
                        this.tabletoggler = false
                      } else {
                        this.tabletoggler = true
                      }
                    },
                    err => console.log(err)
                  )

              },
              err => console.log(err)
            )
        },
        err => console.log(err)
      )
  }

  rejectStudent(course) {
    this._datashare.deleteAppliedCourse(course)
      .subscribe(
        res => {
          console.log('Applied Course deleted Successfully')
          //update view
          this._auth.specialTokenRequest()
            .subscribe(
              res => {
                let mentorEmail = res.userEmail
                this._datashare.getMentorAllAppliedCourses({ mentorEmail })
                  .subscribe(
                    res => {
                      this.requestedCourses = res
                      if (this.requestedCourses.length == 0) {
                        this.tabletoggler = false
                      } else {
                        this.tabletoggler = true
                      }
                    },
                    err => console.log(err)
                  )

              },
              err => console.log(err)
            )
          //update view
        },
        err => console.log(err)
      )
  }

}
