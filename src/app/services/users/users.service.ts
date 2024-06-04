import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { User } from '../../interfaces/users';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StateService } from '../../state/global-state.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    // Реактивное состояние users
    private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    // Подписка на изменения реактивного состояния users

    public readonly users = this.usersSubject$.getValue();
    public readonly users$ = this.usersSubject$.asObservable();

    constructor(private usersApiService: UsersApiService) {}

    loadUsers(): void {
        this.usersApiService.getUsers().subscribe((data: User[]) => {
            this.usersSubject$.next(data);
        });
    }

    updateUser(user: User): void {
        const newUser: User = {
            id: this.usersSubject$.getValue().length + 1,
            ...user,
        };
        const updatedUsers: User[] = this.usersSubject$.getValue();
        updatedUsers.push(newUser);
        this.usersSubject$.next(updatedUsers);
    }

    deleteUser(id: number): void {
        this.usersSubject$.next(this.usersSubject$.getValue().filter(user => user.id !== id));
    }
}
