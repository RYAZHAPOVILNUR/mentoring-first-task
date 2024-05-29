import { Injectable } from "@angular/core";
import { User } from "../models/user.interface";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    public getItem<T>(key: string): User[] | null {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    public setItem(key: string, value: User[]): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}