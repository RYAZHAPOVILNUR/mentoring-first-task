import { Injectable } from '@angular/core';
import { TUserEntity } from '../../libs/core/data-access/src/lib/users-data.models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): TUserEntity[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, data: TUserEntity[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
