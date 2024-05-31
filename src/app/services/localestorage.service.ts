import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {USERS_FEATURE_KEY} from "../states/users/users.reducer";
import {User} from "../users.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private dataSource = new BehaviorSubject<User[]>([]);


  constructor() {}

  saveData(data: any) {
    localStorage.setItem(USERS_FEATURE_KEY, JSON.stringify(data));
    this.dataSource.next(data);
  }
  getItem(): string | null {
    return localStorage.getItem(USERS_FEATURE_KEY) || null;
  }

  loadData(): Observable<User[]> {
    const storedData = localStorage.getItem(USERS_FEATURE_KEY);
    try {
      if (storedData) {
        const parsedData = JSON.parse(storedData); // try catch
        this.dataSource.next(parsedData);
        return of(parsedData);
      } else {
        return of([]);
      }
    } catch (error) {
      console.log(error);
      return of([]);
    }
  }

}
