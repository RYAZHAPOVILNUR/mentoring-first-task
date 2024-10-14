import { Component, OnInit, inject } from '@angular/core';
import { UsersServiceService } from '../../service/users-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserCardComponent } from "../user-card/user-card.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import User from '../../interface/interface';
import { LocalStorageService } from '../../service/local-storage.service';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, editUser, loadUser } from '../../+state/user.action';
import { selectStatus, selectUser } from '../../+state/user.selector';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, AsyncPipe, AddDialogComponent, MatButtonModule, MatProgressSpinnerModule], 
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
  
export class UsersListComponent implements OnInit  {
  private readonly store = inject(Store);
  userService = inject( UsersServiceService );
  dialog = inject( MatDialog );
  localStorageService = inject( LocalStorageService );
  public dialogRef!: MatDialogRef<AddDialogComponent>;
  public readonly users$ = this.store.select(selectUser);
  public readonly status$ = this.store.select(selectStatus);


  onDelete(id: number) {
    this.store.dispatch(deleteUser({ id }));
  }

  ngOnInit() {
    
    this.store.dispatch(loadUser());
    if(!this.localStorageService.getItem("tdyToken")){
      this.userService.loadUsers();
    } else {
      this.userService.users$$.next(this.localStorageService.getItem("tdyToken"))
    }
  }

  openDialog(user?: User): void {
    let isEdit: boolean = true;
    if (user) {
      isEdit = true;
    }
    
    const dialogRef = this.dialog.open<AddDialogComponent, {isEdit: boolean, user?: User}>(AddDialogComponent, {
      width: "500px",
      height: "500px",
      data: { 
        isEdit: true,
        user: user},
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (isEdit && result){
        this.store.dispatch(addUser({ user: { ...user, ...result } }))

      }
    });
  }

  editDialog(newUser: User) {
    this.dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        isEdit: false,
        user: newUser
      },
      width: '500px',
      height: '500px',
    })
    
    this.dialogRef.afterClosed().subscribe(
      (res)=> {
        if(res) {
          console.log(newUser)
          this.store.dispatch(editUser({ user: res }))
        }
       } 
    )
  }
}