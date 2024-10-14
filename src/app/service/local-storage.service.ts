import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): any {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  setItem<T>(key : string, value : T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}