import { Inject, Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
   private usersSubject$ = new BehaviorSubject<User[]>([]);
     users$ = this.usersSubject$.asObservable();
    setUsers(users: User[]) {
        this.usersSubject$.next(users);
    }


        editUser(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    if(user.id === editedUser.id) {
                        return editedUser;
                    }else {
                        return user;
                    }
                }
            )
        );
    }



    createUser(user: User) {
        const existingUser = this.usersSubject$.value.find(
            (currentElement) => currentElement.email === user.email
        );
    
        if (existingUser) {
            alert('this user already exists');
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user]);
            
            // عرض رسالة بعد تأخير
            setTimeout(() => {
                alert('user is created');
            }, 100); // تأخير 100 مللي ثانية
        }
    }

    // createUser(user: User){
    // const existingUser = this.usersSubject$.value.find(
    //     (currentElement) => currentElement.email === user.email
    // );
    // // console.log(existingUser)
       
    // if(existingUser!==undefined) {
    //     alert('this user already exists')
    // }else{
    //     this.usersSubject$.next([...this.usersSubject$.value, user]);
    //     alert('user is created')
    // }

    //     this.usersSubject$.next(
    //         [...this.usersSubject$.value, user]
    //     );
    // }


    deleteUser(id:number) {
     this.usersSubject$.next(
        this.usersSubject$.value.filter(
            item => {
                if(id === item.id) {
                    return false;
                }else {
                    return true;
            }
         }
      )
    )
 }

 
}














// import { Injectable } from '@angular/core';


// @Injectable({providedIn: 'root'})
// export class UserService {
//     users: any[] = [];

//     setUsers(users: any[]) {
//       this.users = users;
//     }

//     editUser(editUser: any) {
//         this.users = this.users.map(
//             user => {
//                 if(user.id === editUser.id) {
//                     return editUser;
//                 }else {
//                     return user;
//                 }
//             }
//         )
//     }

//     createUser(user: any){
//         this.users = [...this.users, user];
//     }


//     deleteUser(uers: any) {
//         this.users = this.users.filter(
//             item => {
//                 if(uers.id === item.id) {
//                     return false;
//                 }else {
//                     return true;
//             }
//         }
//      )
// }
//     // // هذي كمان صحيحه للحذف  

//     // deletUser(User: any) {
//     //     this.users = this.users.filter(
//     //         //@ts-ignore
//     //         item => item.id !== id
//     //     )
//     //       }


// }