import { Injectable, inject } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject } from 'rxjs';
import User from '../interface/interface';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  userApiService = inject(UserApiService);

  public users$$ = new BehaviorSubject<User[]>([])
  public readonly users$ = this.users$$.asObservable();
  storageService = inject(LocalStorageService)

  loadUsers(){
    this.userApiService.getUsers().subscribe(data => {
      if(!this.storageService.getItem('tdyToken')) {
        this.users$$.next(data)
        this.storageService.setItem("tdyToken", data)
      } 
    })
  }
  
  private get users(): User[] {
    return this.users$$.getValue();
  }
}


