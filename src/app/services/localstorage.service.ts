import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getUsers(){
    return localStorage.getItem('users');
  }

  setItems(key: string, value: User[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  deleteUser(userId: number) {
    const users = localStorage.getItem('users');
    if(users){
      const usersParse: User[] = JSON.parse(users);
      const filteredParse = usersParse.filter((user: User) => {
        return +user.id !== userId;
      });
      localStorage.setItem('users', JSON.stringify(filteredParse));
    }
  }
}
