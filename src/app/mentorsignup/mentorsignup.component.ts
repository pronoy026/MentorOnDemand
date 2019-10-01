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

  constructor( private _auth : AuthService, private _router : Router) { }

  ngOnInit() {
    if(this._auth.loggedIn()){
      this._router.navigate(['/home'])
    }
  }

  public techs = ['Java','C++', 'Python', 'Javascript', 'Android', 'Full Stack Development'
                  ,'AngularJS', 'ReactJS','.Net','Ruby','Ios', 'Machine Learning',
                'Deep Learning', 'Cloud Technology', 'IOT', 'DevOps', 'Business Management']

}
