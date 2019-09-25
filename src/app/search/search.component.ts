import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  public techs = ['Java', 'C++', 'Python', 'Javascript', 'Android', 'Full Stack Development'
    , 'AngularJS', 'ReactJS', '.Net', 'Ruby', 'Ios', 'Machine Learning',
    'Deep Learning', 'Cloud Technology', 'IOT', 'DevOps', 'Business Management']

  public durations = ['1 week', '2 weeks', '3 weeks', '1 month', '2 month','3 months','6 months', '1 year']

  ngOnInit() {
  }

}
