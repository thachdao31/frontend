import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserCheckinService } from 'src/app/services/user-checkin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

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

  isVisibleModalAddUser = false;

  @ViewChild(AddUserComponent) childAddUser: AddUserComponent;

  constructor(
    private userService: UserService,
    private userCheckinService: UserCheckinService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    ) {}

  ngOnInit(): void {
    this.retrieveUsers();
    this.getUser(this.route.snapshot.params['id']);
  }

  ngAfterViewInit(): void {
    this.childAddUser.submitForm();
  }

  showModalAddUser() {
    this.isVisibleModalAddUser = true;
  }

  handleSubmitAddUser(): void {
    this.refreshList();
    if(this.childAddUser.submitForm() === true) {
      console.log("tesst");
      this.isVisibleModalAddUser = false;
      this.refreshList();
    } else {
      this.isVisibleModalAddUser = true;
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleModalAddUser = false;
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
    console.log("call func refresh in user list component");
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

  cancel(): void {}

  checkinUser(id: string): void {
    this.userCheckinService.checkin(id)
        .subscribe({
          next: (res) => {
            this.notificationCheckinUser(id);
            console.log(res);
          },
          error: (err) => console.log(err)
        });
  }

  notificationCheckinUser(id: string): void {
    this.notification
        .blank(
          'Checkin status',
          `User id: ${id} checkin successfully`
        )
        .onClick.subscribe(() => {
          console.log('notification clicked!')
        })
  }
}
