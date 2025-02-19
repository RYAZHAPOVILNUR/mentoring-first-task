import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable();
    
    setUsers(users: User[]) {
        this.usersSubject$.next(users);
    }
    
    editUser(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    if (user.id === editedUser.id) {
                        return editedUser;
                    } else {
                        return user;
                    }
                }
            )
        )
    }

    createUser(user: User) {
        this.usersSubject$.next(
            [...this.usersSubject$.value, user]
        );
    }

    deleteUser(id: number) {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(
                user => {
                    if (id === user.id) {
                        return false
                    } else {
                        return true;
                    }   
                }
            )

        )
    }
}
