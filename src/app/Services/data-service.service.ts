import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  EditMenu: any; //product Menu Item Edit/update

  isLoggedIn =new BehaviorSubject<boolean>(false);
  userType =new BehaviorSubject<string>("Customer");

  uId: string | null | undefined;
  isAdminLoggedIn: boolean = false;
  constructor() { }

  md5(password: string) {
    let hash = CryptoJS.MD5('Sri' + password);
    return btoa(hash.toString(CryptoJS.enc.Hex));
  }
  getEditMenu() {
    return this.EditMenu
  }
  setEditMenu(data: any) {
    this.EditMenu = data;
  }

  setIsLoggedIn(status:boolean){
    this.isLoggedIn.next(status)
  }
  
  setUserType(data:any) {
    this.userType.next(data)
  }

}
