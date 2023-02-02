import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  @Input() currentUser: User = {
    _id: '',
    name: '',
    age: 0,
    class: ''
  };
  currentIndex = -1;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.retrieveUsers();
    this.getUser("63d8de599192774fce16adf5");
  }

  getUser(id: string): void {
    this.userService.get(id)
        .subscribe({
          next: (data) => {
            this.currentUser = data;
            console.log(data);
          },
          error: (err) => console.log(err)
        });
  }

  retrieveUsers(): void {
    this.userService.getAll()
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

  removeAllUsers(): void {
    this.userService.deleteAll()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (err) => console.log(err)
        })
  }

  deleteUser(id: string): void {
    this.userService.delete(id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (err) => console.log(err)
        });
  }

  cancel(): void {

  }


  
}
