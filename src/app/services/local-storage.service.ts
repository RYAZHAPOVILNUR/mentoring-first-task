import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem(key: string): User[] | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
