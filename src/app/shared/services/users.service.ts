import { BehaviorSubject } from "rxjs";
import { IUser } from "../models/user.models";
import { inject } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";


export class UsersService {

  private readonly localStorageService = inject(LocalStorageService);
  public readonly users$ = new BehaviorSubject<IUser[]>([]);

  public setUsers(data: IUser[]): void {
    this.users$.next(data);
  }

  public addUser(user: IUser): void {
    this.users$.next([...this.users$.value, {...user, id: new Date().getTime()}]);
    this.localStorageService.setItem('users', JSON.stringify(this.users$.value));
  }

  public deleteUser(id: number): void {
    this.users$.next(this.users$.value.filter(user => user.id !== id));
    this.localStorageService.setItem('users', JSON.stringify(this.users$.value));
  }

  public editUser(userEdited: IUser): void {
    this.users$.next(this.users$.value.map((user: IUser) => {
      if (user.id !== userEdited.id) return user;
      return user = userEdited;
    }));
    this.localStorageService.setItem('users', JSON.stringify(this.users$.value));
  }
}
