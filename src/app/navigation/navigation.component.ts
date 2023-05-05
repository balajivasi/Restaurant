import { Component } from '@angular/core';
import { DataService } from '../Services/data-service.service';
import { AuthService } from '../Services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { getAuth, signOut } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  WebSiteTitle: string = "Sri Padmavathi Foods";
  Admin: boolean = false;
  isLoggedIn: boolean = false;
  userType: string | undefined;
  
  constructor(private dataService: DataService,
    private authService: AuthService,
    private toastr: ToastrService) {
    this.Admin = this.dataService.isAdminLoggedIn;
    this.dataService.isLoggedIn.subscribe(data => this.isLoggedIn = data)
    this.dataService.userType.subscribe(type => this.userType = type)
  }

  SignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.toastr.success("You have successfully signed out. We can't wait to see you again soon! Don't forget to check out our latest menu offerings for a delicious dining experience.")
      sessionStorage.removeItem('SessionUser');
      this.dataService.uId = "";
      this.dataService.setIsLoggedIn(false);
      this.authService.setUserData(null);
      this.dataService.setUserType("Customer");
    }).catch((err) => {
      this.toastr.error('Something went wrong. Please try again,', err.message);
    });


  }
}
