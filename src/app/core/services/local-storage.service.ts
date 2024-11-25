import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): any {
    try{
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch (error){
      console.error('Error parsing localStorage data:', error);
    }
  }

  setItem(key: string, data: string): string {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }

  removeItem(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }
}
