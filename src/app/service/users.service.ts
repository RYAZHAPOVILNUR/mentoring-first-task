import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interface/users.interface';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService{
    private usersSubject$ = new BehaviorSubject<User[]>([]);
    public readonly users$ = this.usersSubject$.asObservable();
    constructor(
        private usersApiService: UsersApiService
    ){}
    loadUser(): Observable<User[]> {
        const localStorageUsers = localStorage.getItem('users')
        if(localStorageUsers){
            const users: User[] = JSON.parse(localStorageUsers);
            this.usersSubject$.next(users);
            return new BehaviorSubject(users).asObservable();
        } else{
            return this.usersApiService.getUsers().pipe(
                tap((users: User[]) => {
                    this.usersSubject$.next(users);
                    localStorage.setItem('users', JSON.stringify(users))
                })
            )
        }
    }
    deleteUser( id: number ): Observable<void>{
        return this.usersApiService.deleteUser(id).pipe(
            tap(() => {
                const updatedUsers = this.usersSubject$.value.filter(user => user.id !== id)
                this.usersSubject$.next(updatedUsers)
                localStorage.setItem('users', JSON.stringify(updatedUsers))
            })
        )
    }
    editUser(user: User): Observable<User> {
        return this.usersApiService.editUser(user).pipe(
            tap((updatedUser: User) => {
                const updatedUsers = this.usersSubject$.value.map(u => (u.id === updatedUser.id ? updatedUser : u));
                this.usersSubject$.next(updatedUsers)
                localStorage.setItem('users', JSON.stringify(updatedUsers))
            })
        )
    }
    createUser(user: User): Observable<User>{
        return this.usersApiService.addUser(user).pipe(
            tap((newUser: User) => {
                const updatedUser = [...this.usersSubject$.value, newUser];
                this.usersSubject$.next(updatedUser)
                localStorage.setItem('users', JSON.stringify(updatedUser))
            })
        )
    }
    returnUser(): Observable<User[]> {
       return this.usersApiService.returnUser().pipe(
            tap((users: User[]) => {
                this.usersSubject$.next(users);
                localStorage.setItem('users', JSON.stringify(users))
            })
        )
    }
}