import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getFromLocalStorage(key: string): User[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : []; // Возвращаем данные из localStorage или пустой массив, если нет данных
  }

  saveToLocalStorage(key: string, data: User[]) {
    localStorage.setItem(key, JSON.stringify(data)); // Сохраняем данные в localStorage
  }

  removeItem(id: number): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]'); // Получаем список пользователей из localStorage
    const updatedUsers = users.filter((user: any) => user.id !== id); // Фильтруем пользователя по id
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Обновляем список в localStorage
  }
}
