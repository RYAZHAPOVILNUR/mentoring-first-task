import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageJwtService {
  
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  getObject<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setObject<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
