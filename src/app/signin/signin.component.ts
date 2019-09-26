import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinType;
  signinData={}
  constructor( private _auth : AuthService) { }

  ngOnInit() {
  }
  signinMethod() {
    console.log(this.signinData)
    if (this.signinType==="student") {
      console.log("Student Signin")

      this._auth.loginStudent(this.signinData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
    }
    else{
      if (this.signinType==="mentor") {               //Mentor Sign in
        console.log("Mentor Signin")
      }
      else {
        console.log("Admin Signin")                   //Admin Sign in
      }
    }
  }

}
