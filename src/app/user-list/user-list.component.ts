import { Component, OnInit, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../interface/users.interface';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserApiService } from '../service/userApiService';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'
import { DialogModule } from '@angular/cdk/dialog';
import { CreateEditUserComponen } from '../create-edit-user/create-edit-user.component';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AppComponent, UserCardComponent, 
    FormsModule, AsyncPipe, MatButtonModule, 
    DialogModule,CreateEditUserComponen,],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent  implements OnInit{
  public readonly userService= inject(UserService)
  public readonly userApi= inject(UserApiService)
  public readonly users$ = this.userService.users$


  userFerst: User = {
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
  
  public ngOnInit(){
  this.userService.loadUsers()
  

  }

  deleteUser(id: number){
    this.userService.deleteUser(id)
  }

public openDialog(user?: User){
  const dialogRef=this.dialog.open(CreateEditUserComponen, {
  data: {
  isEdit: true,
  user: user,
  title: 'addUser',
  },
    width: '400px'
  })
 dialogRef.afterClosed().subscribe((result)=>{
  if(user){
        this.userService.updateUser({... user, ... result})
      }else{
        this.userService.addUser(result)
      }
    })}
}





