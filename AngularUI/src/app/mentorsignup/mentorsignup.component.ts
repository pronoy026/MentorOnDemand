import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { MentorModel } from '../mentor-model';

@Component({
  selector: 'app-mentorsignup',
  templateUrl: './mentorsignup.component.html',
  styleUrls: ['./mentorsignup.component.scss']
})
export class MentorsignupComponent implements OnInit {

  mentorData = {}

  constructor( private _auth : AuthService, private _router : Router) { }

  ngOnInit() {
    if(this._auth.loggedIn()){
      this._router.navigate(['/home'])
    }
  }

  mentorRegister() {
    console.log(this.mentorData)
    this._auth.registerMentor(this.mentorData)
        .subscribe(
          res => {
            console.log(res)
            localStorage.setItem('token', res.token)
            this._router.navigate(['/mentorhome'])
          },
          err => console.log(err)
        )
  }

  public techs = ['Java','C++', 'Python', 'Javascript', 'Android', 'Full Stack Development'
                  ,'Angular', 'React','.Net','Ruby','Ios', 'Machine Learning',
                'Deep Learning', 'Cloud Technology', 'IOT', 'DevOps', 'Business Management']

}
