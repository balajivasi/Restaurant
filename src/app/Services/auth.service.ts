import { Injectable, OnInit } from '@angular/core';
import { DataService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: any;
  constructor(private dataService: DataService) {
    (!this.users && sessionStorage.getItem('SessionUser')) ? this.setUserData() : '';
  }

  setUserData(data?: any) {
    this.users = JSON.parse(data ? data : sessionStorage.getItem('SessionUser'));
    console.log('setuser',this.users)
    if (this.users) {
      this.dataService.setIsLoggedIn(true);
      this.dataService.uId = this.users.uid;
      console.log(sessionStorage.getItem('UserType'))
      this.dataService.setUserType(sessionStorage.getItem('UserType')? sessionStorage.getItem('UserType'): 'Customer')
    }
  }
  getUserData() {
    return JSON.parse(this.users)
  }

}
