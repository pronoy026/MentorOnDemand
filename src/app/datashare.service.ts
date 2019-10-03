import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  userEmail : string
  userTypeStudent : boolean
  userTypeMentor : boolean
  userTypeAdmin : boolean
  accType : string
  userName : string

  private allCoursesUrl = "http://localhost:3000/api/courseAll"
  private allMentorCoursesUrl = "http://localhost:3000/api/allMentorCourses"
  private _getAllStudentsUrl ="http://localhost:3000/api/allStudents"
  private _getAllCoursesUrl = "http://localhost:3000/api/allCourses"
  private _getAllMentorsUrl = "http://localhost:3000/api/allMentors"

  constructor( private http : HttpClient) { }

  getAllCourses () {
    return this.http.get<any>(this.allCoursesUrl)
  }  //not needed


  //for courses tab in general
  getAllMentorCourses () {
    return this.http.get<any>(this.allMentorCoursesUrl)
  }


  //for adminhome
  getAllStudents () {
    return this.http.get<any>(this._getAllStudentsUrl)
  }

  getAllMentors () {
    return this.http.get<any>(this._getAllMentorsUrl)
  }
  getAllAdminCourses () {
    return this.http.get<any>(this._getAllCoursesUrl)
  }

}
