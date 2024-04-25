import {Injectable} from '@angular/core'
import {User} from '../interface/users.interface'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {API_URL} from '../constants/constant'

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL)
  }
}
