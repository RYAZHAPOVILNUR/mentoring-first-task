import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): string | null {
    return localStorage.getItem(key) || null;
  }

  setItem(key: string, data: string): string {
    localStorage.setItem(key, data);
    return data;
  }

  removeItem(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }
}
