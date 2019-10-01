import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { AuthService } from '../auth.service';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userEmail

  constructor(public _datashare: DatashareService, private _authService: AuthService) { }

  ngOnInit() {
    if (this._authService.loggedIn()) {
      this._authService.specialTokenRequest()
        .subscribe(
          res => {
            this._datashare.userEmail = res.userEmail
            this._datashare.accType = res.accType
            this._datashare.userTypeStudent = true
            this._datashare.userTypeMentor = false
            this._datashare.userTypeAdmin = false
            this._datashare.userName = res.name.split(' ')[0]
            console.log(res)
          },
          err => console.log(err)
        )
    }
  }

}
