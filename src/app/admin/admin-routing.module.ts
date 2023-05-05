import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AddEditComponent } from './products/add-edit/add-edit.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { AuthenticationGuard } from '../authentication.guard';
import { CustomerContactComponent } from './customer-contact/customer-contact.component';

const routes: Routes = [
  { path: 'Admin', redirectTo: '/Admin/login', pathMatch: 'full' },
  {
    path: 'Admin',
    children: [
      { path: 'users', component: UsersComponent,canActivate:[AuthenticationGuard] },
      { path: 'products', component: ProductsComponent,canActivate:[AuthenticationGuard] },
      { path: 'products/addEdit', component: AddEditComponent,canActivate:[AuthenticationGuard] },
      { path: 'ourTeam', component: OurTeamComponent,canActivate:[AuthenticationGuard] },
      { path: 'customerContact',component:CustomerContactComponent,canActivate:[AuthenticationGuard]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
