import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../user.service";
import { createUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatSnackBar } from '@angular/material/snack-bar';
export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo:{
      lat: string;
      lng: string;
    };
  };
    phone?: string;
    website: string;
    company: {
      name: string;
      catchPhrase?: string;
      bs?: string;
    };
  }

@Component({
    selector: 'app-users-list',
    templateUrl:'./users-list.component.html',
    styleUrl:'./users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, createUserFormComponent],
     changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserslistComponent {
readonly usersApiService = inject(UsersApiService);
readonly usersService = inject(UsersService);
items: any;

constructor(private snackBar: MatSnackBar) {
 this.usersApiService.getusers().subscribe(
       (response: any) => {
        this.usersService.setUsers(response);
        
       }
     );

     
     this.usersService.users$.subscribe((users) => console.log(users));
     
   
  }  


  deletUser(id: number) {
     this.usersService.deleteUser(id)
     this.snackBar.open('The user has been successfully deleted', 'closing', {
      duration: 3000,

  });
    }


    editUser(user:any) {
      this.usersService.editUser({
        ...user,
        company:{
          name: user.companyName,
        }
      });
      this.snackBar.open('User modified successfully!', 'closing', {
        duration: 3000,

      });
    }


  public createUser(formData: any) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.companyName,
      }
    });
    this.snackBar.open('A new user has been created!', 'closing', {
      duration: 3000,
      panelClass: ['custom-snackbar'], // إضافة فئة CSS مخصصة
    });
    console.log('Данные Формы: ', event);
       console.log(new Date().getTime());
   }
   
 }





























// import { NgFor } from "@angular/common";
// import { HttpClient } from "@angular/common/http";
// import { Component, inject } from "@angular/core";
// import { RouterLink } from "@angular/router";
// import { UserCardComponent } from "../user-card/user-card.component";
// import { UsersApiService } from "../users-api.service";

// @Component({
//     selector: 'app-users-list',
//     templateUrl:'./uers-list.component.html',
//     styleUrl:'./users-list.component.scss',
//     standalone: true,
//     imports: [NgFor,UserCardComponent],
// })
// export class UsersListComponent {
//   readonly usersService = inject(UsersApiService);
//   readonly httpClient = inject(HttpClient);
//   users: any = [];

//   constructor() {
//     this.usersService.getusers().subscribe(
//       (response: any) => {
//         this.users = response;
//         console.log('USERS:', this.users);
//       }
//     );
//   }

//   deletUser(id: number) {
// this.usersService.deleteUser(id);
//   this.users = this.users.filter((user: any) => user.id !== id);
// };
//   }



























// import { NgFor } from "@angular/common";
// import { HttpClient } from "@angular/common/http";
// import { Component, inject } from "@angular/core";
// import { RouterLink } from "@angular/router";
// import { UsersApiService } from "../users-api.service";

// @Component({
//     selector: 'app-users-list',
//     templateUrl:'./uers-list.component.html',
//     styleUrl:'./users-list.component.scss',
//     standalone: true,
//     imports: [NgFor,RouterLink]
// })
// export class UserslistComponent {
// readonly apiService = inject(UsersApiService)
// users:any = [];

// constructor() {
// this.apiService.getusers().subscribe(
//        (response: any) => {
//         this.users = response;
//         console.log('USERS:', this.users)
//        }
//      )
//   }  
//   deletUser(id: number) {
// this.users = this.users.filter(
//     //@ts-ignore
//     item => item.id !== id
// )
//   }
// }