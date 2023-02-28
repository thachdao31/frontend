import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCheckin } from '../models/user-checkin.model'

const baseUrl = "http://localhost:3030/api/users/checkin"

@Injectable({
  providedIn: 'root'
})
export class UserCheckinService {

  constructor(private http:HttpClient) { }

  checkin(id: string): Observable<any> {
    let body = {'id' : id}
    return this.http.post(baseUrl, body);
  }

  reportLateAllUser(date: Date): Observable<UserCheckin[]> {
    return this.http.get<UserCheckin[]>(`${baseUrl}/${date}`);
  }


}
