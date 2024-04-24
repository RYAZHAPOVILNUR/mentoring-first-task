import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersType } from '../../shared/types/users-types.type';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<UsersType[]>('https://jsonplaceholder.typicode.com/users')
  }

}
