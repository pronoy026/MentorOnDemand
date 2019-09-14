import { Component, OnInit } from '@angular/core';
// import { MentorModel } from '../mentor-model';

@Component({
  selector: 'app-mentorsignup',
  templateUrl: './mentorsignup.component.html',
  styleUrls: ['./mentorsignup.component.scss']
})
export class MentorsignupComponent implements OnInit {

  constructor() { }
  public techs = ['Java','C++', 'Python', 'Javascript', 'Android', 'Full Stack Development'
                  ,'AngularJS', 'ReactJS','.Net','Ruby','Ios', 'Machine Learning',
                'Deep Learning', 'Cloud Technology', 'IOT', 'DevOps', 'Business Management']

  // mentorModel = new MentorModel('Pronoy', 'p@g.com', 9876543210, 3, "11-08-2018", "14-10-2018",   )

  ngOnInit() {
  }

}
