import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

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


  constructor(private _dataService: DatashareService) { }

  ngOnInit() {
    this.getCourses()
    this.getMentorCourses()
    console.log(this.courseList)
    console.log(this.mentorCourseList)
  }
  getCourses() {
    this._dataService.getAllCourses()
      .subscribe(
        res => this.courseList = res,
        err => console.log(err)
      )
  }

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

  selectMentor(data) {
    console.log(data)
  }
}
