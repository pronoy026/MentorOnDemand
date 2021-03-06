import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentregisteredcourses',
  templateUrl: './studentregisteredcourses.component.html',
  styleUrls: ['./studentregisteredcourses.component.scss']
})
export class StudentregisteredcoursesComponent implements OnInit {

  registeredCourses
  tabletoggler: boolean

  constructor(public _datashare: DatashareService, private _auth: AuthService, private _router : Router) { }

  ngOnInit() {
    this._auth.specialTokenRequest()
      .subscribe(
        res => {
          let studentEmail = res.userEmail
          this._datashare.getStudentAllRegisteredCourses({ studentEmail })
            .subscribe(
              res => {
                this.registeredCourses = res
                if (this.registeredCourses.length == 0) {
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

  courseOverview(course) {
    this._datashare.courseOverviewData = course
    this._router.navigate(['/studenthome/courseoverview'])
  }

}
