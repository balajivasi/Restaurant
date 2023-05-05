import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AddEditComponent } from './products/add-edit/add-edit.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { CustomerContactComponent } from './customer-contact/customer-contact.component';
import { DateDiffPipe } from '../pipe/DateDiffPipe.Pipe';
@NgModule({
  declarations: [
    UsersComponent,
    ProductsComponent,
    AddEditComponent,
    OurTeamComponent,
    CustomerContactComponent,
    DateDiffPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ],
  providers: [
    DatePipe]
})
export class AdminModule { }
