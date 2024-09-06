import { Injectable } from '@angular/core'
import { User } from '../data/interfaces/users.interface'

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public readonly USERS_KEY: string = 'users'

  public setUsers(users: User[]): void {
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
    } catch (error) {
      console.error('Error saving users to localStorage:', error)
    }
  }

  public getUsers(): User[] | null {
    const localUsers = localStorage.getItem(this.USERS_KEY)
    let result: User[] | null = []
    try {
      if (localUsers) result = JSON.parse(localUsers)
    } catch (error) {
      console.error('Error parsing users from localStorage:', error)
    }
    return result
  }

  public removeUser(userId: number): void {
    const users = this.getUsers()
    if (!users?.length) {
      console.error('Users do not exist in localStorage')
      return
    }
    const updatedUsers = users.filter(
      (user) => user.id !== userId,
    )
    this.setUsers(updatedUsers)
  }
}
