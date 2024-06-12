import { Injectable } from "@angular/core";
import { USERS_FEATURE_KEY } from "@store/users.reducer";
import { User } from "@models/user.interface";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private readonly storageKey = USERS_FEATURE_KEY; 

    public getItem(): User[] | null  {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    public setItem(value: User[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(value));
    }
}