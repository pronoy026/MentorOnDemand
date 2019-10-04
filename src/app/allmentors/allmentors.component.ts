import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { BlockService } from '../block.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allmentors',
  templateUrl: './allmentors.component.html',
  styleUrls: ['./allmentors.component.scss']
})
export class AllmentorsComponent implements OnInit {

  mentorList
  tabletoggler: boolean

  mentorName
  mentorEmail
  mentorPhone
  mentorExpYears
  mentorStartDate
  mentorEndDate
  mentorTechnology
  courseFee
  mentorCommision
  noofTrainings
  linkedin

  constructor(private _datashare: DatashareService, private _block: BlockService, private _router: Router) { }

  ngOnInit() {

    this._datashare.getAllMentors()
      .subscribe(
        res => {
          this.mentorList = res
          if (this.mentorList.length == 0) {
            this.tabletoggler = false
          } else {
            this.tabletoggler = true
          }

        },
        err => console.log(err)
      )
  }

  modalDataChange(data) {
    this.mentorName = data.name
    this.mentorEmail = data.email
    this.mentorPhone = data.phone
    this.mentorExpYears = data.experience
    this.mentorStartDate = data.startdate
    this.mentorEndDate = data.enddate
    this.mentorTechnology = data.technology
    this.courseFee = data.fees
    this.mentorCommision = data.commision
    this.noofTrainings = data.nooftrainings
    this.linkedin = data.linkedin
  }

  blockMentor(mentor) {
    this._block.blockMentor(mentor)
      .subscribe(
        res => {
          console.log('blocked')

          this._datashare.getAllMentors()
            .subscribe(
              res => {
                this.mentorList = res
                if (this.mentorList.length == 0) {
                  this.tabletoggler = false
                } else {
                  this.tabletoggler = true
                }

              },
              err => console.log(err)
            )
          // this._router.navigate(['/adminhome/blockedmentors'])
        },
        err => console.log(err)
      )
  }

}
