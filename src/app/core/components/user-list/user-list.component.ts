import { Component,inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from "../user-card/user-card.component";
import { UsersService } from '../../services/users.service';
import {MatButtonModule} from '@angular/material/button';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../models/user';
import { Store } from '@ngrx/store';
import { UserActions } from './store/users.actions';
import { selectUsers } from './store/users.selectors';
import { UsersApiService } from '../../services/users-api.service';




@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  
  readonly usersService = inject(UsersService)
  readonly usersApiService = inject(UsersApiService)
  public readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);


  constructor(private dialog: MatDialog, ){
    this.usersApiService.getUsers().subscribe((response: any) =>{
      this.store.dispatch(UserActions.load({users: response}));
    })
  }


    openCreateUserDialog(): void {
      const dialogRef = this.dialog.open(CreateEditUserComponent, {
        width: '400px',
        data: {
          isEdit: false
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        this.store.dispatch(UserActions.create({
          user: {
            id: new Date().getTime(),
            name: result.name,
            username: result.username,
            email: result.email,
            address: result.address,
            phone: result.phone,
            website: result.website,
            company: result.company,
          }
        }))
        }
      });
  
    }
 

  onDeletUser(id: number): void{
    this.store.dispatch(UserActions.delete({id}));
  }
  onEditUser(user: IUser): void{
    this.store.dispatch(UserActions.edit({ user}));
  }
}