import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private readonly apiService = inject(HttpClient)
  private readonly apiUrl = "https://jsonplaceholder.typicode.com/"
  private readonly resource = "users"
  private readonly users = signal<User[]>([])
  readonly users$ = this.users.asReadonly();

  getUsers(): void {
    this.apiService.get<User[]>(`${this.apiUrl}${this.resource}`)
      .subscribe({
        next: data => this.users.set(data),
        error: err => {
          console.error('Error loading users', err);
          this.users.set([]);
        }
      }
    );
  }
} 
