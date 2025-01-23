import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem(key: string): { [key: string]: string } | Error | null {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : null
    } catch (error) {
      if (error instanceof Error) return error
      return new Error('Unknown error occurred')
    }
  }

  setItem(key: string, data: string): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  removeItem(key: string): boolean {
    localStorage.removeItem(key)
    return true
  }
}
