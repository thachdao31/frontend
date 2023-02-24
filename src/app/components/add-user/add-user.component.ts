import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

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

  test = ""

  validateForm!: FormGroup;

  constructor(
    private userServices: UserService,
    private fb: FormBuilder,
    private titleCasePipe: TitleCasePipe
    ) {}

    ngOnInit(): void {
      this.validateForm = this.fb.group({
        name: this.fb.control('name', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
        // name: ['', [Validators.required, Validators.pattern]],
        // age: ['20', [Validators.required, Validators.pattern]],
        age: this.fb.control('', [Validators.required, Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$")]),
        //class: ['', [Validators.required]]
        class: this.fb.control('', [Validators.required])
      });
    }

    transformName(name: string): void {
      this.user.name = this.titleCasePipe.transform(name);
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
