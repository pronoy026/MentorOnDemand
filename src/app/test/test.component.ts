import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})


export class TestComponent implements OnInit {

  constructor( private _auth : AuthService, private _router : Router, public _auth2 : AuthService) { }

  ngOnInit() {
    this._auth.specialTokenRequest().
    subscribe(
      res => this._auth2.userEmail = res,
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
