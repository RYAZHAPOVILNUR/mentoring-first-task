import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../interface/users.interface';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserApiService } from '../service/userApiService';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import {MatButtonModule} from '@angular/material/button'
import { DialogModule } from '@angular/cdk/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AppComponent, UserCardComponent, FormsModule, AsyncPipe, MatButtonModule, DialogModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [UserApiService, UserService]
})
export class UserListComponent  implements OnInit, OnDestroy{
  public readonly userService= inject(UserService)
  public readonly userApi= inject(UserApiService)
  public readonly users$ = this.userService.users$

  user: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street: 'string',
      suite: 'string',
      city: 'string',
      zipcode: 'string',
      geo: {
        lat: 'string',
        lng: 'string'
      }
    },
    phone: '',
    website: 'string',
    company: {
      name: 'string',
      catchPhrase: 'string',
      bs: 'string'
    }
  }
  
public constructor(private dialog: MatDialog){}

  // loadUsers() {
  //   this.userApi.getUsers().subscribe(
  //     (data: any)=>{
  //       this.userService.setUsers(data)
  //       console.log(data)
  //     }
  //   )
  // }

  
  
  public ngOnInit() {
this.userService.loadUsers()
   
}

 
 ngOnDestroy(): void {
  this.userService.user.unsubscribe()
 }

  deleteUser(id: number){
    this.userService.deleteUser(id)
    console.log(id)
  }

public openDialog(){
  this.dialog.open(CreateEditUserComponent, {
  data: {
 user: this.user,
 title: 'addUser',
  }
    
  })
}

}
