import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthBackendService } from './auth-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLocalStorageService {

  constructor(private router: Router) { }
  getTokenFromLocalStorage(): string {
    if (typeof localStorage == 'object') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        return storedToken;
      } else {
        alert('токен отсутствует или устарел')
        return ''
      }
    }
    return '';
  }

  setToken(token: string): void {
    if (typeof localStorage === 'object') {
      localStorage.setItem('token', token);
      this.router.navigate(['/users-back'])
    }
  }

  removeToken(): void {
    if (typeof localStorage === 'object') {
      localStorage.removeItem('token');
    }
  }

}
