import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.scss']
})
export class StudentsignupComponent implements OnInit {

  constructor( private _auth : AuthService) { }

  registerStudentData = {name: "", email: "", phone: "", password: ""}

  ngOnInit() {
  }

  registerStudent() {
    console.log(this.registerStudentData)
    this._auth.registerStudent(this.registerStudentData)
      .subscribe(
          res => console.log(res),
          err => console.log(err)
      )
  }

}
