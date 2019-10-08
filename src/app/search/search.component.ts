import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public techs = ['Java', 'C++', 'Python', 'Javascript', 'Android', 'Full Stack Development'
    , 'AngularJS', 'ReactJS', '.Net', 'Ruby', 'Ios', 'Machine Learning',
    'Deep Learning', 'Cloud Technology', 'IOT', 'DevOps', 'Business Management']

  public durations = ['1 week', '2 weeks', '3 weeks', '1 month', '2 month','3 months','6 months', '1 year']

  mentorCourseList
  mentorName
  mentorRating
  mentorNoOfTrainings
  expYears

  searchText

  searchmsg : string


  constructor(public _dataService: DatashareService, private _router : Router) { }

  ngOnInit() {
    // this.getCourses()
    console.log(this.mentorCourseList)
  }

  getSearchData() {
    let searchString = this.searchText
    console.log(searchString)
    this._dataService.search({searchString})
        .subscribe(
          res => {
            this.mentorCourseList= res
            if(res.length==0) {
              this.searchmsg ='Sorry! no search result found.'
            } else {
              this.searchmsg =''
            }
          },
          err => {
            console.log(err)
          }
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
