import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login } from '../models/login.interface';
import { DateRange } from '../models/daterange.interface';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  SERVER_BACK_END: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  public authLogin (form: Login){
    return this.http.post(this.SERVER_BACK_END + "/login", form);
  }

  public findAllUsers(){
    return this.http.get(this.SERVER_BACK_END + "/users");
  }

  public saveUser(data: any){
    return this.http.post(this.SERVER_BACK_END + "/user", data);
  }

  public findUserById(id: number) {
    return this.http.get(this.SERVER_BACK_END + `/user/${id}`);
  }

  public updateUser(id: number, data: any){
    return this.http.put(this.SERVER_BACK_END + `/user/${id}`, data);
  }

  public deleteUser(id: number){
    return this.http.delete(this.SERVER_BACK_END + `/user/${id}`);
  }

  public filterByStatus(status: string){
    return this.http.get(this.SERVER_BACK_END + `/users/status/${status}`);
  }

  public filterByRangeDate(form: DateRange){
    return this.http.post(this.SERVER_BACK_END + "/users/filter", form);
  }

  public countUsers(){
    return this.http.get(this.SERVER_BACK_END + "/users/count");
  }
}
