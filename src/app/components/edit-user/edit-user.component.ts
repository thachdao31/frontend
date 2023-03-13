import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent {
  @Input() viewMode = false;

  @Input() currentUser: User = {
    _id: '',
    name: '',
    age: 0,
    class: ''
  };

  @Input() currentUserId = "";

  message = '';

  validateForm!: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if(!this.viewMode) {
      this.message = '';
      this.getUser(this.currentUserId);
    };
    this.validateForm = this.fb.group({
      //name: ['', [Validators.required, Validators.pattern] ],
      name: this.fb.control("", [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
      //age: ['', [Validators.required, Validators.pattern]],
      age: this.fb.control("", [Validators.required, Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$")]),
      //class: ['', [Validators.required]]
      class: this.fb.control("", [Validators.required])
    })
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.updateUser();
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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
          this.router.navigate(['/']);
        },
        error: (e) => console.error(e)
      });
  }
}

