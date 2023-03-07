import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserCheckinService } from 'src/app/services/user-checkin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddUserComponent } from '../add-user/add-user.component';

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

  isVisible = false;

  @ViewChild(AddUserComponent) child!: AddUserComponent;

  constructor(
    private userService: UserService,
    private userCheckinService : UserCheckinService,
    private route: ActivatedRoute,
    private notification: NzNotificationService
    ) {

    }

  ngOnInit(): void {
    this.retrieveUsers();
    this.getUser(this.route.snapshot.params['id']);
    //this.child.submitForm();
  }

  // ngAfterViewInit() {
  //   this.child.submitForm();
  // }

  
  showModal() {
    this.isVisible = true
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    if(this.child.submitForm() == true) {
      this.isVisible = false;
      this.refreshList();
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
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
