import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'list-user', pathMatch: 'full'},
  {path: 'add', component: AddUserComponent},
  {path: 'list-user', component: UserListComponent},
  {path: 'detail-user/:id', component: UserDetailsComponent},
  {path: 'edit-user/:id', component: UpdateUserComponent},
  {path: 'delete-user/:id', component:DeleteUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
