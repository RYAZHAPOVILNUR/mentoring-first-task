import { Injectable, inject } from "@angular/core";
import { User } from "../interface/users.interface";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService{

 setItem(key: string, value: any): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): User[] {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}