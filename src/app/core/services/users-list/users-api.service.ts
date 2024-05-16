import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersType } from '../../../shared/types/users-types.type';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUsersUrl;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<UsersType[]>(this.apiUrl)
  }

}
