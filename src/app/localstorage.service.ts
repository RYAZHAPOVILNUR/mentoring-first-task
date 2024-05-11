import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Создаем BehaviorSubject для хранения данных
  private dataSource = new BehaviorSubject<any>(null);
  public data$ = this.dataSource.asObservable();

  constructor() {}

  // Метод для сохранения данных в localStorage
  saveData(data: any) {
    localStorage.setItem('users', JSON.stringify(data));
    // Обновляем источник данных
    this.dataSource.next(data);
  }

  getItem(): string | null {
    return localStorage.getItem('users') || null;
  }
  
  // Метод для получения данных из localStorage
  loadData(): Observable<any> {
    const storedData = localStorage.getItem('users');
    if (storedData) {
      // Преобразуем строку обратно в объект
      const parsedData = JSON.parse(storedData);
      // Возвращаем Observable с данными
      return of(parsedData);
    } else {
      // Если данных нет, возвращаем Observable с null
      return of(null);
    }
  }
}
