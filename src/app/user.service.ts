import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean | null;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject$: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public readonly user$: Observable<IUser | null> =
    this.userSubject$.asObservable();

  private user: IUser = {
    name: 'Павел',
    email: 'email@.ru',
    isAdmin: null,
  };

  loginisAdmin(): void {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  }

  loginisUser(): void {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  }

  get isAdmin(): boolean | null | undefined {
    return this.userSubject$.value?.isAdmin;
  }

  logout(): void {
    this.userSubject$.next(null);
  }
}
