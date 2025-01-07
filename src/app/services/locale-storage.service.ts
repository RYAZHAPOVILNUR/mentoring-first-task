import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsers } from '../components/users-list/store/users.selectors';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly store = inject(Store);
  readonly users$ = this.store.select(selectUsers);

  getItem(): User[] {
    const data = localStorage.getItem('users') || null;
    return data ? JSON.parse(data) : null;
  }

  setItem(data: User[]): User[] {
    localStorage.setItem('users', JSON.stringify(data));
    return data;
  }

  updateLocaleStorage() {
    localStorage.clear();
    this.users$.subscribe((users) => {
      this.setItem(users);
    });
  }
}
