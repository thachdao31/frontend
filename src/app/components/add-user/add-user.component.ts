import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


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

  constructor(private userServices: UserService) {}

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
