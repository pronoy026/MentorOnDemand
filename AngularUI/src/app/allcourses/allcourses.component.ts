import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.scss']
})
export class AllcoursesComponent implements OnInit {
  courseList

  constructor(private _datashare: DatashareService) { }

  ngOnInit() {
    this._datashare.getAllAdminCourses()
      .subscribe(
        res => this.courseList = res,
        err => console.log(err)
      )

  }

}
