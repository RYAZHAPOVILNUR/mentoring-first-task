import { Injectable, inject } from "@angular/core";
import { User } from "../models/user.interface";
import { UsersApiService } from "./users-api.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersApiService = inject(UsersApiService);
    private userSubject$ = new BehaviorSubject<User[]>([]);
    public readonly users$ = this.userSubject$.asObservable();

    private get getUsers() {
        return this.userSubject$.getValue();
    }

    public loadUsersAPI(): void {
        console.log('Loading users...');
        this.usersApiService.getUsersAPI().subscribe((data: User[]) => {
            console.log('Received users from API:', data);
            this.userSubject$.next(data);
        });
    }

    public deleteUser(id: number): void {
        console.log('Deleting user with ID:', id);
        this.userSubject$.next(this.getUsers.filter(user => user.id !== id));
    }

    public addUser(result: User): void {
        console.log('Adding user:', result);
        const newId = this.generateId(this.getUsers);
        const userId = { ...result, id: newId }
        this.userSubject$.next([...this.getUsers, userId]);
        console.log('Updated users list:', this.getUsers);
    }

    public updateUser(updatedUser: User) {
        console.log('Updating user:', updatedUser);
        const updatedUsers = this.getUsers.map(existingUser => {
            if (existingUser.id === updatedUser.id) {
                return updatedUser;
            } else {
                return existingUser;
            }
        });
        console.log('Updated users list:', updatedUsers);
        this.userSubject$.next(updatedUsers);
    }

    private generateId(users: User[]): number {
        const maxId = Math.max(...users.map(user => user.id));
        return maxId + 1;
    }
}