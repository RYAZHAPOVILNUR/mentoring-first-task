import { Injectable } from '@angular/core';
import {User} from "../components/users-list/users-list.component";
import {BehaviorSubject, delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users1$ = this.usersSubject$.asObservable();
  setItems(users: Array<User>) {
    localStorage.setItem('localstorage',JSON.stringify(users));
    const storageData = localStorage.getItem('localstorage');
    if(storageData){
      this.usersSubject$.next(JSON.parse(storageData));
    }
    console.log(this.usersSubject$)

  }

  updateItems(users: User[]){
    this.usersSubject$.next(users);
  }

  getItems(){
    let items = localStorage.getItem('localstorage');
    if(items){
      this.usersSubject$.next(JSON.parse(items));
      return JSON.parse(items)
    } else return undefined
  }

  deleteItem(userId: number) {
    const localStorageItem = localStorage.getItem('localstorage');
    if (localStorageItem !== null) {
      try {
        const parsedData = JSON.parse(localStorageItem);
        const index = parsedData.map((user: { id: any; }) => user.id).indexOf(userId);
        if (index !== -1) {
          parsedData.splice(index, 1);
        }
        if(!parsedData.length){
          localStorage.removeItem('localstorage');
          this.usersSubject$.next([]);
          return;
        }
        localStorage.setItem('localstorage',JSON.stringify(parsedData));
        this.usersSubject$.next(parsedData);
        // Use the parsed data
      } catch (error) {
        console.error('Error parsing local storage item:', error);
      }
    } else {
      console.log('Local storage item does not exist');
    }

  }

  addItem(user: User){
    let storageData = localStorage.getItem('localstorage');
    if(storageData !== null){
      let parsedData = JSON.parse(storageData);
      parsedData.push(user);
      this.usersSubject$.next(parsedData)
      console.log(parsedData);
      localStorage.setItem('localstorage',JSON.stringify(parsedData));
    } else {
      let data = JSON.stringify(user);
      localStorage.setItem('localstorage',data);
      this.usersSubject$.next([user]);
    }

  }

  editItem(editedUser: User){
    let storageData = localStorage.getItem('localstorage');
    if(storageData !== null){
      let data = JSON.parse(storageData);
      let changedData = data.map((user: User) => {
        if(user.id === editedUser.id){
          return editedUser
        } else {
          return user;
        }
      });
      this.usersSubject$.next(changedData);
      localStorage.setItem('localstorage',JSON.stringify(changedData));
      console.log(changedData);
    }
  }

  removeAll(){
    localStorage.removeItem('localstorage');
    this.usersSubject$.next([]);
  }
  constructor() {
    console.log(this.usersSubject$)
  }
}
