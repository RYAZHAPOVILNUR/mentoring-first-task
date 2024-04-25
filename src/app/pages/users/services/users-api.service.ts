import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IUser } from '../interface/user.interface'
import { Observable } from 'rxjs'
import { API_URL } from '../lib/api-url.token'

@Injectable({
	providedIn: 'root'
})
export class UsersApi {
	private readonly http = inject(HttpClient)
	private readonly apiUsersUrl = inject(API_URL)

	public getUsers(): Observable<IUser[]> {
		return this.http.get<IUser[]>(this.apiUsersUrl)
	}
}
