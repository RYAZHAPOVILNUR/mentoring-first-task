import { Injectable } from '@angular/core';
import { User } from './users-list/users-list.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem(key: string): User[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }
}
