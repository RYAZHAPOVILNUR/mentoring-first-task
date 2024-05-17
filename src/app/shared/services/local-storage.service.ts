import { Injectable } from '@angular/core';
import { IUser } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): IUser[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, data: IUser[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
