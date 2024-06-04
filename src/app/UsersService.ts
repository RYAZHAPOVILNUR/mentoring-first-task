import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "./user";
import { UsersApiService } from './http.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class usersService {
    private usersSubject = new BehaviorSubject<IUser[]>([]);
    public readonly users$ = this.usersSubject.asObservable();

    constructor(private UsersApiService: UsersApiService) { }

    loadUsers() {
        this.UsersApiService.getUsers().subscribe(
            (data: IUser[]) => {
                this.usersSubject.next(data)
            }
        )
    }

    createUser(user: IUser) {
        this.usersSubject.next(this.usersSubject.getValue().concat([user]));
    }

    editUser(user: IUser) {
        this.usersSubject.next(this.usersSubject.value.map(item =>
            item.id === user.id ? user : item
        ));
    }

    deleteUser(id: number) {
        this.usersSubject.next(this.usersSubject.value.filter(user => user.id != id))
    }
}