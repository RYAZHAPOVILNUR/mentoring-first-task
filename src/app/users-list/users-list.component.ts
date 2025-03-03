import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UsersApiService } from '../services/users-api.service';
import { UsersService } from '../services/users.service';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCartComponent, CreateUserFormComponent, NgFor, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);
  localStorageService = inject(LocalStorageService);

  constructor() {}

  ngOnInit(): void {
    const usersFromStorage =
      this.localStorageService.getFromLocalStorage('users');

    if (usersFromStorage.length) {
      this.usersService.setUsers(usersFromStorage);
    } else {
      this.usersApiService
        .getUsers()
        .subscribe((users) => this.usersService.setUsers(users));
    }
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id); // Удаляем пользователя
  }

  editUser(user: any) {
    this.usersService.editUser({
      ...user,
      company: {
        name: user.companyName,
      },
    }); // Редактируем пользователя
  }

  createUser(formData: any) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.companyName,
      },
    }); // Создаем нового пользователя
    console.log('ДАННЫЕ ФОРМЫ:', formData); // Для отладки
  }
}
