import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users?: User[];
  currentUser : User = {};
  currentIndex = -1;

  constructor(private userServices: UserService) {}

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userServices.getAll()
        .subscribe({
          next:(data) => {
            this.users = data;
            console.log(data);
          },
          error: (err) => console.log(err)
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user,
    this.currentIndex = index
  }

  removeAllUsers(): void {
    this.userServices.deleteAll()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (err) => console.log(err)
        })
  }
}
