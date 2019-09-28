import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerStudentUrl = "http://localhost:3000/api/studentSignup"
  private _loginStudentUrl = "http://localhost:3000/api/studentLogin"
  private _specialTokenRequestUrl = "http://localhost:3000/api/specialTokenRequest"
  userEmail : string


  constructor( private http: HttpClient, private _router : Router) { }

  registerStudent(student) {
    return this.http.post<any>(this._registerStudentUrl, student)
  }

  loginStudent(student) {
    return this.http.post<any>(this._loginStudentUrl, student)
  }

  loggedIn() {
    return !!localStorage.getItem('token')  //a boolean value to check if the token is present or not
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['/signin'])
  }

  setUserEmail(email) {
    this.userEmail= email
    console.log(email)
    console.log(this.userEmail)
  }

  specialTokenRequest() {
    return this.http.get<any>(this._specialTokenRequestUrl)
  }

  getToken() {
    // console.log(localStorage.getItem('token'))
    return localStorage.getItem('token')
  }
}
