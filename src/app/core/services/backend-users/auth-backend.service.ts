import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthBackendService {
  apiUrl = environment.apiMaterialUrl;

  constructor(private http: HttpClient) { }

  getTokenFromBackend(email: string, password: string) {
    return this.http.post<any>(this.apiUrl + 'auth/login1', {
      "email": email,
      "password": password
    });
  }

  signUp(
    name: string,
    email: string,
    password: string,
    username: string,
    city: string
  ) {
    return this.http.post<any>(this.apiUrl + 'auth/signup',
      {
        "name": name,
        "email": email,
        "password": password,
        "username": username,
        "city": city
      });
  }
}

