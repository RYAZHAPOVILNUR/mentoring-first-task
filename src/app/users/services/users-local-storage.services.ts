import { Injectable } from "@angular/core";
import { User } from "../modules/interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UsersLocalStorageService {

    public getLocalStorageUsers(key: string): User[] {
        const usersString = localStorage.getItem(key);
        return usersString ? JSON.parse(usersString) : []
    }

    public setLocalStorageUsers(key: string, users: User[]) {
        localStorage.setItem(key, JSON.stringify(users));
    }

    public clearLocalStorage(): void {
        localStorage.clear()
    }

    public updateLocalStorage(key: string, updatedUser: User) {
        let source = this.getLocalStorageUsers(key);
        source = source.map((user) => user.id == updatedUser.id ? updatedUser : user)
        this.clearLocalStorage()
        console.log(source);
        return this.setLocalStorageUsers(key, source)
    }
}