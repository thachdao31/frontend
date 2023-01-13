import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentUser: User = {
    _id: '',
    name: '',
    age: 0,
    class: ''
  };

  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
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

  deleteUser(): void {
    this.userService.delete(this.currentUser._id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/']);
          },
          error: (err) => console.log(err)
        });
  }
}
