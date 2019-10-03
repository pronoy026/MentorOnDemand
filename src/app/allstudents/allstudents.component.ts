import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-allstudents',
  templateUrl: './allstudents.component.html',
  styleUrls: ['./allstudents.component.scss']
})
export class AllstudentsComponent implements OnInit {
  allStudents

  constructor(public _datashare : DatashareService) { }

  ngOnInit() {
      this._datashare.getAllStudents()
          .subscribe(
            res => this.allStudents = res,
            err => console.log(err)
          )
  }


}
