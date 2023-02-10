import { Component, OnInit } from '@angular/core';
import { UserCheckinService } from 'src/app/services/user-checkin.service';

@Component({
  selector: 'app-list-user-late',
  templateUrl: './list-user-late.component.html',
  styleUrls: ['./list-user-late.component.css']
})
export class ListUserLateComponent {
  listuserlate: any;
  date: any;

  constructor(private userCheckinService: UserCheckinService) {}

  ngOnInit(): void {
    this.getListUserLate();
  }
  
  formatDateTime(time: string){
    return new Date(time).toLocaleString();
  }

  getListUserLate(): void {
    this.userCheckinService.reportLateAllUser()
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
    this.date = result.toLocaleDateString();
    console.log(this.date);
  }
}
