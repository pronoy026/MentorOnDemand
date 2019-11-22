import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-studentappliedcourses',
  templateUrl: './studentappliedcourses.component.html',
  styleUrls: ['./studentappliedcourses.component.scss']
})
export class StudentappliedcoursesComponent implements OnInit {

  appliedCourses
  tabletoggler: boolean

  constructor(private _datashare: DatashareService, private _auth: AuthService) { }

  async ngOnInit() {
    await this._auth.specialTokenRequest()
      .subscribe(
        res => {
          let studentEmail = res.userEmail
          this._datashare.getStudentAllAppliedCourses({studentEmail})
            .subscribe(
              res => {
                this.appliedCourses = res
                if (this.appliedCourses.length == 0) {
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
