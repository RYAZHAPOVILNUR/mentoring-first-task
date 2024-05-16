import { Injectable, inject } from '@angular/core';
import { UsersApiService } from './users-api-service.service';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersApiService = inject(UsersApiService);
  private usersSubject$ = new BehaviorSubject<User[]>([]); // создали реактивное состояние
  public readonly users$ = this.usersSubject$.asObservable()

  users: User[] = [];
  data: any;

  constructor(){}

  // deleteUser(id: number): void {
  //   this.usersSubject$.next(this.usersSubject$.value
  //     .filter(user => user.id !== id)); // Уведомляем подписчиков о изменениях
  // }

  // loadUsers(): void {
  //   this.usersApiService.getUsers().subscribe(
  //     (data: User[]) => {
  //       this.usersSubject$.next(data);
  //       this.data = data;
  //     }
  //   );
  // }

  // addUser(userData: User){
  //   const newUsers = [...this.usersSubject$.value, userData];
  //   this.usersSubject$.next(newUsers);
  // }

  updateUser(updatedUser: User): void {
    const updatedUsers = this.usersSubject$.value.map(user => {
      if (user.id === updatedUser.id) {
        return { ...user, 
          name: updatedUser.name,
          email: updatedUser.email,
          username: updatedUser.username,
          phone: updatedUser.phone,
          website: updatedUser.website
         };
      }
      return user;
    });
    this.users = updatedUsers; 
    this.usersSubject$.next([...this.users]); // Обновляем список пользователей в Observable
    this.users$.subscribe({});
  }
}
