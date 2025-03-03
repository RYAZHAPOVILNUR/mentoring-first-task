// import { Injectable } from '@angular/core';
// import { User } from '../interfaces/user.interface';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class UsersService {
//   private usersSubject$ = new BehaviorSubject<User[]>([]);

//   users$ = this.usersSubject$.asObservable();

//   setUsers(users: User[]) {
//     this.usersSubject$.next(users);
//   }

//   editUser(editedUser: User) {
//     this.usersSubject$.next(
//       this.usersSubject$.value.map((user) => {
//         if (user.id === editedUser.id) {
//           return editedUser;
//         } else {
//           return user;
//         }
//       })
//     );
//   }

//   createUser(user: User) {
//     const existingUser = this.usersSubject$.value.find(
//       (currentElement) => currentElement.email === user.email
//     );

//     console.log(existingUser);

//     if (existingUser !== undefined) {
//       alert('ТАКОЙ EMAIL УЖЕ ЗАРЕГИСТРИРОВАН');
//     } else {
//       this.usersSubject$.next([...this.usersSubject$.value, user]);
//       alert('НОВЫЙ ПОЛЬЗОВАТЕЛЬ УСПЕШНО ДОБАВЛЕН');
//     }
//   }

//   deleteUser(id: number) {
//     this.usersSubject$.next(
//       this.usersSubject$.value.filter((item) => {
//         if (id === item.id) {
//           return false;
//         } else {
//           return true;
//         }
//       })
//     );
//   }
// }




import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Импортируем LocalStorageService

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]); // Объявляем BehaviorSubject для пользователей
  users$ = this.usersSubject$.asObservable(); // Подписка на пользователей

  constructor(private localStorageService: LocalStorageService) {
    // Загружаем пользователей из localStorage при старте
    const usersFromStorage = this.localStorageService.getFromLocalStorage('users');
    if (usersFromStorage.length > 0) {
      this.usersSubject$.next(usersFromStorage); // Если данные есть в localStorage, загружаем их в сервис
    }
  }

  setUsers(users: User[]) {
    this.usersSubject$.next(users);
    this.localStorageService.saveToLocalStorage('users', users); // Сохраняем пользователей в localStorage
  }

  editUser(editedUser: User) {
    const updatedUsers = this.usersSubject$.value.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.saveToLocalStorage('users', updatedUsers); // Обновляем localStorage
  }

  createUser(user: User) {
    const existingUser = this.usersSubject$.value.find(
      (currentElement) => currentElement.email === user.email
    );

    if (existingUser) {
      alert('ТАКОЙ EMAIL УЖЕ ЗАРЕГИСТРИРОВАН');
    } else {
      const updatedUsers = [...this.usersSubject$.value, user];
      this.usersSubject$.next(updatedUsers);
      this.localStorageService.saveToLocalStorage('users', updatedUsers); // Добавляем нового пользователя и сохраняем в localStorage
      alert('НОВЫЙ ПОЛЬЗОВАТЕЛЬ УСПЕШНО ДОБАВЛЕН');
    }
  }

  deleteUser(id: number) {
    const updatedUsers = this.usersSubject$.value.filter((user) => user.id !== id);
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.saveToLocalStorage('users', updatedUsers); // Обновляем список пользователей в localStorage
  }
}







