import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  target = "one";
  constructor(private _router: Router) {}

  ngOnInit() {
  }
  scrollToElement(): void {
    console.log("clicked")
    this._router.navigate(['/aboutus']);
    // $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
