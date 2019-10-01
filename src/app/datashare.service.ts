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

  constructor( private http : HttpClient) { }

  getAllCourses () {
    return this.http.get<any>(this.allCoursesUrl)
  }
}
