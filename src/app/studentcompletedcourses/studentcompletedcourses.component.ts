import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentcompletedcourses',
  templateUrl: './studentcompletedcourses.component.html',
  styleUrls: ['./studentcompletedcourses.component.scss']
})
export class StudentcompletedcoursesComponent implements OnInit {

  completedCourses
  tabletoggler: boolean

  constructor(public _datashare: DatashareService, private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this._auth.specialTokenRequest()
      .subscribe(
        res => {
          let studentEmail = res.userEmail
          this._datashare.getStudentAllCompletedCourses({ studentEmail })
            .subscribe(
              res => {
                this.completedCourses = res
                if (this.completedCourses.length == 0) {
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

}
