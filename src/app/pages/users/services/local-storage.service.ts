import { Injectable } from '@angular/core'
import { IUser } from '../interface/user.interface'

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	getItem(key: string) {
		return localStorage.getItem(key)
	}

	setItem(key: string, data?: IUser[]) {
		localStorage.setItem(key, JSON.stringify(data))
	}
}
