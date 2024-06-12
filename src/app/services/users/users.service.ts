import { Injectable } from '@angular/core';
import { User } from '../../../_model/users';
import { LocalStorageService } from '../local-storage.service';
import { Store } from '@ngrx/store';
import { loadUsers, loadUsersSuccess } from '../../_store/User/User.Action';
import { selectFilteredUsersId } from '../../_store/User/User.Selector';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(
        private store: Store,
        private localStorageService: LocalStorageService
    ) {}

    // loadUsers(): void {
    //     const usersListLocal: any = this.localStorageService.getItem();
    //     const usersList = JSON.parse(usersListLocal);
    //     console.log('DO_IFusersList==========>>', usersListLocal);
    //     console.log('DO_IFusersList==========>>', usersList);
    //     if (usersList && usersList.length > 0) {
    //         console.log('usersList==========>>', usersList);
    //         this.store.dispatch(loadUsersSuccess({ usersList }));
    //         return;
    //     } else {
    //         this.store.dispatch(loadUsers());
    //     }
    // }

    // addUser(user: User): void {
    //     // Находим максимальный id в массиве Users
    //     let newUser: User = {
    //         id: 0,
    //         ...user,
    //     };
    //     const users: User[] = this.usersSubject$.getValue();
    //     const usersId = users.map(obj => obj.id);
    //     if (usersId.length) {
    //         const newId: number = usersId.sort((a, b) => a! - b!).pop()! + 1;
    //         newUser.id = newId;
    //     }
    //     users.push(newUser);
    //     this.localStorageService.setItem(JSON.stringify(users));
    //     this.usersSubject$.next(users);
    // }
    //
    // deleteUser(id: number): void {
    //     const users: User[] = this.usersSubject$.getValue().filter(user => user.id !== id);
    //     this.localStorageService.setItem(JSON.stringify(users));
    //     this.usersSubject$.next(users);
    // }
}
