import { Component, OnInit } from '@angular/core';
import { UserCheckinService } from 'src/app/services/user-checkin.service';

@Component({
  selector: 'app-list-user-late',
  templateUrl: './list-user-late.component.html',
  styleUrls: ['./list-user-late.component.css']
})
export class ListUserLateComponent {
  listuserlate: any;

  constructor(private userCheckinService: UserCheckinService) {}

  ngOnInit(): void {
    this.getListUserLate();
  }
  formatDateTIme(time: string){
    return new Date(time).toDateString();
  }
  getListUserLate(): void {
    this.userCheckinService.reportLateAllUser()
        .subscribe({
          next: (data) => {
            data.forEach(e =>{
              e.timeCheckin = this.formatDateTIme(e.timeCheckin)
            })
            console.log(typeof(data[0].timeCheckin))
            this.listuserlate = data;
            console.log(data);

          },
          error: (err) => console.log(err)
        })
  }
}
