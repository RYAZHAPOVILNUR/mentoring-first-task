import {Injectable} from '@angular/core'
import {User} from '../interface/users.interface'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users: User[] = []

  constructor() {}

  setUsers(users: User[]): void {
    this.users = users
  }


  editUser(updatedUser: User): void {
    this.users = this.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    )
  }

  addUser(user: User): void {
    this.users = [...this.users, user]
  }


  deleteUser(id: number | undefined): void {
    this.users = this.users.filter((user) => user.id !== id);

  }
}
