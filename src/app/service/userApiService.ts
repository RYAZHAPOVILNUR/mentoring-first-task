import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interface/users.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserApiService{
 
 constructor(private http: HttpClient){
 }
private Url = 'https://jsonplaceholder.typicode.com/users';

 public getUsers(){
   return this.http.get<User[]>(this.Url)
   
}

}