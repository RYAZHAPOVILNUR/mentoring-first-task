import {
  inject,
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from "rxjs";
import { IUser } from "../Interfaces/IUser";
import { LocalStorageService } from "./local-storage.service";
import { UsersApiService } from "./users-api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public readonly users$: Observable<IUser[]> = this.usersSubject$.asObservable();
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly usersApiService: UsersApiService = inject(UsersApiService);
  private readonly localStorageUsersKey: string = 'users';

  private setUsers(usersData: IUser[]): void {
    this.localStorageService.saveDataLocalStorage<IUser[]>(
      this.localStorageUsersKey, usersData
    )
    this.usersSubject$.next(usersData);
  }

  public loadUsers(): void {
    const loadStorageUsers: IUser[] | null = this.localStorageService.getDataLocalStorage<IUser[]>(
      this.localStorageUsersKey
    );

    if (loadStorageUsers) {
      this.usersSubject$.next(loadStorageUsers);
    } else {
      this.usersApiService.getUsers().subscribe((users: IUser[]): void => {
        this.setUsers(users);
      });
    }
  }

  public createUser(user: IUser): void {
    const existingEmail: IUser | undefined = this.usersSubject$.value.find(
      (currentElement: IUser): boolean => currentElement.email === user.email
    );

    if (existingEmail !== undefined) {
      alert('Такой email уже зарегистрирован!');
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      alert('Новый пользователь успешно добавлен!');
    }
  }

  public editUser(editUser: IUser): void {
    const index: number = this.usersSubject$.value.findIndex((el: IUser): boolean => el.id === editUser.id);

    this.usersSubject$.value[index] = editUser;
    this.setUsers(this.usersSubject$.value);
  }

  public deleteUser(id: number): void {
    const newArrayUsers: IUser[] = this.usersSubject$.value.filter((user: IUser): boolean => user.id !== id);
    const findUser: IUser | undefined = this.usersSubject$.value.find((user: IUser): boolean => user.id === id);

    if (findUser) {
      this.setUsers(newArrayUsers);
    }

    if (!this.usersSubject$.value.length) {
      this.localStorageService.removeDataLocalStorage(this.localStorageUsersKey);
    }
  }
}
