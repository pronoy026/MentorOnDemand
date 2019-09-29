import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Data } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})


export class TestComponent implements OnInit {

  constructor( private _auth : AuthService, private _router : Router, public _datashare : DatashareService) { }

  ngOnInit() {
    this._auth.specialTokenRequest().
    subscribe(
      res =>{ this._datashare.userEmail = res.userEmail
        this._datashare.userTypeStudent = true
        this._datashare.userTypeMentor = false
        this._datashare.userTypeAdmin = false
        this._datashare.userName = res.name.split(' ')[0]
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
