import {inject, Injectable} from "@angular/core";
import { UserApiService } from './users-api.service';
import { BehaviorSubject } from "rxjs";
import { IUser } from '@models/user.model';
import { LocalStorageAct } from "@services/localStorageAct";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly usersApiService = inject(UserApiService);
  private readonly localStorageAct = inject(LocalStorageAct);

  private readonly _user$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this._user$.asObservable();

  public loadUsers(data?: IUser[]): void {
    if(data) {
      this._user$.next(data);
    } else {
      this.usersApiService.getUser().subscribe(
        (data: IUser[]) => this._user$.next(data)
      );
    }
  }

  public updateUsers(): void {
    this.users$.subscribe(
      (users: IUser[]) => {
        this.localStorageAct.setItem(JSON.stringify(users));
      }
    );
  }

  public createUser(user: IUser): void {
    const newData = [...this._user$.value, user];
    this._user$.next(newData);
  }

  public editUser(userToEdit: IUser): void {
    this._user$.next(
      this._user$.value.map(
        (user) => user.username === userToEdit.username ? userToEdit : user
      )
    );
  }

  public deleteUser(username: string): void {
    this._user$.next(
      this._user$.value.filter(
        (user) => user.username !== username
      )
    );
  }
}
