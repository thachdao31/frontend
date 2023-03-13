import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnChanges {
  @Input() user: User = {
    name: '',
    age: 0,
    class: ''
  };

  valuenamechange = '';
  submitted = false;

  allClass: any;

  validateForm!: FormGroup;

  constructor(
    private userServices: UserService,
    private fb: FormBuilder,
    private titleCasePipe: TitleCasePipe
    ) {}

    ngOnInit(): void {
      this.validateForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
        age: ['', [Validators.required, Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$")]],
        class: ['', [Validators.required]]
      });
      this.getAllClass();
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    submitForm(){
      if (this.validateForm.valid) {
        this.saveUser();
        console.log('submit', this.validateForm.value);
        return true;
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        return false;
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

  getAllClass(): void {
    this.userServices.getClass()
        .subscribe({
          next: (data) => {
            this.allClass = data;
          },
          error: (err) => console.log(err)
        })
  }
}
