import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly token: string = 'userToken';

  getUsers(): User[] | null {
    let usersString: string | null = localStorage.getItem(this.token) || null;
    let usersArray: User[] | null = [];

    return (usersString) ?
      usersArray = JSON.parse(usersString) :
      usersArray = null;
  }

  setUsers(data: any): string {
    localStorage.setItem(this.token, JSON.stringify(data));
    return data;
  }

  removeUsers(): boolean {
    localStorage.removeItem(this.token);
    return true;
  }
}
