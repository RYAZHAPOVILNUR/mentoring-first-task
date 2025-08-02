import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { UsersApiService } from './users-api-service.service';
import { User } from '../interfaces/users';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);
  private readonly users = signal<User[]>([]);
  readonly users$ = computed(() => this.users());

  constructor() {
    const localUsers = this.localStorageService.getUsers("users");
    if (localUsers && Array.isArray(localUsers) && localUsers.length > 0) {
      this.users.set(localUsers);
    } else {
      effect(() => {
        const apiUsers = this.usersApiService.users$();
        if (apiUsers.length > 0) {
          this.users.set(apiUsers);
          this.localStorageService.setUsers("users", apiUsers);
        }
      }, { allowSignalWrites: true });
    }
  };

  deleteUser(id:number): void {
    const updated = this.users().filter(user => user.id !== id);
    this.users.set(updated);
    this.localStorageService.deleteUser("users", id.toString());
  };

  createUser(user:User): void {
    if (this.users().some(u => u.email === user.email)) {
      alert("Email is already exist");
      return;
    }
    const newUser = { ...user, id: Date.now() };
    this.users.set([...this.users(), newUser]);
    this.localStorageService.addUser("users", newUser);
  };

  editUser(updatedUser:User): void {
    const updated = this.users().map(user =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    this.users.set(updated);
    this.localStorageService.editUser("users", updatedUser);
  };
}
