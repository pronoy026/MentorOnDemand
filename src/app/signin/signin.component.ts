import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinType;
  signinData={}
  message = ''
  constructor( private _auth : AuthService, private _router : Router) { }

  ngOnInit() {
  }
  signinMethod() {
    console.log(this.signinData)
    if (this.signinType==="student") {
      console.log("Student Signin")

      this._auth.loginStudent(this.signinData)
        .subscribe(
          res => {
             console.log(res)
             localStorage.setItem('token', res.token)
             this._router.navigate(['/test'])
            },
          err => {
            console.log(err.error)
            this.message=err.error
          }
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
