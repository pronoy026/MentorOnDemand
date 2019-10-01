import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  constructor( private _auth : AuthService, private _router : Router, public _datashare : DatashareService) { }

  ngOnInit() {

    this._auth.specialTokenRequest().
    subscribe(
      res =>{ this._datashare.userEmail = res.userEmail
        this._datashare.userTypeStudent = false
        this._datashare.userTypeMentor = false
        this._datashare.userTypeAdmin = true
        this._datashare.userName = res.name.split(' ')[0]
        if (res.accType!=="admin") {
          this._router.navigate(['/signin'])
        }
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("Yep works")
            this._router.navigate(['/signin'])
          }
        }
      }

    )

  }

}
