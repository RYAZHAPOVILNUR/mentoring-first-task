import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../_store/User/User.Selector';
import { loadUsers, loadUsersSuccess } from '../_store/User/User.Action';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private readonly users$ = this.store.select(selectAllUsers);
    constructor(private store: Store) {
        this.users$.subscribe(users => {
            if (users.length > 0) {
                this.setItem(JSON.stringify(users));
                return;
            }
            const localUsers: any = this.getItem();
            const usersList = JSON.parse(localUsers);
            if (usersList && usersList.length > 0) {
                this.store.dispatch(loadUsersSuccess({ usersList }));
                return;
            } else {
                this.store.dispatch(loadUsers());
            }
        });
    }

    getItem(): string | null {
        return localStorage.getItem('users') || null;
    }

    setItem(data: string): string {
        localStorage.setItem('users', data);
        return data;
    }

    removeItem(): boolean {
        localStorage.removeItem('users');
        return true;
    }
}
