import {inject, Injectable} from '@angular/core';
import { User } from './user.interface';
import { UsersApiService } from './users-api.service';
import {BehaviorSubject, filter, map, take} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";

@Injectable({providedIn: 'root'})
export class UsersService {
  usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  public userForm!:FormGroup;

  constructor( private api:UsersApiService) {
    this.loadUsers()
  }

  saveData() {
    localStorage.setItem("usersData", JSON.stringify(this.usersSubject$.value))
  }

  loadSavedData() {
    let data=localStorage.getItem("usersData")
    let loadData = JSON.parse(data!)
    this.usersSubject$.next(loadData)
  }

    loadUsers(): void {
    if(localStorage.getItem("usersData")==null){
      this.api.getUsers().subscribe({
        next: (response: User[]) => {
          this.usersSubject$.next(response);
          this.saveData()
        },
        error: (error: any) => {
          console.error('error')
        }
      })
    } else {
      this.loadSavedData()
      }
    }

  public deleteUser(id: number): void {
    this.usersSubject$.next(
      this.usersSubject$.value.filter(user => user.id !== id)
    );
    this.saveData()
  }

  public addUser(newUser:User) {
    const currentUsers=this.usersSubject$.value;
    const updatedUsers = [...currentUsers, newUser];
    this.usersSubject$.next(updatedUsers);
    this.saveData()
  }

  public getUserById(id:number) {
    this.users$.subscribe(users=>{
      const userWithId = users.filter(user => user.id === id);
      this.usersSubject$.next(userWithId);
    })
  }
}
































