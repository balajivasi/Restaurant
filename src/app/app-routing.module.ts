import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MenuComponent } from './menu/menu.component';
import { ServiceComponent } from './service/service.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationGuard } from './authentication.guard';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  { path:'',redirectTo: '/Home', pathMatch: 'full'},
  { path:'Home',component:HomeComponent },
  { path:'About',component:AboutComponent },
  { path:'Service',component:ServiceComponent },
  { path:'Menu',component:MenuComponent },
  { path:'ContactUs',component:ContactUsComponent },
  { path:'Signup', component:SignupComponent},
  { path:'Account',component:MyAccountComponent, canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
