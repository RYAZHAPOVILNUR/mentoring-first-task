import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public getObjects<T>(key: string): T[] {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

  public saveObject<T>(key: string, object: T): void {
    const objects = this.getObjects<T>(key);
    if (Array.isArray(objects)) {
      objects.push(object);
    } else {
      localStorage.setItem(key, JSON.stringify([object]));
      return;
    }
    localStorage.setItem(key, JSON.stringify(objects));
  }

  public updateObject<T>(key: string, updatedObject: T & { id: number }): void {
    const objects = this.getObjects<T>(key);
    const index = objects.findIndex(i => (i as any).id === updatedObject.id);
    if (index !== -1) {
      objects[index] = updatedObject;
      localStorage.setItem(key, JSON.stringify(objects));
    }
  }

  public deleteObject<T>(key: string, id: number): void {
    const objects = this.getObjects<T>(key).filter(i => (i as any).id !== id);
    localStorage.setItem(key, JSON.stringify(objects));
  }
}
