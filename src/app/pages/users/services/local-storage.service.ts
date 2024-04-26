import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	getItem(key: string) {
		return localStorage.getItem(key)
	}

	setItem(key: string, data?: any) {
		localStorage.setItem(key, JSON.stringify(data))
	}
}
