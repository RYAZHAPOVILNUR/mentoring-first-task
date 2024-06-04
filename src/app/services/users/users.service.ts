import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { User } from '../../interfaces/users';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    // Реактивное состояние users
    private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    // Подписка на изменения реактивного состояния users

    // public readonly users = this.usersSubject$.getValue();
    public readonly users$ = this.usersSubject$.asObservable();

    constructor(private usersApiService: UsersApiService) {}

    loadUsers(): void {
        this.usersApiService.getUsers().subscribe((data: User[]) => {
            this.usersSubject$.next(data);
        });
    }

    addUser(user: User): void {
        // Находим максимальный id в массиве Users
        let newUser: User = {
            id: 1,
            ...user,
        };
        const users: User[] = this.usersSubject$.getValue();
        const usersId = users.map(obj => obj.id);
        if (usersId.length) {
            const newId: number = usersId.sort((a, b) => a! - b!).pop()! + 1;
            newUser.id = newId;
        }
        users.push(newUser);
        this.usersSubject$.next(users);
    }

    deleteUser(id: number): void {
        this.usersSubject$.next(this.usersSubject$.getValue().filter(user => user.id !== id));
    }
}
