import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users?: User[];
  constructor(private userServices: UserService) {}

  ngOnInit(): void {
      this.userServices.getAll()
          .subscribe( data => {
            this.users = data;
            console.log(data);
          });
  }
}
