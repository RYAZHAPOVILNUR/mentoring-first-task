import {inject, Injectable} from '@angular/core';
import {FormUser, User} from "../components/users-list/users-list.component";
import {BehaviorSubject, filter, map} from "rxjs";
import {LocalstorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();
  readonly storage = inject(LocalstorageService);


  setUsers(users: User[]){
    // this.users = users;
    this.usersSubject$.next(users)
  }

  editUser(editedUser: User){
    this.usersSubject$.next(
      this.usersSubject$.value.map(
        user => {
          if(user.id === editedUser.id){
            return editedUser
          } else {
            return user
          }
        }
      )
    )
  }

  createUser(user: User){
    const existingUser = this.usersSubject$.value.find(
      currentElement => currentElement.email === user.email
    )

    if(existingUser !== undefined){
      alert('ТАКОЙ EMAIL УЖЕ ЗАРЕГИСТРИРОВАН')
    } else {
      this.usersSubject$.next([...this.usersSubject$.value,user])
      this.storage.addItem(user)
      alert('НОВЫЙ ПОЛЬЗОВАТЕЛЬ УСПЕШНО ДОБАВЛЕН')
    }
  }

  deleteUser(id:number){
    // this.users = this.users.filter((user) => user.id !== id)

    this.usersSubject$.next(
      this.usersSubject$.value.filter(((user) => user.id !== id))
    )
    this.storage.deleteItem(id)
  }
}
