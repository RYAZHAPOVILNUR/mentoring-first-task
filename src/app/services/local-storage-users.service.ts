import { Injectable } from '@angular/core';
import { UserEntity } from '../entities/UserEntity';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUsersService {

  public getItem(): UserEntity[] | null {
    const jsonUsers = localStorage.getItem('users');
    if (jsonUsers === null) return null

    return JSON.parse(jsonUsers);
  }

  public setItem(users: UserEntity[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
