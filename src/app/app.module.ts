import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { MenuComponent } from './menu/menu.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUSComponent } from './about/about-us/about-us.component';
import { TeamComponent } from './about/team/team.component';
import { ServicelistComponent } from './service/servicelist/servicelist.component';
import { MenulistComponent } from './menu/menulist/menulist.component';
import { AdminModule } from './admin/admin.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SignupComponent } from './signup/signup.component';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    MenuComponent,
    ContactUsComponent,
    AboutUSComponent,
    TeamComponent,
    ServicelistComponent,
    MenulistComponent,
    SignupComponent,
    CheckoutComponent,
    MyAccountComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    provideStorage(()=>getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
