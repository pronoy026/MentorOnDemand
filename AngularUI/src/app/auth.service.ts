import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail :string

  private _registerStudentUrl = "http://localhost:3000/api/studentSignup"
  private _loginStudentUrl = "http://localhost:3000/api/studentLogin"
  private _registerMentorUrl = "http://localhost:3000/api/mentorSignup"
  private _loginMentorUrl = "http://localhost:3000/api/mentorLogin"
  private _loginAdminUrl = "http://localhost:3000/api/adminLogin"
  private _specialTokenRequestUrl = "http://localhost:3000/api/specialTokenRequest"


  constructor( private http: HttpClient, private _router : Router) { }

  registerStudent(student) {
    return this.http.post<any>(this._registerStudentUrl, student)
  }

  registerMentor(mentor) {
    return this.http.post<any>(this._registerMentorUrl, mentor)
  }

  loginStudent(student) {
    return this.http.post<any>(this._loginStudentUrl, student)
  }

  loginMentor(mentor) {
    return this.http.post<any>(this._loginMentorUrl, mentor)
  }

  loggedIn() {
    return !!localStorage.getItem('token')  //a boolean value to check if the token is present or not
  }

  //admin
  loginAdmin(admin) {
    return this.http.post<any>(this._loginAdminUrl, admin)
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['/signin'])
  }


  //////////////////////////
  specialTokenRequest() {
    return this.http.get<any>(this._specialTokenRequestUrl)
  }

//////////////////////////////
  getToken() {
    // console.log(localStorage.getItem('token'))
    return localStorage.getItem('token')
  }
}
