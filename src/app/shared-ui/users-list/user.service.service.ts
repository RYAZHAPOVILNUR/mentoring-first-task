import {Injectable} from '@angular/core';
import {User} from "../../data/interfaces/userApiService";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userSubjekt$ = new BehaviorSubject<User[]>([])

  setUser(user: User[]) {
    this.userSubjekt$.next(user)
  }

  editUser(editedUser: User) {
    this.userSubjekt$.next (
      this.userSubjekt$.value.map(user => user.id === editedUser.id ? editedUser : user)
    )
  }

  createUser(newUser: User) {
    this.userSubjekt$.next([...this.userSubjekt$.value, newUser])
  }

  deleteUser(userId: number) {
    this.userSubjekt$.next(this.userSubjekt$.value.filter(user => user.id !== userId))
  }
}
