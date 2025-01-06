import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Сервис будет доступен во всем приложении
})
export class LocalStorageService {
  constructor() {}

  // Метод для записи данных
  setItem(key: string, value: any): void {
    const jsonData = JSON.stringify(value); // Преобразуем данные в JSON
    localStorage.setItem(key, jsonData);
  }

  // Метод для чтения данных
  getItem<T>(key: string): T | null {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null; // Парсим JSON, если данные существуют
  }

  // Метод для удаления данных
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Метод для очистки всего хранилища
  clear(): void {
    localStorage.clear();
  }
}
