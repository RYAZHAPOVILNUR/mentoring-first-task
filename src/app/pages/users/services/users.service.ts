import { Injectable, inject } from '@angular/core'
import { UsersApi } from './users-api.service'
import { IUser } from '../interface/user.interface'
import { BehaviorSubject, Observable, of, reduce, tap } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	public readonly usersSubject$ = new BehaviorSubject<IUser[]>([])
	public readonly users$ = this.usersSubject$.asObservable()
	private readonly usersApiService = inject(UsersApi)
	private readonly localStorageService = inject(LocalStorageService)

	public getUsers(): Observable<IUser[]> {
		const cachedData = this.localStorageService.getItem('usersList')
		const arrCachedData = JSON.parse(cachedData!)

		if (cachedData && arrCachedData.length !== 0) {
			this.usersSubject$.next(arrCachedData)
			return of(arrCachedData)
		} else {
			return this.usersApiService.getUsers().pipe(
				tap((response: IUser[]) => {
					this.usersSubject$.next(response)
					this.localStorageService.setItem('usersList', response)
				})
			)
		}
	}

	public deleteUser(id: number): void {
		this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== id))
		this.localStorageService.setItem('usersList', this.usersSubject$.value)
	}

	public addUser(userFormData: IUser): void {
		this.usersSubject$.next(
			this.usersSubject$.value.concat({ ...userFormData, id: this.usersSubject$.value.length + 1 })
		)
		this.localStorageService.setItem('usersList', this.usersSubject$.value)
	}

	public editUser(user: IUser, userFormData: IUser): void {
		this.usersSubject$.next(
			this.usersSubject$.value.map(item => {
				if (item.id !== user.id) {
					return item
				} else {
					return { ...item, name: userFormData.name, email: userFormData.email, username: userFormData.username }
				}
			})
		)
		this.localStorageService.setItem('usersList', this.usersSubject$.value)
	}
}
