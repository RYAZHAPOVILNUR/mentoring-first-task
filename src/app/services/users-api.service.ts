import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../types/user.types'

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private httpClient = inject(HttpClient)

  getUsers() {
    return this.httpClient.get<User[]>(`https://jsonplaceholder.typicode.com/users`)
  }
}
