import { Injectable } from '@angular/core';
import { IUser } from './users-list/users.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public getItem(): string | null {
    return localStorage.getItem('jwtToken') || null;
  }

  public setItem(data: string) {
    localStorage.setItem('jwtToken', data);
  }

  public removeItem(id: number) {
    let usersData = this.getItem();
    if (usersData) {
      const parsedData: IUser[] = JSON.parse(usersData);
      parsedData.splice(parsedData.map((el) => el.id).indexOf(id), 1);
      if (!parsedData.length) {
        localStorage.removeItem('jwtToken');
        return;
      }
      localStorage.setItem('jwtToken', JSON.stringify(parsedData));
    } else {
      return;
    }
  }

  public editItem(editedUser: IUser) {
    let usersData: string | null = this.getItem();
    if (usersData) {
      const parsedData: IUser[] = JSON.parse(usersData);

      const newParsedData = parsedData.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      });

      localStorage.setItem('jwtToken', JSON.stringify(newParsedData));
    } else {
      return;
    }
  }

  public addItem(user: IUser) {
    let usersData = this.getItem();
    if (usersData) {
      const parsedData = JSON.parse(usersData);

      if (typeof parsedData === 'object' && parsedData !== null) {
        const newData = [...parsedData, user];

        this.setItem(JSON.stringify(newData));
      } else {
        console.error('Invalid data format in storage');
      }
    } else {
      const newData = [user];
      this.setItem(JSON.stringify(newData));
    }
  }
}
