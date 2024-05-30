import { inject, Injectable } from "@angular/core";
import { IUser } from "@models/user.model";
import { USERS_FEATURE_KEY } from "@state/users/users.reducer";
import { UsersFacade } from "@state/users/users.facade";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageAct {
  private readonly storageKey = USERS_FEATURE_KEY;
  private readonly usersFacade = inject(UsersFacade);

  private readonly users$ = this.usersFacade.usersState$;

  public setItem(value: string): void {
    localStorage.setItem(this.storageKey, value);
  }

  public getItem(): string | null {
    return localStorage.getItem(this.storageKey) || null;
  }

  public updateUsers(): void {
    this.users$.subscribe(
      (users: IUser[]) => {
        this.setItem(JSON.stringify(users));
      }
    );
  }
}
