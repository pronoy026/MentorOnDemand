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
  constructor(public _authService : AuthService) {}

  ngOnInit() {
   
  }
  
}
