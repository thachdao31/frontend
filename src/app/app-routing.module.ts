import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserLateComponent } from './components/list-user-late/list-user-late.component';

const routes: Routes = [
  {path: '', redirectTo: 'list-user', pathMatch: 'full'},
  {path: 'add', component: AddUserComponent},
  {path: 'list-user', component: UserListComponent},
  {path: 'edit/:id', component: EditUserComponent},
  {path: 'list-user-late', component: ListUserLateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
