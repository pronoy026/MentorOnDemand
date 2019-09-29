import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  userEmail : string
  userTypeStudent : boolean
  userTypeMentor : boolean
  userTypeAdmin : boolean
  userName : string

  constructor() { }
}
