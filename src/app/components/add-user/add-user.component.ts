import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UntypedFormBuilder, UntypedFormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: User = {
    name: '',
    age: 0,
    class: ''
  };
  submitted = false;
 
  validateForm: UntypedFormGroup;

  constructor(
    private userServices: UserService,
    private fb: UntypedFormBuilder
    ) {
      this.validateForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern]],
        age: ['', [Validators.required, Validators.pattern]],
        class: ['', [Validators.required]]
      })
    }

    submitForm(): void {
      if (this.validateForm.valid) {
        this.saveUser()
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

  saveUser(): void {
    const data = {
      name: this.user.name,
      age: this.user.age,
      class: this.user.class
    };

    this.userServices.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true
          },
          error: (err) => console.log(err)
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      age: 0,
      class: ''
    }
  }
}
