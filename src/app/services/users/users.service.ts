import {Injectable} from '@angular/core';
import {UsersApiService} from "./users-api.service";
import {User} from "../../interfaces/users";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Реактивное состояние users
  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Подписка на изменения реактивного состояния users
  public readonly users$ = this.usersSubject$.asObservable();

  constructor(private usersApiService: UsersApiService) { }

  loadUsers():void {
    this.usersApiService.getUsers().subscribe(
      (data: User[]) => {
      this.usersSubject$.next(data);
    });
  }

  deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter(user=> user.id !== id));
  }

}
