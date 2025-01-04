import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from "rxjs";
import { Router } from "@angular/router";
import { IUserRole } from "../Interfaces/IUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly router = inject(Router)
  private readonly userSubject$: BehaviorSubject<IUserRole | null> = new BehaviorSubject<IUserRole | null>(null);
  public readonly user$: Observable<IUserRole | null> = this.userSubject$.asObservable();

  constructor() {
    this.router
  };

  private user: IUserRole = {
    name: 'daniyar',
    email: 'the.happy@gmail.com',
    isAdmin: null,
  };

  public loginAsAdmin(): void {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  };

  public loginAsUser(): void {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  };

  public get isAdmin(): boolean | null {
    if (this.userSubject$.value) {
      return this.userSubject$.value.isAdmin;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.userSubject$.next(null);
    this.router.navigate(['']).then((result: boolean) => false);
  }
}
