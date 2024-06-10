import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { User } from '../../interfaces/users';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    // Реактивное состояние users
    private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    public readonly users$ = this.usersSubject$.asObservable();

    constructor(
        private usersApiService: UsersApiService,
        private localStorageService: LocalStorageService
    ) {}

    loadUsers(): void {
        const storedUsers = this.localStorageService.getItem();
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
                this.usersSubject$.next(parsedUsers);
                return;
            }
        }
        this.usersApiService.getUsers().subscribe((data: User[]) => {
            this.usersSubject$.next(data);
            this.localStorageService.setItem(JSON.stringify(data));
        });
    }

    editUser(user: User) {
        const users = this.usersSubject$.getValue();
        const filteredUsers = users.filter(obj => obj.id !== user.id);
        const updatedUsers = [...filteredUsers, user];
        const sortedUsers = updatedUsers.sort((a, b) => {
            if (a.id === undefined) return 1;
            if (b.id === undefined) return -1;
            return a.id - b.id;
        });
        this.localStorageService.setItem(JSON.stringify(sortedUsers));
        this.usersSubject$.next(sortedUsers);
    }

    addUser(user: User): void {
        // Находим максимальный id в массиве Users
        let newUser: User = {
            id: 0,
            ...user,
        };
        const users: User[] = this.usersSubject$.getValue();
        const usersId = users.map(obj => obj.id);
        if (usersId.length) {
            const newId: number = usersId.sort((a, b) => a! - b!).pop()! + 1;
            newUser.id = newId;
        }
        users.push(newUser);
        this.localStorageService.setItem(JSON.stringify(users));
        this.usersSubject$.next(users);
    }

    deleteUser(id: number): void {
        const users: User[] = this.usersSubject$.getValue().filter(user => user.id !== id);
        this.localStorageService.setItem(JSON.stringify(users));
        this.usersSubject$.next(users);
    }
}
