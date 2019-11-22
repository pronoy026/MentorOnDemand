import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  course
  selectValue

  constructor(private _router: Router, private _datashare: DatashareService) { }

  ngOnInit() {
    this.course = this._datashare.courseOverviewData
  }
  updateRegisteredCourse() {
    let value = parseInt(this.selectValue, 10)
    if (value!= 100 && value!= undefined) {
      this.course.completion = value
      this._datashare.updateRegisteredCourses(this.course)
        .subscribe(
          res => console.log('updated successfully'),
          err => console.log(err)
        )
    }
    else{
      this.courseCompletion()
    }
  }
  courseCompletion() {
    this.course.completion = 100
    this._datashare.completedCourse(this.course)
        .subscribe(
          res => this._router.navigate(['/studenthome/studentcompletedcourses']),
          err => console.log(err)
        )
  }
}
