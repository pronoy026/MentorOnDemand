import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerStudentUrl = "http://localhost:3000/api/studentSignup"
  private _loginStudentUrl = "http://localhost:3000/api/studentLogin"


  constructor( private http: HttpClient) { }

  registerStudent(student) {
    return this.http.post<any>(this._registerStudentUrl, student)
  }

  loginStudent(student) {
    return this.http.post<any>(this._loginStudentUrl, student)
  }
}
