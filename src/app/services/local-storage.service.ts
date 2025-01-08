import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public getDataLocalStorage<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public saveDataLocalStorage<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeDataLocalStorage<T>(key: string): void {
    localStorage.removeItem(key);
  }
}
