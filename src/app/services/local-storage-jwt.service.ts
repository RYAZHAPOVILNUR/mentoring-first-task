// import { Injectable, inject } from "@angular/core";
// import { UsersService } from "./users.service";

// @Injectable({
//     providedIn: 'root'
// })
// export class LocalStorageService {
//     private usersService = inject(UsersService);
//     private readonly users$ = this.usersService.users$;

//     // public getItem(): string | null {
//     //     return localStorage.getItem('jwtToken') || null;
//     // }

//     // public setItem(data: string): void {
//     //     localStorage.setItem('jwtToken', data);
//     // }

//     // public removeItem(): boolean {
//     //     localStorage.removeItem('jwtToken');
//     //     return true;
//     // }


//     setItem(key: string, value: any): void {
//         localStorage.setItem(key, JSON.stringify(value));
//     }

//     getItem(key: string): any {
//         const data = localStorage.getItem(key);
//         return data ? JSON.parse(data) : null;
//     }

//     removeItem(key: string): void {
//         localStorage.removeItem(key);
//     }

//     clear(): void {
//         localStorage.clear();
//     }
// }