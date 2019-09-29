import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userEmail

  constructor(public _authService: AuthService) { }

  ngOnInit() {
    if (this._authService.loggedIn()) {
      this._authService.specialTokenRequest()
        .subscribe(
          res => this._authService.userEmail = res,
          err => console.log(err)
        )
    }
  }

}
