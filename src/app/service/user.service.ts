import { Injectable } from "@angular/core";
import { UserApiService } from "./userApiService";
import { inject } from "@angular/core";
import { BehaviorSubject, Observable, filter} from "rxjs";
import { User } from "../interface/users.interface";
@Injectable({
    providedIn: 'root'
})
export class UserService{
   public api = inject(UserApiService)
   private readonly userSubject$ = new BehaviorSubject<User[]>([])
   public user = this.userSubject$ 
   public users$= this.user.asObservable()

   public loadUsers(){
      this.api.getUsers().subscribe(
         (data: any)=>{
           this.userSubject$.next(data)
         }
       )
      
   }
   
   public get getUsers(){
   return this.userSubject$.getValue()
   }

   public set setUsers(users: User[]){
   this.userSubject$.next(users)
   }

   deleteUser(id: number){
      this.userSubject$.next(this.userSubject$.value.filter(user=>user.id!==id))
   }

   public addUser(user: User){
      return this.userSubject$.next([...this.getUsers, user])
   }


}