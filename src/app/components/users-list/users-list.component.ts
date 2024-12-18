import {Component, inject, OnInit} from '@angular/core';
import {UsersApiService} from "../../services/users-api.service";
import {Observable, take} from "rxjs";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditCreateDialogComponent} from "../edit-create-dialog/edit-create-dialog.component";
import {MatButton} from "@angular/material/button";
import {UserForm} from "../../models/form-user";
import {LocalstorageService} from "../../services/localstorage.service";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {Store} from "@ngrx/store";
import {selectUsers} from "../../Store/StoreUsers/users.selector";
import {UsersActions} from "../../Store/StoreUsers/users.action";




@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    UserCardComponent,
    MatButton
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private ApiService = inject(UsersApiService)
  private UsersService = inject(UsersService);
  private Storage = inject(LocalstorageService);
  private store = inject(Store);

  public dialog = inject(MatDialog);
  users!: Observable<User[]>;

  ngOnInit(): void {
    this.users = this.store.select(selectUsers);
    this.store.dispatch(UsersActions.loadUser({text: 'cool'}))
  }

  deleteUser(userId: number): void {
    this.dialog.open(DeleteDialogComponent, {}).afterClosed()
      .subscribe((result: Boolean) => {
        if(result){
          this.store.dispatch(UsersActions.deleteUser({userId: userId}))
        }
      })
  }

  openDialog(user?:User): void {
    this.dialog.open(EditCreateDialogComponent, {
      data:{user:user,isEdit: !!user},
    }).afterClosed().subscribe((response: UserForm) => {
      if(response){
        if(user){
          const userId = user.id
          this.store.dispatch(UsersActions.editUser({editedUser: {id: userId,...response}}))
        } else {
          const newUser: User = {
            id: new Date().getTime(),
            ...response
          }
          this.store.dispatch(UsersActions.createUser({user: newUser}))
        }
      }
    })
  }
}
