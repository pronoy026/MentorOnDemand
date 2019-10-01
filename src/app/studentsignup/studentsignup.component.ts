import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.scss']
})
export class StudentsignupComponent implements OnInit {

  constructor( private _auth : AuthService, private _router : Router) { }

  registerStudentData = {name: "", email: "", phone: "", password: ""}

  ngOnInit() {
    if(this._auth.loggedIn()) {
      this._router.navigate(['/home'])
    }
  }

  registerStudent() {
    console.log(this.registerStudentData)
    this._auth.registerStudent(this.registerStudentData)
      .subscribe(
          res => {
            console.log(res)
            localStorage.setItem('token', res.token)
            this._router.navigate(['/test'])
          },
          err => console.log(err)
      )
  }
}
