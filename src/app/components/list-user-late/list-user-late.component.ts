import { Component, OnInit } from '@angular/core';
import { UserCheckinService } from 'src/app/services/user-checkin.service';

@Component({
  selector: 'app-list-user-late',
  templateUrl: './list-user-late.component.html',
  styleUrls: ['./list-user-late.component.css']
})
export class ListUserLateComponent {
  listuserlate: any;
  date= new Date();
  monthFormat = 'yyyy/MM';

  constructor(private userCheckinService: UserCheckinService) {}

  ngOnInit(): void {

  }

  formatDateTime(time: string){
    return new Date(time).toLocaleString();
  }

  getListUserLate(): void {
    this.userCheckinService.reportLateAllUser(this.date)
        .subscribe({
          next: (data) => {
            data.forEach(e =>{
              e.timeCheckin = this.formatDateTime(e.timeCheckin)
            })
            this.listuserlate = data;
          },
          error: (err) => console.log(err)
        })
  }

  onChange(result: Date): void {
    this.date = result;
    console.log(this.date);
  }
}
