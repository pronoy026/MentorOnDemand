import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-mentorhome',
  templateUrl: './mentorhome.component.html',
  styleUrls: ['./mentorhome.component.scss']
})
export class MentorhomeComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, public _datashare: DatashareService) { }

  ngOnInit() {
    this._auth.specialTokenRequest().
      subscribe(
        res => {
          this._datashare.userEmail = res.userEmail
          this._datashare.userTypeStudent = false
          this._datashare.userTypeMentor = true
          this._datashare.userTypeAdmin = false
          this._datashare.userName = res.name.split(' ')[0]
          if (res.accType !== "mentor") {
            this._router.navigate(['/signin'])
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log("Yep works")
              this._router.navigate(['/signin'])
            }
          }
        }

      )

  }

}
