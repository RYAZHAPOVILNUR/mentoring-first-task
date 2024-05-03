import { Injectable, inject } from '@angular/core'
import { Observable, of, tap } from 'rxjs'
import { IState, IUser } from '../interface/user.interface'
import { environment } from '../../../../environments/environment.development'
import { UsersApi } from './users-api.service'
import { Store } from '@ngrx/store'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly usersApiService = inject(UsersApi)
  private readonly data = localStorage.getItem(environment.localStorageKey)
  private store$ = inject(Store<IState>)

  public getAllUsers(): Observable<IUser[]> {
    if (this.data) {
      return of(JSON.parse(this.data))
    } else {
      return this.usersApiService.getUsers().pipe(
        tap(users => {
          localStorage.setItem(environment.localStorageKey, JSON.stringify(users))
        })
      )
    }
  }
  setItem(key: string, data?: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
