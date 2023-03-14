import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TitleCasePipe } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserListComponent]
})

export class EditUserComponent{
  @Input() currentUser: User = {
    _id: '',
    name: '',
    age: 0,
    class: ''
  };

  @Input() currentUserId = "";

  message = '';

  isVisible = false;

  validateForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private listUser: UserListComponent
  ) {}


  ngOnInit(): void {
      this.message = '';
      this.getUser(this.currentUserId);

    this.validateForm = this.fb.group({
      name: this.fb.control("", [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
      age: this.fb.control("", [Validators.required, Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$")]),
      class: this.fb.control("", [Validators.required])
    })
  }

  submitForm(): void {
    if(this.validateForm.valid) {
      console.log("submit")
      this.updateUser();
      this.isVisible = false;
    } else {
      this.isVisible = true;
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.listUser.refreshList();
  }

  getUser(id: string): void {
    this.userService.get(id)
        .subscribe({
          next: (data) => {
            this.currentUser = data;
          },
          error: (err) => console.log(err)
        });
  }

  updateUser(): void {
    const data = {
      name: this.currentUser.name,
      age: this.currentUser.age,
      class: this.currentUser.class
    }

    this.message = '';

    this.userService.update(this.currentUser._id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOK(): void {
    this.submitForm();
    this.listUser.refreshList();
  }

  showModal(): void {
    this.isVisible = true;
  }
}
