import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courseList
  mentorCourseList

  mentorName
  mentorRating
  mentorNoOfTrainings
  expYears


  constructor(public _dataService: DatashareService, private _router : Router) { }

  ngOnInit() {
    // this.getCourses()
    this.getMentorCourses()
    console.log(this.courseList)
    console.log(this.mentorCourseList)
  }
 /* getCourses() {
    this._dataService.getAllCourses()
      .subscribe(
        res => this.courseList = res,
        err => console.log(err)
      )
  } */

  getMentorCourses() {
    this._dataService.getAllMentorCourses()
      .subscribe(
        res => this.mentorCourseList = res,
        err => console.log(err)
      )
  }

  modalDataChange(data) {

    this.mentorName =data.mentorName
    this.mentorRating =data.rating
    this.mentorNoOfTrainings= data.nooftrainings
    this.expYears =data.expYears

  }

  makePayment(course) {
    console.log(course)
    this._dataService.selectedCourseForPayment = course
    this._router.navigate(['/studentpayment'])
  }
}
