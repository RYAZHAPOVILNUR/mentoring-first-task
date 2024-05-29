import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.interface';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({                                                                                                                                                                                                                                                                                                                                                             
    providedIn: 'root'
})
export class UsersService {

    private usersApiService = inject(UsersApiService);
    private localStorageService = inject(LocalStorageService);
    private userSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public readonly users$: Observable<User[]> = this.userSubject$.asObservable();
    private usersLocalStorage: User[] | null = this.localStorageService.getItem<User[]>('users');

    constructor() {
        this.loadUsers();
    }

    private get getUsers(): User[] {  
        return this.userSubject$.getValue();
    }

    private set setUsers(users: User[]) {
        this.userSubject$.next(users);
        this.localStorageService.setItem('users', users);
    }

    public loadUsers(): void {
        if (!this.usersLocalStorage) {
            this.loadUsersAPI();
        } else {
            this.loadUsersFromLocalStorage();
        }
    }

    public loadUsersAPI(): void {
        this.usersApiService.getUsersAPI().subscribe((data: User[]) => {
            this.setUsers = data;
        });
    }

    public loadUsersFromLocalStorage(): void {
        this.userSubject$.next(this.usersLocalStorage!);
    }

    public addUser(addedUser: User): void {
        const newId = new Date().getTime();
        const newUser = { ...addedUser, id: newId };
        this.setUsers = [...this.getUsers, newUser];
    }

    public updateUser(updatedUser: User): void {
        this.setUsers = this.getUsers.map(user => (user.id === updatedUser.id) ? updatedUser : user);
    }

    public deleteUser(id: number): void {
        this.setUsers = this.getUsers.filter(user => user.id !== id);
    }
}