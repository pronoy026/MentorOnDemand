import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courseList
  constructor( private _dataService : DatashareService) { }

  ngOnInit() {
    this.getCourses()
    console.log(this.courseList)
  }
  getCourses() {
      this._dataService.getAllCourses()
        .subscribe(
          res => this.courseList = res,
          err => console.log(err)
        )
  }
  selectMentor(data) {
    console.log(data)
  }
}
