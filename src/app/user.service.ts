import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api-service.service';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private usersSubject$ = new BehaviorSubject<User[]>([]); // создали реактивное состояние
  public readonly users$ = this.usersSubject$.asObservable()

  constructor(private usersApiService: UsersApiService) { }

  deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== id)); // Уведомляем подписчиков о изменениях
  }

  loadUsers(): void {
    this.usersApiService.getUsers().subscribe(
      (data: User[]) => {
        this.usersSubject$.next(data);
      }
    );
  }
}