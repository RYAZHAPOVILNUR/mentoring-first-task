import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    getItem(): string | null {
        return localStorage.getItem('Users') || null;
    }

    setItem(data: string): string {
        localStorage.setItem('Users', data);
        return data;
    }

    removeItem(): boolean {
        localStorage.removeItem('Users');
        return true;
    }
}
