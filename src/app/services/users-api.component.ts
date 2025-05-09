import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { User } from '../Interfaces/user.interface';

@Injectable({ providedIn: 'root' })

export class UsersApiComponent {
apiService = inject(HttpClient);

  getUsers() {
    return this.apiService.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
  
}
