import { Component, EventEmitter, Input, Output, Inject, inject } from '@angular/core';
import { IUser } from '../../models/user';
import {MatButtonModule} from '@angular/material/button';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  readonly dialog = inject(MatDialog)

  @Input({required:true}) user!:IUser;

  @Output()
  deleted = new EventEmitter();

  @Output()
  editUser = new EventEmitter();
  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '400px',
      data: {
        user: this.user,
        isEdit: true,
      }
    });
    dialogRef.afterClosed().subscribe(updatedUser => {
      if(updatedUser){
        this.editUser.emit(updatedUser);
      }
    })

  }


  public deleteUser(id: number){
    this.deleted.emit(id);
  }

}
